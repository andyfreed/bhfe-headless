import * as Types from '../../generated/graphql';

export type CourseFieldsFragment = { __typename?: 'FlmsCourse', id: string, databaseId: number, title?: string | null, uri?: string | null, slug?: string | null, date?: string | null, modified?: string | null, courseNumber?: string | null, courseDescription?: string | null, coursePreview?: string | null, wooProductId?: number | null };

export type CourseCreditFieldsFragment = { __typename?: 'FlmsCourse', courseCredits?: Array<{ __typename?: 'FlmsCourseCredit', type?: string | null, name?: string | null, credits?: string | null } | null> | null };

export type CourseMaterialFieldsFragment = { __typename?: 'FlmsCourse', courseMaterials?: Array<{ __typename?: 'FlmsCourseMaterial', title?: string | null, file?: string | null } | null> | null };

export type CourseAcfFieldsFragment = { __typename?: 'FlmsCourse', masterCourseListFields?: { __typename?: 'MasterCourseListFields', fieldGroupName?: string | null, iarApprovalDate?: string | null, notes?: string | null } | null };

export type CourseFullFieldsFragment = { __typename?: 'FlmsCourse', id: string, databaseId: number, title?: string | null, uri?: string | null, slug?: string | null, date?: string | null, modified?: string | null, courseNumber?: string | null, courseDescription?: string | null, coursePreview?: string | null, wooProductId?: number | null, courseCredits?: Array<{ __typename?: 'FlmsCourseCredit', type?: string | null, name?: string | null, credits?: string | null } | null> | null, courseMaterials?: Array<{ __typename?: 'FlmsCourseMaterial', title?: string | null, file?: string | null } | null> | null, masterCourseListFields?: { __typename?: 'MasterCourseListFields', fieldGroupName?: string | null, iarApprovalDate?: string | null, notes?: string | null } | null };

export type CourseCardFieldsFragment = { __typename?: 'FlmsCourse', id: string, databaseId: number, title?: string | null, uri?: string | null, courseNumber?: string | null, courseCredits?: Array<{ __typename?: 'FlmsCourseCredit', name?: string | null, credits?: string | null } | null> | null };
