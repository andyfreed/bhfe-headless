import * as Types from '../../generated/graphql';

export type GetSiteSettingsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetSiteSettingsQuery = { __typename?: 'RootQuery', generalSettings?: { __typename?: 'GeneralSettings', title?: string | null, description?: string | null, url?: string | null, language?: string | null, timezone?: string | null, dateFormat?: string | null, timeFormat?: string | null } | null };

export type GetReadingSettingsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetReadingSettingsQuery = { __typename?: 'RootQuery', readingSettings?: { __typename?: 'ReadingSettings', pageForPosts?: number | null, pageOnFront?: number | null, postsPerPage?: number | null, showOnFront?: string | null } | null, allSettings?: { __typename?: 'Settings', readingSettingsPageForPosts?: number | null, readingSettingsPageOnFront?: number | null } | null };

export type GetSiteDataQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetSiteDataQuery = { __typename?: 'RootQuery', generalSettings?: { __typename?: 'GeneralSettings', title?: string | null, description?: string | null, url?: string | null } | null, primaryMenu?: { __typename?: 'RootQueryToMenuItemConnection', nodes: Array<{ __typename?: 'MenuItem', id: string, label?: string | null, url?: string | null, path?: string | null, parentId?: string | null }> } | null, footerMenu?: { __typename?: 'RootQueryToMenuItemConnection', nodes: Array<{ __typename?: 'MenuItem', id: string, label?: string | null, url?: string | null, path?: string | null }> } | null };
