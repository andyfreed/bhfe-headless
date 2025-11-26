import * as Types from '../../generated/graphql';

export type GetPostBySlugQueryVariables = Types.Exact<{
  slug: Types.Scalars['ID']['input'];
}>;


export type GetPostBySlugQuery = { __typename?: 'RootQuery', post?: { __typename?: 'Post', title?: string | null, content?: string | null, excerpt?: string | null, id: string, databaseId: number, uri?: string | null, slug?: string | null, status?: string | null, date?: string | null, modified?: string | null, contentTypeName: string, categories?: { __typename?: 'PostToCategoryConnection', nodes: Array<{ __typename?: 'Category', id: string, name?: string | null, slug?: string | null }> } | null, author?: { __typename?: 'NodeWithAuthorToUserConnectionEdge', node: { __typename?: 'User', id: string, databaseId: number, name?: string | null, firstName?: string | null, lastName?: string | null, description?: string | null, avatar?: { __typename?: 'Avatar', url?: string | null } | null } } | null, featuredImage?: { __typename?: 'NodeWithFeaturedImageToMediaItemConnectionEdge', node: { __typename?: 'MediaItem', id: string, databaseId: number, sourceUrl?: string | null, altText?: string | null, caption?: string | null, title?: string | null, mediaDetails?: { __typename?: 'MediaDetails', width?: number | null, height?: number | null, sizes?: Array<{ __typename?: 'MediaSize', name?: string | null, width?: string | null, height?: string | null, sourceUrl?: string | null } | null> | null } | null } } | null } | null };

export type GetPostByIdQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type GetPostByIdQuery = { __typename?: 'RootQuery', post?: { __typename?: 'Post', title?: string | null, content?: string | null, excerpt?: string | null, id: string, databaseId: number, uri?: string | null, slug?: string | null, status?: string | null, date?: string | null, modified?: string | null, contentTypeName: string, categories?: { __typename?: 'PostToCategoryConnection', nodes: Array<{ __typename?: 'Category', id: string, name?: string | null, slug?: string | null }> } | null, author?: { __typename?: 'NodeWithAuthorToUserConnectionEdge', node: { __typename?: 'User', id: string, databaseId: number, name?: string | null, firstName?: string | null, lastName?: string | null, description?: string | null, avatar?: { __typename?: 'Avatar', url?: string | null } | null } } | null, featuredImage?: { __typename?: 'NodeWithFeaturedImageToMediaItemConnectionEdge', node: { __typename?: 'MediaItem', id: string, databaseId: number, sourceUrl?: string | null, altText?: string | null, caption?: string | null, title?: string | null, mediaDetails?: { __typename?: 'MediaDetails', width?: number | null, height?: number | null, sizes?: Array<{ __typename?: 'MediaSize', name?: string | null, width?: string | null, height?: string | null, sourceUrl?: string | null } | null> | null } | null } } | null } | null };

export type GetAllPostSlugsQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type GetAllPostSlugsQuery = { __typename?: 'RootQuery', posts?: { __typename?: 'RootQueryToPostConnection', nodes: Array<{ __typename?: 'Post', slug?: string | null, uri?: string | null, modified?: string | null }> } | null };
