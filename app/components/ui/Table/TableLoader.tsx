import { Fragment } from 'react';

import dynamic from 'next/dynamic';

import { IContentLoaderProps } from 'react-content-loader';

const ContentLoader = dynamic(() => import('react-content-loader'), { ssr: false });

function TableLoader(props: IContentLoaderProps) {
  return (
    <ContentLoader
      className="size-full"
      height="360"
      {...props}
    >
      <rect
        x="0"
        y="8"
        rx="4"
        ry="4"
        width="20%"
        height="40"
      />
      <rect
        x="21%"
        y="30"
        rx="4"
        ry="4"
        width="20%"
        height="20"
      />
      <rect
        x="80%"
        y="8"
        rx="4"
        ry="4"
        width="20%"
        height="40"
      />
      <rect
        x="0"
        y="80"
        rx="4"
        ry="4"
        width="100%"
        height="20"
      />

      {Array.from({ length: 8 }).map((_, i) => {
        return (
          <Fragment key={`table-loader-row-${i}`}>
            <rect
              x="0"
              y={110 + i * 32}
              rx="8"
              ry="8"
              width="40%"
              height="24"
            />
            <rect
              x="41%"
              y={110 + i * 32}
              rx="8"
              ry="8"
              width="20%"
              height="24"
            />
            <rect
              x="62%"
              y={110 + i * 32}
              rx="8"
              ry="8"
              width="20%"
              height="24"
            />
            <rect
              x="83%"
              y={110 + i * 32}
              rx="8"
              ry="8"
              width="20%"
              height="24"
            />
          </Fragment>
        );
      })}
    </ContentLoader>
  );
}
export default TableLoader;
