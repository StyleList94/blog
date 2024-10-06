'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const RouteProgressBar = () => (
  <ProgressBar
    height="0.25rem"
    color="rgba(191 219 254)"
    options={{ showSpinner: false }}
    shallowRouting
  />
);

export default RouteProgressBar;
