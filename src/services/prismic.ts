import * as prismic from '@prismicio/client';
import { HttpRequestLike } from '@prismicio/client';
import * as prismicH from '@prismicio/helpers';
import * as prismicNext from '@prismicio/next';
import { enableAutoPreviews } from '@prismicio/next';

export interface PrismicConfig {
  req?: HttpRequestLike;
}
const endpoint = process.env.PRISMIC_API_ENDPOINT;
export const repositoryName = prismic.getRepositoryName(endpoint);

export function getPrismicClient(config: PrismicConfig = {}): prismic.Client {
  const client = prismic.createClient(endpoint, {
    ...config,
    accessToken: process.env.PRISMIC_ACESS_TOKEN,
  });

  prismicNext.enableAutoPreviews({
    client,
    req: config.req,
    previewData: config.previwData,
  });

  return client;
}
