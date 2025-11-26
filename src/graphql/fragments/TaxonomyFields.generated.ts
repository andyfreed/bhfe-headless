import * as Types from '../../generated/graphql';

export type CategoryFieldsFragment = { __typename?: 'Category', id: string, databaseId: number, name?: string | null, slug?: string | null, uri?: string | null, description?: string | null, count?: number | null, parent?: { __typename?: 'CategoryToParentCategoryConnectionEdge', node: { __typename?: 'Category', id: string, name?: string | null, slug?: string | null } } | null };

export type TagFieldsFragment = { __typename?: 'Tag', id: string, databaseId: number, name?: string | null, slug?: string | null, uri?: string | null, count?: number | null };

export type TermFields_Category_Fragment = { __typename?: 'Category', id: string, databaseId: number, name?: string | null, slug?: string | null, uri?: string | null, description?: string | null, count?: number | null, taxonomyName?: string | null };

export type TermFields_FlmsQuestionCategory_Fragment = { __typename?: 'FlmsQuestionCategory', id: string, databaseId: number, name?: string | null, slug?: string | null, uri?: string | null, description?: string | null, count?: number | null, taxonomyName?: string | null };

export type TermFields_PostFormat_Fragment = { __typename?: 'PostFormat', id: string, databaseId: number, name?: string | null, slug?: string | null, uri?: string | null, description?: string | null, count?: number | null, taxonomyName?: string | null };

export type TermFields_ProductCategory_Fragment = { __typename?: 'ProductCategory', id: string, databaseId: number, name?: string | null, slug?: string | null, uri?: string | null, description?: string | null, count?: number | null, taxonomyName?: string | null };

export type TermFields_ProductTag_Fragment = { __typename?: 'ProductTag', id: string, databaseId: number, name?: string | null, slug?: string | null, uri?: string | null, description?: string | null, count?: number | null, taxonomyName?: string | null };

export type TermFields_Tag_Fragment = { __typename?: 'Tag', id: string, databaseId: number, name?: string | null, slug?: string | null, uri?: string | null, description?: string | null, count?: number | null, taxonomyName?: string | null };

export type TermFieldsFragment = TermFields_Category_Fragment | TermFields_FlmsQuestionCategory_Fragment | TermFields_PostFormat_Fragment | TermFields_ProductCategory_Fragment | TermFields_ProductTag_Fragment | TermFields_Tag_Fragment;

export type PostCategoriesFieldsFragment = { __typename?: 'Post', categories?: { __typename?: 'PostToCategoryConnection', nodes: Array<{ __typename?: 'Category', id: string, databaseId: number, name?: string | null, slug?: string | null, uri?: string | null, description?: string | null, count?: number | null, parent?: { __typename?: 'CategoryToParentCategoryConnectionEdge', node: { __typename?: 'Category', id: string, name?: string | null, slug?: string | null } } | null }> } | null };
