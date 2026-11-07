import { Fragment, useMemo, useState } from 'react';
import { AiOutlineFork, AiOutlineStar } from 'react-icons/ai';
import { MdInsertLink } from 'react-icons/md';
import { ga, getLanguageColor, skeleton } from '../../utils';
import { CARD_HOVER_CLS, THUMB_ZOOM_CLS } from '../../constants';
import { GithubProject } from '../../interfaces/github-project';
import CodeThumbnail from './code-thumbnail';
import CountUp from '../count-up';

const SORT_STORAGE_KEY = 'gitprofile:project-sort';

const SORT_OPTIONS = [
  { value: 'stars', label: 'Stars' },
  { value: 'updated', label: 'Recently updated' },
  { value: 'newest', label: 'Newest' },
] as const;

type SortOption = (typeof SORT_OPTIONS)[number]['value'];

const isSortOption = (value: unknown): value is SortOption =>
  SORT_OPTIONS.some((option) => option.value === value);

const readSavedSort = (): SortOption => {
  try {
    const saved = localStorage.getItem(SORT_STORAGE_KEY);
    return isSortOption(saved) ? saved : 'stars';
  } catch {
    return 'stars';
  }
};

const saveSort = (sort: SortOption) => {
  try {
    localStorage.setItem(SORT_STORAGE_KEY, sort);
  } catch {
    // Storage blocked (private mode etc.): the choice just isn't remembered.
  }
};

const sortProjects = (
  projects: GithubProject[],
  sort: SortOption,
): GithubProject[] => {
  if (sort === 'stars') {
    // Name breaks star ties so the order is stable between loads.
    return [...projects].sort(
      (a, b) =>
        b.stargazers_count - a.stargazers_count || a.name.localeCompare(b.name),
    );
  }
  const field = sort === 'updated' ? 'pushed_at' : 'created_at';
  return [...projects].sort(
    (a, b) => Date.parse(b[field]) - Date.parse(a[field]),
  );
};

const getPageCount = (total: number, pageSize: number) =>
  Math.max(1, Math.ceil(total / pageSize));

const getPage = <T,>(items: T[], page: number, pageSize: number): T[] =>
  items.slice((page - 1) * pageSize, page * pageSize);

const GithubProjectCard = ({
  header,
  githubProjects,
  loading,
  limit,
  username,
  googleAnalyticsId,
  images,
}: {
  header: string;
  githubProjects: GithubProject[];
  loading: boolean;
  limit: number;
  username: string;
  googleAnalyticsId?: string;
  images: Record<string, string>;
}) => {
  const [sort, setSort] = useState<SortOption>(readSavedSort);
  const [page, setPage] = useState(1);
  const sortedProjects = useMemo(
    () => sortProjects(githubProjects, sort),
    [githubProjects, sort],
  );

  if (!loading && githubProjects.length === 0) {
    return;
  }

  const renderSkeleton = () => {
    const array = [];
    for (let index = 0; index < limit; index++) {
      array.push(
        <div className="card shadow-lg compact bg-base-100" key={index}>
          <div className="flex justify-between flex-col p-8 h-full w-full">
            <div>
              <div className="flex items-center">
                <span>
                  <h5 className="card-title text-lg">
                    {skeleton({
                      widthCls: 'w-32',
                      heightCls: 'h-8',
                      className: 'mb-1',
                    })}
                  </h5>
                </span>
              </div>
              <div className="mb-5 mt-1">
                {skeleton({
                  widthCls: 'w-full',
                  heightCls: 'h-4',
                  className: 'mb-2',
                })}
                {skeleton({ widthCls: 'w-full', heightCls: 'h-4' })}
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex flex-grow">
                <span className="mr-3 flex items-center">
                  {skeleton({ widthCls: 'w-12', heightCls: 'h-4' })}
                </span>
                <span className="flex items-center">
                  {skeleton({ widthCls: 'w-12', heightCls: 'h-4' })}
                </span>
              </div>
              <div>
                <span className="flex items-center">
                  {skeleton({ widthCls: 'w-12', heightCls: 'h-4' })}
                </span>
              </div>
            </div>
          </div>
        </div>,
      );
    }

    return array;
  };

  // limit doubles as page size; clamp in case the list shrinks after a reload.
  const pageCount = getPageCount(sortedProjects.length, limit);
  const currentPage = Math.min(page, pageCount);

  const renderPagination = () => {
    if (pageCount <= 1) {
      return null;
    }

    const buttonCls = 'join-item btn btn-sm h-10 min-h-10 min-w-10';

    return (
      <nav
        className="flex justify-center mt-6"
        aria-label="Github projects pages"
      >
        <div className="join">
          <button
            type="button"
            className={buttonCls}
            aria-label="Previous page"
            disabled={currentPage === 1}
            onClick={() => setPage(currentPage - 1)}
          >
            ‹
          </button>
          {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
            <button
              type="button"
              key={n}
              className={`${buttonCls} ${n === currentPage ? 'btn-active' : ''}`}
              aria-label={`Page ${n}`}
              aria-current={n === currentPage ? 'page' : undefined}
              onClick={() => setPage(n)}
            >
              {n}
            </button>
          ))}
          <button
            type="button"
            className={buttonCls}
            aria-label="Next page"
            disabled={currentPage === pageCount}
            onClick={() => setPage(currentPage + 1)}
          >
            ›
          </button>
        </div>
      </nav>
    );
  };

  const renderProjects = () => {
    return getPage(sortedProjects, currentPage, limit).map((item, index) => (
      <a
        className={`card shadow-lg compact bg-base-100 cursor-pointer ${CARD_HOVER_CLS}`}
        href={item.html_url}
        key={index}
        onClick={(e) => {
          e.preventDefault();

          try {
            if (googleAnalyticsId) {
              ga.event('Click project', {
                project: item.name,
              });
            }
          } catch (error) {
            console.error(error);
          }

          window?.open(item.html_url, '_blank');
        }}
      >
        <div className="flex justify-between flex-col p-8 h-full w-full">
          <div>
            <div className="overflow-hidden rounded-lg mb-4">
              <div className={THUMB_ZOOM_CLS}>
                {images[item.name] ? (
                  <img
                    src={images[item.name]}
                    alt={item.name}
                    loading="lazy"
                    className="w-full aspect-video object-cover block"
                  />
                ) : (
                  <CodeThumbnail name={item.name} language={item.language} />
                )}
              </div>
            </div>
            <div className="flex items-center truncate">
              <div className="card-title text-lg font-semibold tracking-wide flex text-title">
                <MdInsertLink className="my-auto opacity-60 text-base-content" />
                <span>{item.name}</span>
              </div>
            </div>
            <p className="mb-5 mt-1 text-base-content text-opacity-60 text-sm">
              {item.description}
            </p>
          </div>
          <div className="flex justify-between text-sm text-base-content text-opacity-60 truncate">
            <div className="flex flex-grow">
              <span className="mr-3 flex items-center">
                <AiOutlineStar className="mr-0.5" />
                <CountUp value={item.stargazers_count} whenVisible />
              </span>
              <span className="flex items-center">
                <AiOutlineFork className="mr-0.5" />
                <CountUp value={item.forks_count} whenVisible />
              </span>
            </div>
            <div>
              <span className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-1 opacity-60"
                  style={{ backgroundColor: getLanguageColor(item.language) }}
                />
                <span>{item.language}</span>
              </span>
            </div>
          </div>
        </div>
      </a>
    ));
  };

  return (
    <Fragment>
      <div className="col-span-1 lg:col-span-2">
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2">
            <div className="card compact bg-base-100 shadow bg-opacity-40">
              <div className="card-body">
                <div className="mx-3 flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h5 className="card-title text-2xl font-bold">
                    {loading ? (
                      skeleton({ widthCls: 'w-40', heightCls: 'h-8' })
                    ) : (
                      <span className="text-base-content opacity-70">
                        {header}
                      </span>
                    )}
                  </h5>
                  {loading ? (
                    skeleton({ widthCls: 'w-10', heightCls: 'h-5' })
                  ) : (
                    <div className="flex items-center gap-3">
                      <select
                        className="select select-sm h-10 min-h-10 select-ghost text-base-content opacity-70"
                        aria-label="Sort projects"
                        value={sort}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (isSortOption(value)) {
                            setSort(value);
                            saveSort(value);
                            setPage(1);
                          }
                        }}
                      >
                        {SORT_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <a
                        href={`https://github.com/${username}?tab=repositories`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-base-content opacity-50 hover:underline"
                      >
                        See All
                      </a>
                    </div>
                  )}
                </div>
                <div className="col-span-2">
                  {/* New key on sort/page change replays the 150 ms fade (S4 P). */}
                  <div
                    key={`${sort}-${currentPage}`}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 motion-safe:animate-[card-fade_150ms_ease-out]"
                  >
                    {loading ? renderSkeleton() : renderProjects()}
                  </div>
                  {!loading && renderPagination()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default GithubProjectCard;
