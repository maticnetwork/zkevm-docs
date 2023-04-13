const math = require('remark-math');
const katex = require('rehype-katex');

module.exports = {
  title: "Polygon zkEVM Developers",
  tagline: "The official documentation for Polygon zkEVM.",
  url: "https://wiki.polygon.technology",
  baseUrl: "/",
  favicon: "img/logo-round-purple.png",
  organizationName: "Polygon Labs",
  projectName: "zkevm-docs",
  customFields: {
    description: "Build your next blockchain app on Polygon zkEVM.",
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
    path: 'i18n',
    localeConfigs: {
      en: {
        label: 'English',
        direction: 'ltr',
        htmlLang: 'en-US',
        calendar: 'gregory',
        path: 'en',
      },
    },
  },

  onBrokenLinks: 'log',
  themeConfig: {
    metadata: [{name: 'description', content: 'Welcome to Polygon Wiki, the official documentation for Polygon. Learn about Polygon and its suite of Ethereum-scaling solutions.'}],
    announcementBar: {
      id: 'banner',
      content: `
        <div class="announcement-bar">
          Infinitely scaling Ethereum with Zero-Knowledge technology. 
            Polygon zkEVM Mainnet Beta is now Live! 
            <a href="/docs/zkEVM/develop" class="announcement-link" style="color: #ffffff;">Start Building</a>
        </div>
      `,
      textColor: '#ffffff',
      isCloseable: true,
    },

    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },

    footer: {
      style: 'light',
      links: [
        {
          title: "Resources",
          items: [
              {
                href: 'https://support.polygon.technology/support/home',
                label: 'Polygon Support',
              },
              {
                  label: "Advocate Program",
                  href: "https://polygon.technology/advocate-program/"
              },
              {
                label: "Polygon Funds",
                href: "https://polygon.technology/funds/"
              },
              {
                  label: "Bug Bounty",
                  href: "https://immunefi.com/bounty/polygon/"
              },
              {
                href: 'https://www.dappstorekit.io/',
                label: 'Build your own dApp',
                target: '_blank',
                rel: null,
                position: 'right',
              },
          ]
        },
        {
          title: "Reference",
          items: [
              {
                label: "Whitepaper",
                href: "https://github.com/maticnetwork/whitepaper/"
              },
              {
                label: "Lightpaper",
                href: "https://polygon.technology/lightpaper-polygon.pdf"
              },
              {
                label: "zkEVM",
                href: "docs/category/zk-assembly"
              },
              {
                label: "Miden",
                href: "docs/miden/design/main"
              },
          ]
        },
        {
          title: "Native dApps",
          items: [
                  {
                    href: 'https://wallet.polygon.technology',
                    label: 'PoS Wallet',
                    target: '_blank',
                    rel: null,
                  },
                  {
                    href: 'https://staking.polygon.technology/',
                    label: 'PoS Staking',
                    target: '_blank',
                    rel: null,
                  },
                  {
                    href: 'https://polygonscan.com/',
                    label: 'PoS Explorer',
                    target: '_blank',
                    rel: null,
                  },
                  {
                    href: 'https://explorer.hermez.io/',
                    label: 'Hermez',
                    target: '_blank',
                    rel: null,
                  },
                ],
        },
        {
          title: "Polygon Labs",
          items: [
              {
                label: "About Us",
                href: "https://polygon.technology/about/"
              },
              {
                label: "Contact",
                href: "https://polygon.technology/contact-us/"
              },
              {
                  label: "Blogs",
                  href: "https://blog.polygon.technology/"
              },
              {
                label: "Brand Kit",
                href: "https://www.notion.so/polygontechnology/Brand-Resources-2cd18ae436584e98a6c5aae56db73058/"
              },
            ]
        },
        {
          title: "Community",
          items: [
              {
                href: 'https://twitter.com/0xPolygon',
                label: 'Twitter',
              },
              {
                href: 'https://discord.com/invite/0xPolygon',
                label: 'Discord',
              },
              {
                href: 'https://forum.polygon.technology/',
                label: 'Forum',
              },
              {
                href: 'https://www.reddit.com/r/0xPolygon/',
                label: 'Reddit',
              },
              {
                href: 'https://t.me/polygonofficial',
                label: 'Telegram',
              },
            ]
          },
    ],
    logo: {
      alt: 'Polygon zkEVM Logo',
      src: 'img/polygon-zkevm.svg',
      href: 'https://polygon.technology/polygon-zkevm',
    },
    copyright: `Copyright © ${new Date().getFullYear()}`,
    },
    image: 'polygon-zkevm.svg',
    prism: {
      theme: require("prism-react-renderer/themes/github"),
      darkTheme: require("prism-react-renderer/themes/dracula"),
      defaultLanguage: "javascript",
      additionalLanguages: ['solidity']
    },
    algolia: {
      indexName: "matic_developer",
      appId: '16JCDEHCCN',
      apiKey: "757c19b23127e9c6959da7f13b71cfab",
      contextualSearch: true,
      algoliaOptions: {
        attributesToSnippet: ['content:20'],
      },
    },
    navbar: {
      hideOnScroll: true,
      logo: {
        alt: "Polygon logo",
        src: "/img/polygon-zkevm.svg",
        srcDark: "/img/polygon-zkevm.svg",
        href: 'https://wiki.polygon.technology/zkEVM',
        target: "_self",
       },
      items: [
        {
          type: 'docSidebar',
          position: 'left',
          sidebarId: 'explore',
          label: 'Protocol',
          target: '_self',
        },
        {
          type: 'docSidebar',
          position: 'left',
          sidebarId: 'build',
          label: 'Guides',
          target: '_self',
        },
        {
          type: 'docSidebar',
          position: 'left',
          sidebarId: 'faq',
          label: 'FAQs',
          target: '_self',
        },
        {
          label: "Solutions",
          position: "right",
          items: [
            {
              href: '/docs/pos/polygon-architecture',
              label: 'PoS',
              target: '_blank',
              rel: null,
            },
            {
              href: '/docs/pos/polygon-architecture',
              label: 'zkEVM',
              target: '_blank',
              rel: null,
            },
            {
              href: '/docs/supernets',
              label: 'Supernets',
              target: '_blank',
              rel: null,
            },
            {
              href: '/docs/miden',
              label: 'Miden',
              target: '_blank',
              rel: null,
            },
          ],
        },
        {
          href: "https://github.com/0xpolygonhermez",
          position: "right",
          className: "header-github-link",
          "aria-label": "GitHub repository",
        },
        {
          href: "https://twitter.com/0xPolygon",
          position: "right",
          className: "header-twitter-link",
        },
        {
          href: "https://discord.com/invite/0xPolygon",
          position: "right",
          className: "header-discord-link",
        },
      ],
    },
  },
  stylesheets: [
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/katex.min.css",
      type: "text/css",
      integrity:
        "sha384-Um5gpz1odJg5Z4HAmzPtgZKdTBHZdw8S29IecapCSB31ligYPhHQZMIlWLYQGVoc",
      crossorigin: "anonymous",
    },
  ],
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/maticnetwork/matic-docs/tree/master/",
          path: "docs",
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          remarkPlugins: [math],
          rehypePlugins: [[katex, {strict: false, throwOnError: true,globalGroup: true}]],
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        gtag: {
          trackingID: 'G-LLNECLTBDN',
          anonymizeIP: true,
        },
      },
    ],
  ],
};