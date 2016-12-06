import React, { Component, PropTypes } from 'react';
import Page from 'pages/Page';
import SplashContainer from 'containers/Splash';

class Splash extends Component {
  render() {
    return (
      <Page {...this.getMetaData()}>
        <SplashContainer {...this.props} />
      </Page>
    );
  }

  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'Splash | reactGo';
  }

  pageMeta() {
    return [
      { name: "description", content: "A reactGo example of a voting page" }
    ];
  }

  pageLink() {
    return [];
  }
}

export default Splash;
