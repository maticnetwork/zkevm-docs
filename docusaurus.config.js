const math = require('remark-math');
const katex = require('rehype-katex');

module.exports = {
  title: "Polygon zkEVM Documentation",
  tagline: "The official developer documentation portal for Polygon zkEVM protocol.",
  url: "https://zkevm.polygon.technology",
  baseUrl: "/",
  favicon: "/img/logo-round-purple.png",
  organizationName: "maticnetwork",
  projectName: "zkevm-docs",
  customFields: {
    description: "Build your next blockchain dApp on Polygon zkEVM.",
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
    metadata: [{name: 'description', content: 'Welcome to Polygon zkEVM Documentation, the official documentation portal for Polygon zkEVM.'}],
    announcementBar: {
      id: 'banner',
      content: `
        <div class="announcement-bar">
          Polygon zkEVM Mainnet Beta is now Live! 
          <a href="/docs/develop" class="announcement-link" style="color: #ffffff;">Start Building</a>
          <a href="/docs/risk-disclosure" class="announcement-link" style="color: #ffffff;">Risks</a>
        </div>
      `,
      textColor: '#ffffff',
      isCloseable: false,
    },

    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },

    footer: {
      style: 'dark',
      links: [
        {
          title: "Polygon Labs",
          items: [
            {
              label: "About Us",
              href: "https://polygon.technology/about/"
            },
            {
              label: "Blog",
              href: "https://blog.polygon.technology/"
            },
            {
              label: "Careers",
              href: "https://polygon.technology/careers"
            },
            {
              label: "Matic Token",
              href: "https://polygon.technology/matic-token"
            },
            {
              label: "Contact Us",
              href: "https://polygon.technology/contact-us/"
            },
          ]
        },
        {
          title: "Solutions",
          items: [
            {
              label: "Polygon PoS",
              href: "https://polygon.technology/polygon-pos"
            },
            {
              label: "Polygon zkEVM",
              href: "https://polygon.technology/polygon-zkevm"
            },
            {
              label: "Polygon Supernets",
              href: "https://polygon.technology/polygon-supernets"
            },
            {
              label: "Polygon Miden",
              href: "https://polygon.technology/polygon-miden"
            },
            {
              label: "Polygon ID",
              href: "https://polygon.technology/polygon-id"
            },
          ]
        },
        {
          title: "Use Polygon",
          items: [
            {
              href: 'https://wallet.polygon.technology',
              label: 'Polygon Wallet Suite',
              target: '_blank',
              rel: null,
            },
            {
              href: 'https://staking.polygon.technology/',
              label: 'Staking',
              target: '_blank',
              rel: null,
            },
            {
              href: 'https://polygonscan.com/',
              label: 'Polygon Scan',
              target: '_blank',
              rel: null,
            },
            {
              href: 'https://mapper.polygon.technology/',
              label: 'Token Mapper',
              target: '_blank',
              rel: null,
            },
            {
              href: 'https://polygon.technology/ecosystem',
              label: 'Ecosystem dApps',
              target: '_blank',
              rel: null,
            },
          ],
        },
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
            },
          ]
        },
        {
          title: "Community",
          items: [
            {
              href: 'https://twitter.com/0xPolygonLabs',
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
        {
          title: "Legal",
          items: [
              {
                href: 'https://polygon.technology/terms-of-use',
                label: 'Terms of Use',
              },
              {
                label: "Privacy Policy",
                href: "https://polygon.technology/privacy-policy"
              },
              {
                label: "Cookie Policy",
                href: "https://polygon.technology/cookie-policy"
              },
              {
                label: "Risks",
                href: "/risk-disclosure"
              },
          ]
        },
      ],
    },
    image: 'img/thumbnail.png',
    prism: {
      theme: require("prism-react-renderer/themes/github"),
      darkTheme: require("prism-react-renderer/themes/dracula"),
      defaultLanguage: "javascript",
      additionalLanguages: ['solidity']
    },
    algolia: {
      // need to update this
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
        src: "img/polygon-zkevm.svg",
        srcDark: "img/polygon-zkevm.svg",
        href: 'https://zkevm.polygon.technology',
        target: "_self",
       },
      items: [
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
          sidebarId: 'specifications',
          label: 'Specs',
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
              href: 'https://wiki.polygon.technology/docs/pos/polygon-architecture',
              label: 'PoS',
              target: '_blank',
              rel: null,
            },
            {
              href: '/',
              label: 'zkEVM',
              target: '_self',
              rel: null,
            },
            {
              href: 'https://wiki.polygon.technology/docs/supernets',
              label: 'Supernets',
              target: '_blank',
              rel: null,
            },
            {
              href: 'https://wiki.polygon.technology/docs/miden',
              label: 'Miden',
              target: '_blank',
              rel: null,
            },
            {
              href: 'https://0xpolygonid.github.io/tutorials/',
              label: 'ID',
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
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/maticnetwork/zkevm-docs/tree/main/",
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
          // Need to create new tags for zkEVM docs
           trackingID: 'G-LLNECLTBDN',
           anonymizeIP: true,
        },
      },
    ],
  ],
};
