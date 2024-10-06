'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const RouteProgressBar = () => (
  <ProgressBar
    height="0.125rem"
    color="rgb(29 78 216)"
    options={{ showSpinner: false }}
    shallowRouting
  />
);

export default RouteProgressBar;
