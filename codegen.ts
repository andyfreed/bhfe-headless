import type { CodegenConfig } from '@graphql-codegen/cli';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'http://beacon-hill-staging.local';
const GRAPHQL_ENDPOINT = `${WORDPRESS_URL}/graphql`;

const config: CodegenConfig = {
  // Schema source - your WPGraphQL endpoint
  schema: GRAPHQL_ENDPOINT,
  
  // Document sources - where to find .graphql files
  // Exclude wp-templates which have inline queries that may conflict
  documents: ['src/graphql/**/*.graphql'],
  
  // Ignore patterns
  ignoreNoDocuments: true,
  
  generates: {
    // Generate all types in a single file
    'src/generated/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
      ],
      config: {
        // Use TypeScript strict mode
        strictScalars: false,
        
        // Generate enum as const objects for better tree-shaking
        enumsAsConst: true,
        
        // Make optional fields nullable
        avoidOptionals: false,
        
        // Don't add __typename to types
        skipTypename: false,
        
        // Use Pick for fragments
        preResolveTypes: true,
        
        // Name operations based on the operation name
        dedupeOperationSuffix: true,
        
        // Scalars mapping
        scalars: {
          ID: 'string',
          DateTime: 'string',
          Date: 'string',
          JSON: 'Record<string, unknown>',
        },
        
        // Add comments from schema
        addUnderscoreToArgsType: true,
      },
    },
    
    // Generate operation types near the .graphql files
    'src/': {
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.generated.ts',
        baseTypesPath: 'generated/graphql.ts',
      },
      plugins: ['typescript-operations'],
      config: {
        skipTypename: false,
        preResolveTypes: true,
      },
    },
  },
  
  // Hooks disabled for Windows compatibility
  // Run `npx prettier --write src/generated` manually if needed
};

export default config;

