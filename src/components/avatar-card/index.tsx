import { FaGamepad } from 'react-icons/fa';
import { FALLBACK_IMAGE } from '../../constants';
import { Profile } from '../../interfaces/profile';
import { skeleton } from '../../utils';
import LazyImage from '../lazy-image';
import TypeText from '../type-text';

interface AvatarCardProps {
  profile: Profile | null;
  loading: boolean;
  avatarRing: boolean;
  resumeFileUrl?: string;
  tagline?: string;
}

/**
 * Renders an AvatarCard component.
 * @param profile - The profile object.
 * @param loading - A boolean indicating if the profile is loading.
 * @param avatarRing - A boolean indicating if the avatar should have a ring.
 * @param resumeFileUrl - The URL of the resume file.
 * @param tagline - Optional stats line shown under the bio.
 * @returns JSX element representing the AvatarCard.
 */
const AvatarCard: React.FC<AvatarCardProps> = ({
  profile,
  loading,
  avatarRing,
  resumeFileUrl,
  tagline,
}): JSX.Element => {
  const badges = (tagline ?? '')
    .split('·')
    .map((s) => s.trim())
    .filter(Boolean);
  return (
    <div className="card shadow-lg compact bg-base-100">
      <div className="grid place-items-center py-6">
        {loading || !profile ? (
          <div className="avatar opacity-90">
            <div className="mb-4 rounded-full w-32 h-32">
              {skeleton({
                widthCls: 'w-full',
                heightCls: 'h-full',
                shape: '',
              })}
            </div>
          </div>
        ) : (
          <div className="avatar opacity-90">
            <div
              className={`mb-4 rounded-full w-32 h-32 ${
                avatarRing
                  ? 'ring ring-primary ring-offset-base-100 ring-offset-2'
                  : ''
              }`}
            >
              {
                <LazyImage
                  src={profile.avatar ? profile.avatar : FALLBACK_IMAGE}
                  alt={profile.name}
                  placeholder={skeleton({
                    widthCls: 'w-full',
                    heightCls: 'h-full',
                    shape: '',
                  })}
                />
              }
            </div>
          </div>
        )}
        <div className="text-center mx-auto px-8">
          <h5 className="font-bold text-2xl">
            {loading || !profile ? (
              skeleton({ widthCls: 'w-48', heightCls: 'h-8' })
            ) : (
              <span className="text-base-content opacity-70">
                {profile.name}
              </span>
            )}
          </h5>
          <div className="mt-3 text-base-content text-opacity-60 font-mono">
            {loading || !profile
              ? skeleton({ widthCls: 'w-48', heightCls: 'h-5' })
              : profile.bio && <TypeText text={profile.bio} />}
          </div>
          {badges.length > 0 && !loading && profile && (
            <div className="mt-3 flex flex-wrap justify-center gap-1.5">
              {badges.map((text, i) => (
                <span
                  key={i}
                  className="badge badge-ghost badge-sm h-auto py-1 gap-1 text-base-content text-opacity-80 tabular-nums"
                >
                  {/game/i.test(text) && (
                    <FaGamepad aria-hidden="true" className="shrink-0" />
                  )}
                  {text}
                </span>
              ))}
            </div>
          )}
        </div>
        {resumeFileUrl &&
          (loading ? (
            <div className="mt-6">
              {skeleton({ widthCls: 'w-40', heightCls: 'h-8' })}
            </div>
          ) : (
            <a
              href={resumeFileUrl}
              target="_blank"
              className="btn btn-outline btn-sm text-xs mt-6 opacity-50"
              download
              rel="noreferrer"
            >
              Download Resume
            </a>
          ))}
      </div>
    </div>
  );
};

export default AvatarCard;
