<br>

<p align="center">
<img align="center" src="/static/img/polygon-zkevm.svg" width="300">
</p>

<br>

<p align="center">
   <a href="https://github.com/maticnetwork/zkevm-docs/network/members"><img src="https://img.shields.io/github/forks/maticnetwork/zkevm-docs?style=social"></a>
   <img src="https://img.shields.io/github/stars/maticnetwork/zkevm-docs?style=social">
   <img src="https://img.shields.io/github/languages/count/maticnetwork/zkevm-docs">
   <a href="https://github.com/maticnetwork/zkevm-docs/issues"><img src="https://img.shields.io/github/issues/maticnetwork/zkevm-docs"></a>
   <a href="https://github.com/maticnetwork/zkevm-docs/pulls"><img src="https://img.shields.io/github/issues-pr-raw/maticnetwork/zkevm-docs"></a>
   <a href="https://github.com/maticnetwork/zkevm-docs/graphs/contributors"><img src="https://img.shields.io/github/contributors-anon/maticnetwork/zkevm-docs"></a>
   <img src="https://img.shields.io/github/languages/code-size/maticnetwork/zkevm-docs">
   <a href="https://discord.gg/zdwkdvMNY2"><img src="https://img.shields.io/discord/714888181740339261?color=1C1CE1&label=Polygon%20%7C%20Discord%20%F0%9F%91%8B%20&style=flat-square"></a>
   <a href="https://twitter.com/0xPolygon"><img src="https://img.shields.io/twitter/follow/0xPolygon.svg?style=social"></a>
   
</p>

Polygon zkEVM Builders is the documentation hub providing extensive documentation, community resources, and guides for enthusiasts and developers interested in learning about or building on zkEVM.

The [Polygon zKEVM Builders](https://zkevm.polygon.technology) website is built using [Docusaurus](https://docusaurus.io/), 
a modern static website generator to build optimized websites quickly.

## Contribute to Polygon zkEVM Builders

We believe one of the things that makes Polygon Labs unique is its coherent design, and we seek to retain this defining 
characteristic across all our solutions. We have defined some guidelines to ensure new contributions only ever enhance the 
developer docs from the outset.

### Requirements

Note that on macOS, you also need Xcode and Command Line Tools.

* Install [Node.js](https://nodejs.org/en/download/) version >= 16.14.1
* Install [Yarn](https://yarnpkg.com/getting-started/install) version >= 1.22  

### Run the Wiki locally

1. Fork the repo. 
   > For help, refer to [GitHub Docs: Fork a repo](https://help.github.com/en/articles/fork-a-repo).
   
2. Clone your forked repo.
   
    ```
    git clone git@github.com:[your_github_handle]/zkevm-docs
    ```

3. Navigate into the cloned folder.
   
    ```
    cd zkevm-docs
    ```

4. Link your cloned repo to the upstream repo.
   > For help, see [GitHub Docs: Configuring a remote for a fork](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/configuring-a-remote-for-a-fork).
   
    ```
    git remote add upstream https://github.com/maticnetwork/zkevm-docs
    ```

5. If you have already cloned the repository, be sure to sync your fork with the latest changes. 
   > For help, refer to [GitHub Docs: Syncing a fork](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/syncing-a-fork).

    ```
    git checkout master
    git fetch upstream
    git merge upstream/master
    ```

6. Install the dependencies.
   
    ```
    yarn install
    ```
    
   The site is built using Docusaurus. You may need to install Docusaurus before running the Wiki locally.

   ```
   yarn add docusaurus
   ```
   
   Alternatively, you can upgrade Docusaurus.

   ```
   yarn upgrade @docusaurus/core@latest @docusaurus/preset-classic@latest
   ```

7. Run the Wiki locally. 
   The following command will start a local development server and open a browser window. 
   Most changes are reflected live without having to restart the server.

    ```
    yarn start
    ```

### Make changes using Git GUI and code editor

After running the Wiki locally on your machine, use a code editor to apply your changes before submitting 
your PR. Note that you must have a GitHub account and an understanding of Markdown syntax.

1. Create a new branch for your changes.
   
    ```
    git checkout -b [new_branch_name]
    ```

2. Commit your changes. Please be sure to review our [Git Rules](https://wiki.polygon.technology/docs/contribute/orientation#git-rules). 
   In the commit message, please reference the issue it resolves. 
   For help, see [GitHub Docs: Linking a pull request to an issue using a keyword](https://docs.github.com/en/free-pro-team@latest/github/managing-your-work-on-github/linking-a-pull-request-to-an-issue#linking-a-pull-request-to-an-issue-using-a-keyword).

    ```
    git commit -m "brief description of changes"
    ```

3. Push to your forked repository.
   
    ```
    git push
    ```

4. Submit a PR against the `main` branch of the `maticnetwork/zkevm-docs` repo.
   
5. Add a title to your PR with appropriate labels.
   > For example, if you want to suggest edits to the "Develop" page, name your PR: *update: develop.md*.
   
6. Add a description to your PR. Please reference the issue it resolves. 
   > For help, see [GitHub Docs: Linking a pull request to an issue using a keyword](https://docs.github.com/en/free-pro-team@latest/github/managing-your-work-on-github/linking-a-pull-request-to-an-issue#linking-a-pull-request-to-an-issue-using-a-keyword).
   
7. Write a brief description of the changes you have made. If possible, include screenshots and references.

You can apply UI changes, sidebar, and configuration design through the following files:

- To modify the **Sidebar** navigation, edit **sidebars.js**
- To modify the website page layout, edit **docusaurus.config.js**
- To modify the blocks structure and the footer links, edit **src/pages/index.js**

### Making changes using the Wiki website

You can easily submit an edit suggestion. Note that you must have a GitHub account and good knowledge of Markdown syntax.

1. Navigate to the [Polygon zkEVM Builders page](https://zkevm.polygon.technology) that you want to edit.

2. Scroll down until the end of that page.

3. Click on the link: **Edit this page**. It will forward you to the same page (Markdown format) hosted on GitHub.

4. On the related GitHub page, click the pencil icon (similar to ✎) near the upper right corner of the file.

5. Apply your edits by modifying the Markdown file.

6. After you finish, scroll down until the end of that page to create a pull request.

7. Add a title to your PR.

8. Add a description to your PR. Please reference the issue it resolves.
   > For help, see [GitHub Docs: Linking a pull request to an issue using a keyword](https://docs.github.com/en/free-pro-team@latest/github/managing-your-work-on-github/linking-a-pull-request-to-an-issue#linking-a-pull-request-to-an-issue-using-a-keyword).

9.  Write a brief description of the changes you have made. If possible, include screenshots and references.

10. Click on the green button **Propose changes** to submit your changes. Note that submitting a change will write 
    it to a new branch in your fork.

One of the Wiki maintainers will review your PR and either accept it or submit their review.

Acceptable PRs will be approved & merged into the `main` branch.

## Submit an Issue

- Create a [new issue](https://github.com/maticnetwork/zkevm-docs/issues/new/choose) to report a bug, request a feature, 
  or suggest changes.

- Comment on the issue if you want to be assigned to it so [our team can assign the issue to you](https://github.blog/2019-06-25-assign-issues-to-issue-commenters/).

- If you do not have a specific contribution in mind, you can also browse current issues.

- Issues that additionally have the `good first issue` label are considered ideal for first-timers.

## Build

This command generates static content into the `build` directory and can be served using any static content hosting 
service:

```
yarn build
```

## Deployment

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the 
`gh-pages` branch.

```
GIT_USER=[your_github_handle] USE_SSH=true yarn deploy
```

### Caching

Deployments leverage GitHub caching to improve build times. Currently, 3 levels of caching are 
implemented:

- `.docusaurus`: caches the site structure. The build process will update this as needed
- `build`: caches the static assets to avoid regenerating any pages that have not changed
- `node_modules`: caches node_modules based on the hash of `yarn.lock`. Any changes to package dependencies will invalidate and rebuild this cache

Current cache config is defined in [master_deployment.yml](.github/workflows/master_deployment.yml#39). Caches can be viewed or invalidated in the 
GitHub repo settings.
