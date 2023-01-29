import { css } from '@emotion/react';

import palette from '@/styles/palette';

const base = css`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }

  pre > div {
    &::-webkit-scrollbar {
      background-color: transparent;
      width: 10px;
      height: 10px;
    }
    &::-webkit-scrollbar-track {
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 4px;
      width: 4px;
      height: 4px;
      background-color: ${palette.gray[6]};
    }
  }
`;

export default base;
