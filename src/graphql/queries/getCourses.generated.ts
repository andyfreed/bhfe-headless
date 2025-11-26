import * as Types from '../../generated/graphql';

export type GetCoursesQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type GetCoursesQuery = { __typename?: 'RootQuery', flmsCourses?: { __typename?: 'RootQueryToFlmsCourseConnection', nodes: Array<{ __typename?: 'FlmsCourse', id: string, databaseId: number, title?: string | null, uri?: string | null, slug?: string | null, date?: string | null, modified?: string | null, courseNumber?: string | null, courseDescription?: string | null, coursePreview?: string | null, wooProductId?: number | null, courseCredits?: Array<{ __typename?: 'FlmsCourseCredit', type?: string | null, name?: string | null, credits?: string | null } | null> | null, courseMaterials?: Array<{ __typename?: 'FlmsCourseMaterial', title?: string | null, file?: string | null, status?: string | null } | null> | null, masterCourseListFields?: { __typename?: 'MasterCourseListFields', fieldGroupName?: string | null, iarApprovalDate?: string | null, notes?: string | null } | null }>, pageInfo: { __typename?: 'RootQueryToFlmsCourseConnectionPageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null } } | null };

export type GetCourseCardsQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type GetCourseCardsQuery = { __typename?: 'RootQuery', flmsCourses?: { __typename?: 'RootQueryToFlmsCourseConnection', nodes: Array<{ __typename?: 'FlmsCourse', id: string, databaseId: number, title?: string | null, uri?: string | null, slug?: string | null, courseNumber?: string | null, courseDescription?: string | null, courseCredits?: Array<{ __typename?: 'FlmsCourseCredit', name?: string | null, credits?: string | null } | null> | null, featuredImage?: { __typename?: 'NodeWithFeaturedImageToMediaItemConnectionEdge', node: { __typename?: 'MediaItem', sourceUrl?: string | null, altText?: string | null } } | null }>, pageInfo: { __typename?: 'RootQueryToFlmsCourseConnectionPageInfo', hasNextPage: boolean, endCursor?: string | null } } | null };

export type GetCourseBySlugQueryVariables = Types.Exact<{
  slug: Types.Scalars['ID']['input'];
}>;


export type GetCourseBySlugQuery = { __typename?: 'RootQuery', flmsCourse?: { __typename?: 'FlmsCourse', id: string, databaseId: number, title?: string | null, uri?: string | null, slug?: string | null, date?: string | null, modified?: string | null, courseNumber?: string | null, courseDescription?: string | null, coursePreview?: string | null, wooProductId?: number | null, courseCredits?: Array<{ __typename?: 'FlmsCourseCredit', type?: string | null, name?: string | null, credits?: string | null } | null> | null, courseMaterials?: Array<{ __typename?: 'FlmsCourseMaterial', title?: string | null, file?: string | null, status?: string | null } | null> | null, masterCourseListFields?: { __typename?: 'MasterCourseListFields', fieldGroupName?: string | null, iarApprovalDate?: string | null, notes?: string | null } | null } | null };

export type GetCourseByIdQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type GetCourseByIdQuery = { __typename?: 'RootQuery', flmsCourse?: { __typename?: 'FlmsCourse', id: string, databaseId: number, title?: string | null, uri?: string | null, slug?: string | null, date?: string | null, modified?: string | null, courseNumber?: string | null, courseDescription?: string | null, coursePreview?: string | null, wooProductId?: number | null, courseCredits?: Array<{ __typename?: 'FlmsCourseCredit', type?: string | null, name?: string | null, credits?: string | null } | null> | null, courseMaterials?: Array<{ __typename?: 'FlmsCourseMaterial', title?: string | null, file?: string | null, status?: string | null } | null> | null, masterCourseListFields?: { __typename?: 'MasterCourseListFields', fieldGroupName?: string | null, iarApprovalDate?: string | null, notes?: string | null } | null } | null };

export type GetAllCourseSlugsQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type GetAllCourseSlugsQuery = { __typename?: 'RootQuery', flmsCourses?: { __typename?: 'RootQueryToFlmsCourseConnection', nodes: Array<{ __typename?: 'FlmsCourse', uri?: string | null, slug?: string | null, databaseId: number, modified?: string | null }> } | null };

export type GetFeaturedCoursesHomepageQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type GetFeaturedCoursesHomepageQuery = { __typename?: 'RootQuery', flmsCourses?: { __typename?: 'RootQueryToFlmsCourseConnection', nodes: Array<{ __typename?: 'FlmsCourse', courseDescription?: string | null, id: string, databaseId: number, title?: string | null, uri?: string | null, slug?: string | null, courseNumber?: string | null, courseCredits?: Array<{ __typename?: 'FlmsCourseCredit', name?: string | null, credits?: string | null } | null> | null, featuredImage?: { __typename?: 'NodeWithFeaturedImageToMediaItemConnectionEdge', node: { __typename?: 'MediaItem', sourceUrl?: string | null, altText?: string | null } } | null }> } | null };
