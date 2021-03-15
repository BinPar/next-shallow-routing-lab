import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { GetServerSideProps } from 'next';

interface PageProps {
  pageNum: number;
}

const pageView: React.FC<PageProps> = ({ pageNum }) => {
  const [mounts, setMounts] = useState<Date[]>(new Array<Date>());

  useEffect(() => {
    setMounts((prevMounts) => [...prevMounts, new Date()]);
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>{`Page: ${pageNum}`}</title>
        <link rel="stylesheet" type="text/css" href="/styles.css" />
      </Head>
      <h1>{`Page: ${pageNum}`}</h1>
      <Link href={`/view/${pageNum - 1}`}>
        <a>Prev Page</a>
      </Link>
      &nbsp;/&nbsp;
      <Link href={`/view/${pageNum + 1}`}>
        <a>Next Page</a>
      </Link>
      <h2>Mounts:</h2>
      <ul>
        {
          mounts.map((date) => (
            <li key={date.toISOString()}>
              Mounted at
              {' '}
              {date.toTimeString()}
            </li>
))
        }
      </ul>
    </React.Fragment>
  );
};

export const getServerSideProps: GetServerSideProps<
  PageProps,
  { pageNum: string }
> = async (req) => {
  return {
    props: {
      pageNum: parseInt(req.params.pageNum, 10),
    },
  };
};

export default pageView;
