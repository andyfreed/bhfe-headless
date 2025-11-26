import * as Types from '../../generated/graphql';

export type ContentNodeFields_FlmsCertificate_Fragment = { __typename?: 'FlmsCertificate', id: string, databaseId: number, uri?: string | null, slug?: string | null, status?: string | null, date?: string | null, modified?: string | null, contentTypeName: string };

export type ContentNodeFields_FlmsCourse_Fragment = { __typename?: 'FlmsCourse', id: string, databaseId: number, uri?: string | null, slug?: string | null, status?: string | null, date?: string | null, modified?: string | null, contentTypeName: string };

export type ContentNodeFields_FlmsExam_Fragment = { __typename?: 'FlmsExam', id: string, databaseId: number, uri?: string | null, slug?: string | null, status?: string | null, date?: string | null, modified?: string | null, contentTypeName: string };

export type ContentNodeFields_FlmsGroup_Fragment = { __typename?: 'FlmsGroup', id: string, databaseId: number, uri?: string | null, slug?: string | null, status?: string | null, date?: string | null, modified?: string | null, contentTypeName: string };

export type ContentNodeFields_FlmsLesson_Fragment = { __typename?: 'FlmsLesson', id: string, databaseId: number, uri?: string | null, slug?: string | null, status?: string | null, date?: string | null, modified?: string | null, contentTypeName: string };

export type ContentNodeFields_FlmsQuestion_Fragment = { __typename?: 'FlmsQuestion', id: string, databaseId: number, uri?: string | null, slug?: string | null, status?: string | null, date?: string | null, modified?: string | null, contentTypeName: string };

export type ContentNodeFields_FlmsTopic_Fragment = { __typename?: 'FlmsTopic', id: string, databaseId: number, uri?: string | null, slug?: string | null, status?: string | null, date?: string | null, modified?: string | null, contentTypeName: string };

export type ContentNodeFields_MediaItem_Fragment = { __typename?: 'MediaItem', id: string, databaseId: number, uri?: string | null, slug?: string | null, status?: string | null, date?: string | null, modified?: string | null, contentTypeName: string };

export type ContentNodeFields_Order_Fragment = { __typename?: 'Order', id: string, databaseId: number, uri?: string | null, slug?: string | null, status?: string | null, date?: string | null, modified?: string | null, contentTypeName: string };

export type ContentNodeFields_Page_Fragment = { __typename?: 'Page', id: string, databaseId: number, uri?: string | null, slug?: string | null, status?: string | null, date?: string | null, modified?: string | null, contentTypeName: string };

export type ContentNodeFields_Post_Fragment = { __typename?: 'Post', id: string, databaseId: number, uri?: string | null, slug?: string | null, status?: string | null, date?: string | null, modified?: string | null, contentTypeName: string };

export type ContentNodeFields_Product_Fragment = { __typename?: 'Product', id: string, databaseId: number, uri?: string | null, slug?: string | null, status?: string | null, date?: string | null, modified?: string | null, contentTypeName: string };

export type ContentNodeFieldsFragment = ContentNodeFields_FlmsCertificate_Fragment | ContentNodeFields_FlmsCourse_Fragment | ContentNodeFields_FlmsExam_Fragment | ContentNodeFields_FlmsGroup_Fragment | ContentNodeFields_FlmsLesson_Fragment | ContentNodeFields_FlmsQuestion_Fragment | ContentNodeFields_FlmsTopic_Fragment | ContentNodeFields_MediaItem_Fragment | ContentNodeFields_Order_Fragment | ContentNodeFields_Page_Fragment | ContentNodeFields_Post_Fragment | ContentNodeFields_Product_Fragment;

export type ContentNodeWithContent_FlmsCertificate_Fragment = { __typename?: 'FlmsCertificate', title?: string | null, content?: string | null, id: string, databaseId: number, uri?: string | null, slug?: string | null, status?: string | null, date?: string | null, modified?: string | null, contentTypeName: string };

export type ContentNodeWithContent_FlmsCourse_Fragment = { __typename?: 'FlmsCourse', title?: string | null, excerpt?: string | null, id: string, databaseId: number, uri?: string | null, slug?: string | null, status?: string | null, date?: string | null, modified?: string | null, contentTypeName: string, author?: { __typename?: 'NodeWithAuthorToUserConnectionEdge', node: { __typename?: 'User', id: string, databaseId: number, name?: string | null, firstName?: string | null, lastName?: string | null, description?: string | null, avatar?: { __typename?: 'Avatar', url?: string | null } | null } } | null };

export type ContentNodeWithContent_FlmsExam_Fragment = { __typename?: 'FlmsExam', title?: string | null, content?: string | null, id: string, databaseId: number, uri?: string | null, slug?: string | null, status?: string | null, date?: string | null, modified?: string | null, contentTypeName: string };

export type ContentNodeWithContent_FlmsGroup_Fragment = { __typename?: 'FlmsGroup', title?: string | null, id: string, databaseId: number, uri?: string | null, slug?: string | null, status?: string | null, date?: string | null, modified?: string | null, contentTypeName: string };

export type ContentNodeWithContent_FlmsLesson_Fragment = { __typename?: 'FlmsLesson', title?: string | null, content?: string | null, id: string, databaseId: number, uri?: string | null, slug?: string | null, status?: string | null, date?: string | null, modified?: string | null, contentTypeName: string };

export type ContentNodeWithContent_FlmsQuestion_Fragment = { __typename?: 'FlmsQuestion', title?: string | null, content?: string | null, id: string, databaseId: number, uri?: string | null, slug?: string | null, status?: string | null, date?: string | null, modified?: string | null, contentTypeName: string };

export type ContentNodeWithContent_FlmsTopic_Fragment = { __typename?: 'FlmsTopic', title?: string | null, content?: string | null, id: string, databaseId: number, uri?: string | null, slug?: string | null, status?: string | null, date?: string | null, modified?: string | null, contentTypeName: string };

export type ContentNodeWithContent_MediaItem_Fragment = { __typename?: 'MediaItem', title?: string | null, id: string, databaseId: number, uri?: string | null, slug?: string | null, status?: string | null, date?: string | null, modified?: string | null, contentTypeName: string, author?: { __typename?: 'NodeWithAuthorToUserConnectionEdge', node: { __typename?: 'User', id: string, databaseId: number, name?: string | null, firstName?: string | null, lastName?: string | null, description?: string | null, avatar?: { __typename?: 'Avatar', url?: string | null } | null } } | null };

export type ContentNodeWithContent_Order_Fragment = { __typename?: 'Order', title?: string | null, id: string, databaseId: number, uri?: string | null, slug?: string | null, status?: string | null, date?: string | null, modified?: string | null, contentTypeName: string };

export type ContentNodeWithContent_Page_Fragment = { __typename?: 'Page', title?: string | null, content?: string | null, id: string, databaseId: number, uri?: string | null, slug?: string | null, status?: string | null, date?: string | null, modified?: string | null, contentTypeName: string, author?: { __typename?: 'NodeWithAuthorToUserConnectionEdge', node: { __typename?: 'User', id: string, databaseId: number, name?: string | null, firstName?: string | null, lastName?: string | null, description?: string | null, avatar?: { __typename?: 'Avatar', url?: string | null } | null } } | null };

export type ContentNodeWithContent_Post_Fragment = { __typename?: 'Post', title?: string | null, content?: string | null, excerpt?: string | null, id: string, databaseId: number, uri?: string | null, slug?: string | null, status?: string | null, date?: string | null, modified?: string | null, contentTypeName: string, author?: { __typename?: 'NodeWithAuthorToUserConnectionEdge', node: { __typename?: 'User', id: string, databaseId: number, name?: string | null, firstName?: string | null, lastName?: string | null, description?: string | null, avatar?: { __typename?: 'Avatar', url?: string | null } | null } } | null };

export type ContentNodeWithContent_Product_Fragment = { __typename?: 'Product', title?: string | null, content?: string | null, excerpt?: string | null, id: string, databaseId: number, uri?: string | null, slug?: string | null, status?: string | null, date?: string | null, modified?: string | null, contentTypeName: string };

export type ContentNodeWithContentFragment = ContentNodeWithContent_FlmsCertificate_Fragment | ContentNodeWithContent_FlmsCourse_Fragment | ContentNodeWithContent_FlmsExam_Fragment | ContentNodeWithContent_FlmsGroup_Fragment | ContentNodeWithContent_FlmsLesson_Fragment | ContentNodeWithContent_FlmsQuestion_Fragment | ContentNodeWithContent_FlmsTopic_Fragment | ContentNodeWithContent_MediaItem_Fragment | ContentNodeWithContent_Order_Fragment | ContentNodeWithContent_Page_Fragment | ContentNodeWithContent_Post_Fragment | ContentNodeWithContent_Product_Fragment;

export type AuthorFieldsFragment = { __typename?: 'User', id: string, databaseId: number, name?: string | null, firstName?: string | null, lastName?: string | null, description?: string | null, avatar?: { __typename?: 'Avatar', url?: string | null } | null };
