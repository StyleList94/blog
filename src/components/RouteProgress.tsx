/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { css, Global } from '@emotion/react';
import Router from 'next/router';
import nProgress from 'nprogress';

import palette from 'styles/palette';

import 'nprogress/nprogress.css';

nProgress.configure({
  showSpinner: false,
  trickleSpeed: 200,
});

const progressStyle = css`
  #nprogress .bar {
    background-color: ${palette.blue[9]};
    height: 3px;
  }

  #nprogress .peg {
    box-shadow: 0 0 10px ${palette.blue[9]}, 0 0 5px ${palette.blue[9]};
  }
`;

const startProgress = () => {
  nProgress.start();
};

const doneProgress = () => {
  nProgress.done();
};

Router.events.on('routeChangeStart', startProgress);
Router.events.on('routeChangeComplete', doneProgress);
Router.events.on('routeChangeError', doneProgress);

const RouteProgress = () => {
  return <Global styles={progressStyle} />;
};

export default RouteProgress;
