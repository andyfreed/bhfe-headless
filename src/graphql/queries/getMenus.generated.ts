import * as Types from '../../generated/graphql';

export type GetMenuByLocationQueryVariables = Types.Exact<{
  location: Types.MenuLocationEnum;
}>;


export type GetMenuByLocationQuery = { __typename?: 'RootQuery', menuItems?: { __typename?: 'RootQueryToMenuItemConnection', nodes: Array<{ __typename?: 'MenuItem', id: string, databaseId: number, label?: string | null, url?: string | null, path?: string | null, target?: string | null, cssClasses?: Array<string | null> | null, parentId?: string | null, order?: number | null, connectedNode?: { __typename?: 'MenuItemToMenuItemLinkableConnectionEdge', node: { __typename: 'Category', uri?: string | null, slug?: string | null } | { __typename: 'FlmsCourse', uri?: string | null, slug?: string | null } | { __typename: 'FlmsExam' } | { __typename: 'FlmsLesson' } | { __typename: 'FlmsTopic' } | { __typename: 'Page', uri?: string | null, slug?: string | null } | { __typename: 'Post', uri?: string | null, slug?: string | null } | { __typename: 'Product' } | { __typename: 'ProductCategory' } | { __typename: 'ProductTag' } | { __typename: 'Tag' } } | null }> } | null };

export type GetMenuByNameQueryVariables = Types.Exact<{
  name: Types.Scalars['ID']['input'];
}>;


export type GetMenuByNameQuery = { __typename?: 'RootQuery', menu?: { __typename?: 'Menu', id: string, name?: string | null, slug?: string | null, menuItems?: { __typename?: 'MenuToMenuItemConnection', nodes: Array<{ __typename?: 'MenuItem', id: string, label?: string | null, url?: string | null, path?: string | null, target?: string | null, cssClasses?: Array<string | null> | null, parentId?: string | null, order?: number | null }> } | null } | null };

export type GetAllMenusQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAllMenusQuery = { __typename?: 'RootQuery', menus?: { __typename?: 'RootQueryToMenuConnection', nodes: Array<{ __typename?: 'Menu', id: string, name?: string | null, slug?: string | null, locations?: Array<Types.MenuLocationEnum | null> | null, menuItems?: { __typename?: 'MenuToMenuItemConnection', nodes: Array<{ __typename?: 'MenuItem', id: string, label?: string | null, url?: string | null, path?: string | null }> } | null }> } | null };
