import * as React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { firstRow, secondRow } from "../data/features";

function FirstRow({ title, linkUrl, imageUrl }) {
  return (
    <div className="col-md-4 p-8">
      <Link to={useBaseUrl(linkUrl)}>
        <div className="show-card">
          <div className="icon-wrapper">
            <iframe src={imageUrl} frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen="" style={{position:"absolute", height: "80%"}} title="Hero" data-ready="true"></iframe>
          </div>
          <div className="title">{title}</div>
        </div>
      </Link>
    </div>
  );
}

function SecondRow({ title, linkUrl }) {
  return (
    <div className="col-md-6 p-8">
      <Link to={useBaseUrl(linkUrl)} activeClassName="active">
        <div className="show-card">
          <div className="title">
            <span className="github-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
              </svg>
            </span>
            {title}
          </div>
        </div>
      </Link>
    </div>
  );
}

function Home() {
  return (
    <Layout>
      <div className="bootstrap-wrapper">
        <br />
        <div className="container">
          <div className="row">
            <div className="index-page exclude">
            <section className="section container-fluid">
            <div className="row justify-content-center">
              <div className="col-lg-8 pop-text">
                <h1 className="mt-0">
                  zkEVM <span className="white-text">for Builders</span>
                </h1>
                <h3 className="mt-0">Ethereum scalability with zkEVM <span className="white-text">performance and security</span></h3>
                <p className="lead">
                  <b>Polygon zkEVM Developers</b> is the documentation hub providing 
                  extensive documentation, community resources, and guides for enthusiasts 
                  and developers interested in learning about or building on zkEVM.
                </p>
              </div>
              <div className="col-lg-4">
                <div className="tabs_animation-wrapper">
                  <iframe
                    src="https://player.vimeo.com/video/791154651?h=f4d511386d&badge=0&autopause=0&player_id=0&app_id=58479&loop=1&autoplay=1&background=1"
                    frameBorder="0"
                    allow="autoplay"
                    className="tabs-frame"
                    title="Hero"
                    data-ready="true"
                    width="800"
                    height="450"
                  />
                </div>
              </div>
            </div>
            </section>
            </div>
            <div className="row">
              {firstRow &&
                firstRow.length &&
                firstRow.map((props, idx) => (
                  <FirstRow key={idx} {...props} />
                ))}
            </div>
            <br />
            <br />
          </div>
          <div className="row" style={{marginBottom: 32}}>
            <a href="https://github.com/0xpolygonhermez" style={{color: "white", display: "inline-flex"}} className="pop-text">
              <h1 style={{fontSize: 40}}>GitHub <span className="white-text">Repositories</span></h1>
              <span className="button-icon_right-element is-icon-medium">
                <div className="w-embed">
                  <svg width="3rem" height="3rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 17L17 7M17 7V17M17 7H7" stroke="currentcolor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                  </svg>
                </div>
              </span>
            </a>
            <div className="row">
              {secondRow &&
                secondRow.length &&
                secondRow.map((props, idx) => (
                  <SecondRow key={idx} {...props} />
                ))}
            </div>           
          </div>
          <div className="row" style={{marginBottom: 32}}>
              <div className="col-md-12 p-8" style={{padding: "0px"}}>
                  <div className="show-card">
                    <div className="call-to-action">
                      <div>
                        NETWORK STATUS
                        <p className="c2a-text">You can check the live status of Polygon zkEVM network using the following links for Mainnet Beta and Public Testnet.</p>
                      </div>
                      <div>
                        <a href="https://status.zkevm-rpc.com/" target="_blank" class="button white-button" style={{marginRight: 8}}>Mainnet Beta</a>
                        <a href="https://status.zkevm-test.net/" target="_blank" class="button white-button">Public Testnet</a>
                      </div>
                    </div>
                  </div>
              </div>          
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
