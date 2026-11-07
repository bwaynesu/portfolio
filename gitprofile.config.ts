// gitprofile.config.ts

const CONFIG = {
  github: {
    username: 'bwaynesu', // Your GitHub org/user name. (This is the only required config)
  },
  /**
   * If you are deploying to https://<USERNAME>.github.io/, for example your repository is at https://github.com/arifszn/arifszn.github.io, set base to '/'.
   * If you are deploying to https://<USERNAME>.github.io/<REPO_NAME>/,
   * for example your repository is at https://github.com/arifszn/portfolio, then set base to '/portfolio/'.
   */
  base: '/portfolio/',
  projects: {
    github: {
      display: true, // Display GitHub projects?
      header: 'Github Projects',
      mode: 'manual', // Mode can be: 'automatic' or 'manual'
      // Preview images on repo cards, keyed by repo name. Files in public/ are served under `base`.
      images: {
        DeleteMissingScripts: '/portfolio/DeleteMissingScripts.png',
        BComponentComparator: '/portfolio/BComponentComparator.png',
        UnityLogViewer: '/portfolio/UnityLogViewer.png',
        BNav: '/portfolio/BNav.png',
      },
      automatic: {
        sortBy: 'updated', // Sort projects by 'stars' or 'updated'
        limit: 8, // How many projects to display.
        exclude: {
          forks: true, // Forked projects will not be displayed if set to true.
          projects: [
            'bwaynesu/UnityLearn-Addressables-LoadyDungeons',
            'bwaynesu/bwaynesu',
            'bwaynesu/BInspector',
            'bwaynesu/UnityLearn-BulletHell',
            'bwaynesu/UnityLearn-Try-Test-Runner',
            'bwaynesu/UnityLearn-Using-Input-System',
            'bwaynesu/UnityLearn-Tanks-Pluggable-AI',
            'bwaynesu/UnityLearn-Using-Addressables',
          ], // These projects will not be displayed. example: ['arifszn/my-project1', 'arifszn/my-project2']
        },
      },
      manual: {
        // Properties for manually specifying projects
        projects: [
          'bwaynesu/BComponentComparator',
          'bwaynesu/BNav',
          'bwaynesu/DeleteMissingScripts',
          'bwaynesu/BShortcut',
          'bwaynesu/BSelection',
          'bwaynesu/AnyStruct',
          'bwaynesu/Steam-Achievement-csv2vdf',
          'bwaynesu/OdinEnumArrayTitle',
          'bwaynesu/UnityLogViewer',
          'bwaynesu/agentic-ebs',
          'bwaynesu/Gist-Catalog',
          'bwaynesu/BSoundMute',
        ], // List of repository names to display. example: ['arifszn/my-project1', 'arifszn/my-project2']
      },
    },
    external: {
      header: 'Games & Products',
      // To hide the `External Projects` section, keep it empty.
      projects: [
        {
          title: 'Ringash (contributing developer)',
          description: 'Top-down 3D action RPG. Steam demo available.',
          imageUrl:
            'https://cdn.akamai.steamstatic.com/steam/apps/2323140/header.jpg',
          link: 'https://store.steampowered.com/app/2323140/Ringash/',
        },
        {
          title: 'BAssetDock',
          description:
            'Group assets by task instead of digging through the Project window.',
          // Files in public/ are served under `base`, and the card uses imageUrl as-is.
          imageUrl: '/portfolio/BAssetDock.jpg',
          link: 'https://u3d.as/3vZn',
        },
        {
          title: 'Unity Log Viewer',
          description: 'Offline desktop viewer for Unity Player.log files.',
          imageUrl: '/portfolio/UnityLogViewer.png',
          link: 'https://github.com/bwaynesu/UnityLogViewer',
        },
        {
          title: 'My Racing Projects',
          description: 'Video showcase of my racing game projects.',
          imageUrl: '/portfolio/MyRacingProjects.jpg',
          link: 'https://youtu.be/ucg_tkJpu4o',
        },
        /*{
          title: 'Project Name',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut.',
          imageUrl:
            'https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg',
          link: 'https://example.com',
        },*/
      ],
    },
  },
  seo: {
    title: 'Portfolio of bwaynesu',
    description:
      'Wayne Su: Unity games, dev tools, and AI-assisted development.',
    imageURL: 'https://avatars.githubusercontent.com/u/2370689?v=4',
  },
  // Stats line. Rendered under the bio in the avatar card.
  tagline: '10+ years Unity · 10+ shipped games · 15+ dev tools',
  social: {
    linkedin: 'wayne-su-94804186',
    x: '',
    mastodon: '',
    researchGate: '',
    facebook: '',
    instagram: '',
    reddit: '',
    threads: '',
    youtube: '', // example: 'pewdiepie'
    udemy: '',
    dribbble: '',
    behance: '',
    medium: '',
    dev: '',
    stackoverflow: '', // example: '1/jeff-atwood'
    skype: '',
    telegram: '',
    website: '',
    phone: '',
    email: 'bwaynesu.dev@gmail.com',
  },
  resume: {
    fileUrl: '', // Empty fileUrl will hide the `Download Resume` button.
  },
  skills: [
    'C#',
    'Unity3D',
    'C++',
    'Git',
    'GitHub',
    'Claude Code',
    'GitHub Copilot',
    'Gemini',
  ],
  experiences: [
    /*{
      company: 'Company Name',
      position: 'Position',
      from: 'September 2021',
      to: 'Present',
      companyLink: 'https://example.com',
    },
    {
      company: 'Company Name',
      position: 'Position',
      from: 'July 2019',
      to: 'August 2021',
      companyLink: 'https://example.com',
    },*/
  ],
  certifications: [
    /*{
      name: 'Lorem ipsum',
      body: 'Lorem ipsum dolor sit amet',
      year: 'March 2022',
      link: 'https://example.com',
    },*/
  ],
  educations: [
    /*{
      institution: 'Institution Name',
      degree: 'Degree',
      from: '2015',
      to: '2019',
    },
    {
      institution: 'Institution Name',
      degree: 'Degree',
      from: '2012',
      to: '2014',
    },*/
  ],
  publications: [
    /*{
      title: 'Publication Title',
      conferenceName: '',
      journalName: 'Journal Name',
      authors: 'John Doe, Jane Smith',
      link: 'https://example.com',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
      title: 'Publication Title',
      conferenceName: 'Conference Name',
      journalName: '',
      authors: 'John Doe, Jane Smith',
      link: 'https://example.com',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },*/
  ],
  // Display articles from your medium or dev account. (Optional)
  blog: {
    source: 'medium', // medium | dev
    username: 'bwaynesu', // to hide blog section, keep it empty
    limit: 5, // How many articles to display. Max is 10.
  },
  googleAnalytics: {
    id: '', // GA3 tracking id/GA4 tag id UA-XXXXXXXXX-X | G-XXXXXXXXXX
  },
  // Track visitor interaction and behavior. https://www.hotjar.com
  hotjar: {
    id: '',
    snippetVersion: 6,
  },
  themeConfig: {
    defaultTheme: 'emerald',

    // Hides the switch in the navbar
    // Useful if you want to support a single color mode
    disableSwitch: false,

    // Should use the prefers-color-scheme media-query,
    // using user system preferences, instead of the hardcoded defaultTheme
    respectPrefersColorScheme: false,

    // Display the ring in Profile picture
    displayAvatarRing: true,

    // Available themes. To remove any theme, exclude from here.
    themes: [
      'light',
      'dark',
      'cupcake',
      //'bumblebee',
      'emerald',
      //'corporate',
      //'synthwave',
      'retro',
      //'cyberpunk',
      'valentine',
      'halloween',
      //'garden',
      //'forest',
      //'aqua',
      //'lofi',
      'pastel',
      //'fantasy',
      //'wireframe',
      'black',
      //'luxury',
      'dracula',
      'cmyk',
      'autumn',
      'business',
      //'acid',
      //'lemonade',
      'night',
      //'coffee',
      'winter',
      'dim',
      'nord',
      'sunset',
      'procyon',
    ],

    // Custom theme, applied to `procyon` theme
    customTheme: {
      primary: '#fc055b',
      secondary: '#219aaf',
      accent: '#e8d03a',
      neutral: '#2A2730',
      'base-100': '#E3E3ED',
      '--rounded-box': '3rem',
      '--rounded-btn': '3rem',
    },
  },

  // Optional Footer. Supports plain text or HTML.
  footer: `<a class="text-primary" href="mailto:bwaynesu.dev@gmail.com">Email</a>
    · <a class="text-primary" href="https://linkedin.com/in/wayne-su-94804186" target="_blank" rel="noreferrer">LinkedIn</a>
    · Made with <a
      class="text-primary" href="https://github.com/arifszn/gitprofile"
      target="_blank"
      rel="noreferrer"
    >GitProfile</a> and ❤️`,

  enablePWA: true,
};

export default CONFIG;
