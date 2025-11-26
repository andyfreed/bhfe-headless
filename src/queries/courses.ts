import { gql } from '@apollo/client';

/**
 * GraphQL Queries for FLMS Courses
 */

export const GET_ALL_COURSES = gql`
  query GetAllCourses($first: Int = 50, $after: String) {
    flmsCourses(first: $first, after: $after) {
      nodes {
        id
        databaseId
        title
        uri
        courseNumber
        courseDescription
        coursePreview
        courseCredits {
          type
          name
          credits
        }
        courseMaterials {
          title
          file
        }
        wooProductId
        masterCourseListFields {
          iarApprovalDate
          notes
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const GET_COURSE_BY_ID = gql`
  query GetCourseById($id: ID!) {
    flmsCourse(id: $id, idType: DATABASE_ID) {
      id
      databaseId
      title
      uri
      courseNumber
      courseDescription
      coursePreview
      courseCredits {
        type
        name
        credits
      }
      courseMaterials {
        title
        file
      }
      wooProductId
      masterCourseListFields {
        iarApprovalDate
        notes
      }
    }
  }
`;

export const GET_COURSE_BY_URI = gql`
  query GetCourseByUri($uri: String!) {
    flmsCourse(id: $uri, idType: URI) {
      id
      databaseId
      title
      uri
      courseNumber
      courseDescription
      coursePreview
      courseCredits {
        type
        name
        credits
      }
      courseMaterials {
        title
        file
      }
      wooProductId
      masterCourseListFields {
        iarApprovalDate
        notes
      }
    }
  }
`;

export const GET_COURSE_SLUGS = gql`
  query GetCourseSlugs($first: Int = 100) {
    flmsCourses(first: $first) {
      nodes {
        uri
        databaseId
      }
    }
  }
`;

