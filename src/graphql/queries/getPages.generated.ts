import * as Types from '../../generated/graphql';

export type GetPagesQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type GetPagesQuery = { __typename?: 'RootQuery', pages?: { __typename?: 'RootQueryToPageConnection', nodes: Array<{ __typename?: 'Page', title?: string | null, id: string, databaseId: number, uri?: string | null, slug?: string | null, status?: string | null, date?: string | null, modified?: string | null, contentTypeName: string, parent?: { __typename?: 'HierarchicalContentNodeToParentContentNodeConnectionEdge', node: { __typename?: 'FlmsCertificate' } | { __typename?: 'FlmsCourse' } | { __typename?: 'FlmsExam' } | { __typename?: 'FlmsGroup' } | { __typename?: 'FlmsLesson' } | { __typename?: 'FlmsQuestion' } | { __typename?: 'FlmsTopic' } | { __typename?: 'MediaItem' } | { __typename?: 'Order' } | { __typename?: 'Page', id: string, slug?: string | null, uri?: string | null, title?: string | null } | { __typename?: 'Post' } | { __typename?: 'Product' } } | null, children?: { __typename?: 'HierarchicalContentNodeToContentNodeChildrenConnection', nodes: Array<{ __typename?: 'FlmsCertificate' } | { __typename?: 'FlmsCourse' } | { __typename?: 'FlmsExam' } | { __typename?: 'FlmsGroup' } | { __typename?: 'FlmsLesson' } | { __typename?: 'FlmsQuestion' } | { __typename?: 'FlmsTopic' } | { __typename?: 'MediaItem' } | { __typename?: 'Order' } | { __typename?: 'Page', id: string, slug?: string | null, uri?: string | null, title?: string | null } | { __typename?: 'Post' } | { __typename?: 'Product' }> } | null, featuredImage?: { __typename?: 'NodeWithFeaturedImageToMediaItemConnectionEdge', node: { __typename?: 'MediaItem', id: string, databaseId: number, sourceUrl?: string | null, altText?: string | null, caption?: string | null, title?: string | null, mediaDetails?: { __typename?: 'MediaDetails', width?: number | null, height?: number | null, sizes?: Array<{ __typename?: 'MediaSize', name?: string | null, width?: string | null, height?: string | null, sourceUrl?: string | null } | null> | null } | null } } | null }> } | null };

export type GetTopLevelPagesQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type GetTopLevelPagesQuery = { __typename?: 'RootQuery', pages?: { __typename?: 'RootQueryToPageConnection', nodes: Array<{ __typename?: 'Page', id: string, databaseId: number, title?: string | null, uri?: string | null, slug?: string | null, menuOrder?: number | null, children?: { __typename?: 'HierarchicalContentNodeToContentNodeChildrenConnection', nodes: Array<{ __typename?: 'FlmsCertificate' } | { __typename?: 'FlmsCourse' } | { __typename?: 'FlmsExam' } | { __typename?: 'FlmsGroup' } | { __typename?: 'FlmsLesson' } | { __typename?: 'FlmsQuestion' } | { __typename?: 'FlmsTopic' } | { __typename?: 'MediaItem' } | { __typename?: 'Order' } | { __typename?: 'Page', id: string, title?: string | null, uri?: string | null, slug?: string | null, menuOrder?: number | null } | { __typename?: 'Post' } | { __typename?: 'Product' }> } | null }> } | null };

export type GetAllPageUrisQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type GetAllPageUrisQuery = { __typename?: 'RootQuery', pages?: { __typename?: 'RootQueryToPageConnection', nodes: Array<{ __typename?: 'Page', uri?: string | null, slug?: string | null, modified?: string | null }> } | null };
