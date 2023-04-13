![Prod-frontend][Build-status]
[![Vulnerabilities][Vulnerability-badge]][Sonar-url]

# Polygon Technologies Website

This is the repo for the polygon.technology website. Here you will find architecture,
deployment, setup, and status information for the site.

## Built With
[![Node.js 14.17][Nodejs-badge]][Nodejs-url]

## Build Setup

### Getting Started

#### TODO: Update with steps relevant to repo

- Clone this repository
- Create a `.env` file in the folder root.
    - Use [.env.example](.env.example) for reference
    - All fields in the `.env` file are mandatory. [Contact DevOps](https://help.polygon.technology/a/tickets/new) for assistance if needed.
- Install package dependencies with `npm install`. Yarn is not supported at this time.
- Start a local development environment on `http://localhost:3000` with `npm run dev`
- Verify tests are passing with `npm run test`

### Other useful commands

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

## Contributing

To contribute to this repo, follow these steps:
- Get a running copy of the application using the steps above
- Create a new git branch referencing your ticket number and work to be performed
  (i.e. `INC-1234/add-contact-us`)
- Do not make architectural, platform, runtime, or deployment changes without discussing
  with DevOps prior to starting or committing to work
- Write the code necessary to complete your tasks, including tests to cover the code
  you have written
- Verify your changes perform as expected locally
- Verify your code changes introduce no new warnings or errors
- Push your branch to GitHub
- Open a pull request to merge into the `main` branch
- Request a code review from the team
- Upon merging, verify deployment is successful and all changes operate as expected
- Delete your merged branch from GitHub


## Architecture

### The Website

The site is built using [Docusaurus](https://docusaurus.io/)

### GitHub Actions Workflow Files

#### backend.yml
This workflow is triggered by the `strapi_manual` repository dispatch on the
`main` branch. It builds and deploys the production instance of strapi.

<!-- MARKDOWN LINKS AND IMAGES -->
[Build-status]: https://github.com/maticnetwork/webdev-polytech/actions/workflows/backend.yml/badge.svg

[Vulnerability-badge]: https://sonarqube.polygon.technology/api/project_badges/measure?project=maticnetwork_polygon-university-cms_AYV4BUZSoHLw1uOg0ph5&metric=vulnerabilities&token=8f1a056272a462a7e81e5b3b7434f63041362dfe
[Sonar-url]: https://sonarqube.polygon.technology/dashboard?id=maticnetwork_polygon-university-cms_AYV4BUZSoHLw1uOg0ph5

[Nodejs-badge]: https://img.shields.io/badge/Node.js-14.17.5-informational?logo=node.js
[Nodejs-url]: https://nodejs.org/

[Slack-badge]: https://img.shields.io/badge/Slack-team_product_apps-informational?logo=slack

[Production-badge]: https://img.shields.io/badge/Production_URL-polygon.technology-informational
[Production-url]: https://wiki.polygon.technology/zkEVM
