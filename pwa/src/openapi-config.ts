import type { ConfigFile } from '@rtk-query/codegen-openapi'

const config: ConfigFile = {
  schemaFile: '../openapi.json',
  apiFile: './src/emptyApi.ts',
  apiImport: 'emptySplitApi',
  outputFile: './src/store/petApi.ts',
  exportName: 'backend',
  hooks: true,
}

export default config