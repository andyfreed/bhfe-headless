/**
 * Template Resolver
 * 
 * Maps WordPress content types and template names to React components.
 * Used by the catch-all route to render appropriate templates.
 */

import { ComponentType } from 'react';

// Base templates
import { DefaultTemplate } from './DefaultTemplate';
import { PageTemplate } from './PageTemplate';
import { PostTemplate } from './PostTemplate';
import { CourseTemplate } from './CourseTemplate';
import { CategoryTemplate } from './CategoryTemplate';

// ACF-driven templates
import { LandingTemplate } from './LandingTemplate';
import { ContactTemplate } from './ContactTemplate';

/**
 * Template props interface - data passed to all templates
 */
export interface TemplateProps<T = unknown> {
  data: T;
}

/**
 * Template registry type
 */
type TemplateRegistry = {
  [contentType: string]: {
    default: ComponentType<TemplateProps<any>>;
    templates?: {
      [templateName: string]: ComponentType<TemplateProps<any>>;
    };
  };
};

/**
 * Template registry
 * 
 * Maps content types to their default and named templates
 */
const templateRegistry: TemplateRegistry = {
  // WordPress Pages
  Page: {
    default: PageTemplate,
    templates: {
      'template-landing': LandingTemplate,
      'template-contact': ContactTemplate,
      'Landing Page': LandingTemplate,
      'Contact Page': ContactTemplate,
    },
  },

  // WordPress Posts
  Post: {
    default: PostTemplate,
  },

  // FLMS Courses
  FlmsCourse: {
    default: CourseTemplate,
  },

  // Categories
  Category: {
    default: CategoryTemplate,
  },

  // Tags
  Tag: {
    default: CategoryTemplate, // Reuse category template for tags
  },
};

/**
 * Get template name from node data
 * 
 * Extracts the template name from various possible locations in the data
 */
function getTemplateName(node: any): string | null {
  // Check for template field (common in WPGraphQL)
  if (node.template) {
    // Template might be an object with templateName
    if (typeof node.template === 'object' && node.template.templateName) {
      return node.template.templateName;
    }
    // Or just a string
    if (typeof node.template === 'string') {
      return node.template;
    }
  }

  // Check for page template meta
  if (node.pageTemplate) {
    return node.pageTemplate;
  }

  // Check in ACF fields for template selection
  if (node.acfPageFields?.templateType) {
    return node.acfPageFields.templateType;
  }

  return null;
}

/**
 * Resolve template for given content type and data
 * 
 * @param typename - The GraphQL typename (Page, Post, FlmsCourse, etc.)
 * @param node - The content node data
 * @returns The appropriate template component
 */
export function resolveTemplate(
  typename: string | null,
  node: any
): ComponentType<TemplateProps<any>> {
  // Default to generic template if no typename
  if (!typename) {
    return DefaultTemplate;
  }

  // Get registry entry for this content type
  const registryEntry = templateRegistry[typename];

  if (!registryEntry) {
    // Unknown content type, use default
    console.warn(`No template registered for content type: ${typename}`);
    return DefaultTemplate;
  }

  // Check for named template
  const templateName = getTemplateName(node);

  if (templateName && registryEntry.templates) {
    const namedTemplate = registryEntry.templates[templateName];
    if (namedTemplate) {
      return namedTemplate;
    }
  }

  // Return default template for this content type
  return registryEntry.default;
}

/**
 * Register a new template
 * 
 * @param contentType - The content type (Page, Post, etc.)
 * @param template - The template component
 * @param templateName - Optional template name for named templates
 */
export function registerTemplate(
  contentType: string,
  template: ComponentType<TemplateProps<any>>,
  templateName?: string
): void {
  if (!templateRegistry[contentType]) {
    templateRegistry[contentType] = {
      default: template,
      templates: {},
    };
  }

  if (templateName) {
    if (!templateRegistry[contentType].templates) {
      templateRegistry[contentType].templates = {};
    }
    templateRegistry[contentType].templates![templateName] = template;
  } else {
    templateRegistry[contentType].default = template;
  }
}

// Export templates for direct use
export {
  DefaultTemplate,
  PageTemplate,
  PostTemplate,
  CourseTemplate,
  CategoryTemplate,
  LandingTemplate,
  ContactTemplate,
};

