import { useRouter } from 'next/router';
import DefaultErrorPage from 'next/error';
import Head from 'next/head';
import React from 'react';
import { BuilderComponent, builder, useIsPreviewing, Builder } from '@builder.io/react';

import Header from '../components/header'

// Section Imports
import ComingSoon from '../components/sections/ComingSoon'

// Initialize the Builder SDK with your organization's API Key
// Find the API Key on: https://builder.io/account/settings
builder.init('aa3c766c9465412caf4ac45664fa1857');

export async function getStaticProps({ params }) {
  // Fetch the first page from Builder that matches the current URL.
  // Use the `userAttributes` field for targeting content.
  // For more, see https://www.builder.io/c/docs/targeting-with-builder
  const page = await builder
    .get('page', {
      userAttributes: {
        urlPath: '/' + (params?.page?.join('/') || ''),
      },
    })
    .toPromise();

  return {
    props: {
      page: page || null,
    },
    revalidate: 5,
  };
}

export async function getStaticPaths() {
  //  Fetch all published pages for the current model.
  //  Using the `fields` option will limit the size of the response
  //  and only return the `data.url` field from the matching pages.
  const pages = await builder.getAll('page', {
    fields: 'data.url', // only request the `data.url` field
    options: { noTargeting: true },
    limit: 0,
  });

  return {
    paths: pages.map(page => `${page.data?.url}`),
    fallback: true,
  };
}

export default function Page({ page }) {
  const router = useRouter();
  //  This flag indicates if you are viewing the page in the Builder editor.
  const isPreviewing = useIsPreviewing();

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  //  Add your error page here to return if there are no matching
  //  content entries published in Builder.
  if (!page && !isPreviewing) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <>
      <Head>
        {/* Add any relevant SEO metadata or open graph tags here */}
        <title>{page?.data.title}</title>
        <meta name="description" content={page?.data.descripton} />
      </Head>
      <Header />

      {/* Render the Builder page */}
      <BuilderComponent model="page" content={page} options={{ includeRefs: true }} />
    </>
  );
}

Builder.register('insertMenu', {
  name: 'Page Sections',
  items: [
    { name: 'Coming Soon' },
  ],
}) 