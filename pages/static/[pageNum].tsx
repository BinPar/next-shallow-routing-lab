import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';

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

export const getStaticPaths: GetStaticPaths = async () => {    
  const pages = new Array(100).fill(1).map((_,i) => `${i}`);
  return {
    paths: pages.map((pageNum) => ({ params: { pageNum } })),
    fallback: true,
  };
};


export const getStaticProps: GetStaticProps<PageProps,
{ pageNum: string }> = async (req) => {
  return {
    props: {
      pageNum: parseInt(req.params.pageNum, 10),
    },
  };
};

export default pageView;
