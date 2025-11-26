import * as Types from '../../generated/graphql';

export type GetPageByUriQueryVariables = Types.Exact<{
  uri: Types.Scalars['ID']['input'];
}>;


export type GetPageByUriQuery = { __typename?: 'RootQuery', page?: { __typename?: 'Page', title?: string | null, content?: string | null, id: string, databaseId: number, uri?: string | null, slug?: string | null, status?: string | null, date?: string | null, modified?: string | null, contentTypeName: string, parent?: { __typename?: 'HierarchicalContentNodeToParentContentNodeConnectionEdge', node: { __typename?: 'FlmsCertificate' } | { __typename?: 'FlmsCourse' } | { __typename?: 'FlmsExam' } | { __typename?: 'FlmsGroup' } | { __typename?: 'FlmsLesson' } | { __typename?: 'FlmsQuestion' } | { __typename?: 'FlmsTopic' } | { __typename?: 'MediaItem' } | { __typename?: 'Order' } | { __typename?: 'Page', id: string, title?: string | null, uri?: string | null } | { __typename?: 'Post' } | { __typename?: 'Product' } } | null, children?: { __typename?: 'HierarchicalContentNodeToContentNodeChildrenConnection', nodes: Array<{ __typename?: 'FlmsCertificate' } | { __typename?: 'FlmsCourse' } | { __typename?: 'FlmsExam' } | { __typename?: 'FlmsGroup' } | { __typename?: 'FlmsLesson' } | { __typename?: 'FlmsQuestion' } | { __typename?: 'FlmsTopic' } | { __typename?: 'MediaItem' } | { __typename?: 'Order' } | { __typename?: 'Page', id: string, title?: string | null, uri?: string | null } | { __typename?: 'Post' } | { __typename?: 'Product' }> } | null, featuredImage?: { __typename?: 'NodeWithFeaturedImageToMediaItemConnectionEdge', node: { __typename?: 'MediaItem', id: string, databaseId: number, sourceUrl?: string | null, altText?: string | null, caption?: string | null, title?: string | null, mediaDetails?: { __typename?: 'MediaDetails', width?: number | null, height?: number | null, sizes?: Array<{ __typename?: 'MediaSize', name?: string | null, width?: string | null, height?: string | null, sourceUrl?: string | null } | null> | null } | null } } | null } | null };

export type GetPageByIdQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type GetPageByIdQuery = { __typename?: 'RootQuery', page?: { __typename?: 'Page', title?: string | null, content?: string | null, id: string, databaseId: number, uri?: string | null, slug?: string | null, status?: string | null, date?: string | null, modified?: string | null, contentTypeName: string, featuredImage?: { __typename?: 'NodeWithFeaturedImageToMediaItemConnectionEdge', node: { __typename?: 'MediaItem', id: string, databaseId: number, sourceUrl?: string | null, altText?: string | null, caption?: string | null, title?: string | null, mediaDetails?: { __typename?: 'MediaDetails', width?: number | null, height?: number | null, sizes?: Array<{ __typename?: 'MediaSize', name?: string | null, width?: string | null, height?: string | null, sourceUrl?: string | null } | null> | null } | null } } | null } | null };

export type GetFrontPageWithSettingsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetFrontPageWithSettingsQuery = { __typename?: 'RootQuery', generalSettings?: { __typename?: 'GeneralSettings', title?: string | null, description?: string | null, url?: string | null } | null };
