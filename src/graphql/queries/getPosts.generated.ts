import * as Types from '../../generated/graphql';

export type GetPostsQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type GetPostsQuery = { __typename?: 'RootQuery', posts?: { __typename?: 'RootQueryToPostConnection', nodes: Array<{ __typename?: 'Post', title?: string | null, excerpt?: string | null, content?: string | null, id: string, databaseId: number, uri?: string | null, slug?: string | null, status?: string | null, date?: string | null, modified?: string | null, contentTypeName: string, categories?: { __typename?: 'PostToCategoryConnection', nodes: Array<{ __typename?: 'Category', id: string, name?: string | null, slug?: string | null }> } | null, featuredImage?: { __typename?: 'NodeWithFeaturedImageToMediaItemConnectionEdge', node: { __typename?: 'MediaItem', id: string, databaseId: number, sourceUrl?: string | null, altText?: string | null, caption?: string | null, title?: string | null, mediaDetails?: { __typename?: 'MediaDetails', width?: number | null, height?: number | null, sizes?: Array<{ __typename?: 'MediaSize', name?: string | null, width?: string | null, height?: string | null, sourceUrl?: string | null } | null> | null } | null } } | null }>, pageInfo: { __typename?: 'RootQueryToPostConnectionPageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null } } | null };

export type GetPostsByCategoryQueryVariables = Types.Exact<{
  categorySlug: Types.Scalars['String']['input'];
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type GetPostsByCategoryQuery = { __typename?: 'RootQuery', posts?: { __typename?: 'RootQueryToPostConnection', nodes: Array<{ __typename?: 'Post', title?: string | null, excerpt?: string | null, id: string, databaseId: number, uri?: string | null, slug?: string | null, status?: string | null, date?: string | null, modified?: string | null, contentTypeName: string, categories?: { __typename?: 'PostToCategoryConnection', nodes: Array<{ __typename?: 'Category', id: string, name?: string | null, slug?: string | null }> } | null, featuredImage?: { __typename?: 'NodeWithFeaturedImageToMediaItemConnectionEdge', node: { __typename?: 'MediaItem', id: string, databaseId: number, sourceUrl?: string | null, altText?: string | null, caption?: string | null, title?: string | null, mediaDetails?: { __typename?: 'MediaDetails', width?: number | null, height?: number | null, sizes?: Array<{ __typename?: 'MediaSize', name?: string | null, width?: string | null, height?: string | null, sourceUrl?: string | null } | null> | null } | null } } | null }>, pageInfo: { __typename?: 'RootQueryToPostConnectionPageInfo', hasNextPage: boolean, endCursor?: string | null } } | null };

export type GetRecentPostsQueryVariables = Types.Exact<{
  count?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type GetRecentPostsQuery = { __typename?: 'RootQuery', posts?: { __typename?: 'RootQueryToPostConnection', nodes: Array<{ __typename?: 'Post', id: string, databaseId: number, title?: string | null, uri?: string | null, date?: string | null, featuredImage?: { __typename?: 'NodeWithFeaturedImageToMediaItemConnectionEdge', node: { __typename?: 'MediaItem', sourceUrl?: string | null, altText?: string | null } } | null }> } | null };
