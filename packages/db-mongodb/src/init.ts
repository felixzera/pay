/* eslint-disable no-param-reassign */
import type { PaginateOptions } from 'mongoose';
import type { Init } from 'payload/database';
import type { SanitizedCollectionConfig } from 'payload/types';

import mongoose from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';
import paginate from 'mongoose-paginate-v2';
import { buildVersionGlobalFields } from 'payload/versions';
import { buildVersionCollectionFields } from 'payload/versions';
import { getVersionsModelName } from 'payload/versions';

import type { MongooseAdapter } from './index.js';
import type { CollectionModel } from './types.js';

import buildCollectionSchema from './models/buildCollectionSchema.js';
import { buildGlobalModel } from './models/buildGlobalModel.js';
import buildSchema from './models/buildSchema.js';
import getBuildQueryPlugin from './queries/buildQuery.js';

export const init: Init = async function init(
  this: MongooseAdapter,
) {
  this.payload.config.collections.forEach(
    (collection: SanitizedCollectionConfig) => {
      const schema = buildCollectionSchema(collection, this.payload.config);

      if (collection.versions) {
        const versionModelName = getVersionsModelName(collection);

        const versionCollectionFields = buildVersionCollectionFields(collection);

        const versionSchema = buildSchema(
          this.payload.config,
          versionCollectionFields,
          {
            disableUnique: true,
            draftsEnabled: true,
            options: {
              minimize: false,
              timestamps: false,
            },
          },
        );

        if (collection.indexes) {
          collection.indexes.forEach((index) => {
            // prefix 'version.' to each field in the index
            const versionIndex = {
              fields: {},
              options: index.options,
            };
            Object.entries(index.fields)
              .forEach(([key, value]) => {
                versionIndex.fields[`version.${key}`] = value;
              });
            versionSchema.index(versionIndex.fields, versionIndex.options);
          });
        }

        versionSchema.plugin<any, PaginateOptions>(paginate, { useEstimatedCount: true })
          .plugin(
            getBuildQueryPlugin({
              collectionSlug: collection.slug,
              versionsFields: versionCollectionFields,
            }),
          );

        if (collection.versions?.drafts) {
          versionSchema.plugin(mongooseAggregatePaginate);
        }

        const model = mongoose.model(
          versionModelName,
          versionSchema,
          versionModelName,
        ) as CollectionModel;
        // this.payload.versions[collection.slug] = model;
        this.versions[collection.slug] = model;
      }

      const model = mongoose.model(
        collection.slug,
        schema,
        this.autoPluralization === true ? undefined : collection.slug,
      ) as CollectionModel;
      this.collections[collection.slug] = model;

      // TS expect error only needed until we launch 2.0.0
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      this.payload.collections[collection.slug] = {
        config: collection,
      };
    },
  );

  const model = buildGlobalModel(this.payload.config);
  this.globals = model;

  this.payload.config.globals.forEach((global) => {
    if (global.versions) {
      const versionModelName = getVersionsModelName(global);

      const versionGlobalFields = buildVersionGlobalFields(global);

      const versionSchema = buildSchema(
        this.payload.config,
        versionGlobalFields,
        {
          disableUnique: true,
          draftsEnabled: true,
          indexSortableFields: this.payload.config.indexSortableFields,
          options: {
            minimize: false,
            timestamps: false,
          },
        },
      );

      versionSchema
        .plugin<any, PaginateOptions>(paginate, { useEstimatedCount: true })
        .plugin(getBuildQueryPlugin({ versionsFields: versionGlobalFields }));

      const versionsModel = mongoose.model(
        versionModelName,
        versionSchema,
        versionModelName,
      ) as CollectionModel;
      this.versions[global.slug] = versionsModel;
    }
  });
};
