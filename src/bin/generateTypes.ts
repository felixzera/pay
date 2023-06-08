/* eslint-disable no-nested-ternary */
import fs from 'fs';
import type { JSONSchema4 } from 'json-schema';
import { compile } from 'json-schema-to-typescript';
import Logger from '../utilities/logger';
import { SanitizedConfig } from '../config/types';
import loadConfig from '../config/load';
import { entityToJSONSchema, generateEntitySchemas } from '../utilities/entityToJSONSchema';

type DefinitionsType = { [k: string]: JSONSchema4 };

function configToJsonSchema(config: SanitizedConfig): JSONSchema4 {
  const fieldDefinitionsMap: Map<string, JSONSchema4> = new Map(); // mutable
  const entityDefinitions: DefinitionsType = [...config.globals, ...config.collections].reduce((acc, entity) => {
    acc[entity.slug] = entityToJSONSchema(config, entity, fieldDefinitionsMap);
    return acc;
  }, {});

  return {
    title: 'Config',
    type: 'object',
    additionalProperties: false,
    properties: {
      collections: generateEntitySchemas(config.collections),
      globals: generateEntitySchemas(config.globals),
    },
    required: ['collections', 'globals'],
    definitions: { ...entityDefinitions, ...Object.fromEntries(fieldDefinitionsMap) },
  };
}

export async function generateTypes(): Promise<void> {
  const logger = Logger();
  const config = await loadConfig();
  const outputFile = process.env.PAYLOAD_TS_OUTPUT_PATH || config.typescript.outputFile;

  logger.info('Compiling TS types for Collections and Globals...');

  const jsonSchema = configToJsonSchema(config);

  compile(jsonSchema, 'Config', {
    bannerComment: '/* tslint:disable */\n/**\n* This file was automatically generated by Payload.\n* DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,\n* and re-run `payload generate:types` to regenerate this file.\n*/',
    style: {
      singleQuote: true,
    },
  }).then((compiled) => {
    fs.writeFileSync(outputFile, compiled);
    logger.info(`Types written to ${outputFile}`);
  });
}

// when generateTypes.js is launched directly
if (module.id === require.main.id) {
  generateTypes();
}
