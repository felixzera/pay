/* eslint-disable no-param-reassign */
import { Field } from '@alessiogr/payloadtest/types';
import { TypeWithID } from '@alessiogr/payloadtest/types';
import { SanitizedConfig } from '@alessiogr/payloadtest/config';
import { traverseFields } from './traverseFields.js';
import { createRelationshipMap } from '../../utilities/createRelationshipMap.js';
import { mergeLocales } from './mergeLocales.js';
import { createBlocksMap } from '../../utilities/createBlocksMap.js';

type TransformArgs = {
  config: SanitizedConfig
  data: Record<string, unknown>
  fallbackLocale?: string | false
  fields: Field[]
  locale?: string
}

// This is the entry point to transform Drizzle output data
// into the shape Payload expects based on field schema
export const transform = <T extends TypeWithID>({
  config,
  data,
  fallbackLocale,
  fields,
  locale,
}: TransformArgs): T => {
  let relationships: Record<string, Record<string, unknown>[]> = {};

  if ('_relationships' in data) {
    relationships = createRelationshipMap(data._relationships);
    delete data._relationships;
  }

  const blocks = createBlocksMap(data);

  const dataWithLocales = mergeLocales({ data, locale, fallbackLocale });

  return traverseFields<T>({
    blocks,
    config,
    data,
    fields,
    locale,
    path: '',
    relationships,
    siblingData: dataWithLocales,
    table: dataWithLocales,
  });
};
