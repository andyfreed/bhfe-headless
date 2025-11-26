import { default as PageTemplate } from './page';
import { default as SingleTemplate } from './single';
import { default as ArchiveTemplate } from './archive';
import { default as CourseTemplate } from './single-flms-course';
import { default as FrontPageTemplate } from './front-page';

/**
 * Faust.js Template Hierarchy
 * Maps WordPress template types to React components
 * 
 * @see https://faustjs.org/docs/templates
 */
const templates = {
  'front-page': FrontPageTemplate,
  'page': PageTemplate,
  'single': SingleTemplate,
  'single-flms-courses': CourseTemplate,
  'archive': ArchiveTemplate,
};

export default templates;

