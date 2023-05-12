import type { CollectionConfig } from "../../../src/collections/config/types";
export const Posts: CollectionConfig = {
  slug: "posts",
  labels: {
    singular: {
      en: "Post",
      ar: "منشور",
    },
    plural: {
      en: "Posts",
      ar: "منشورات",
    },
  },
  admin: {
    description: { en: "Description", ar: "وصف" },
    listSearchableFields: ["title", "description"],
    useAsTitle: "title",
    defaultColumns: ["id", "title", "description"],
  },
  fields: [
    {
      name: "title",
      label: {
        en: "Title",
        ar: "عنوان",
      },
      type: "text",
    },
    {
      name: "description",
      type: "text",
      localized: true,
    },
    {
      name: "content",
      type: "richText",
      localized: true,
    },
  ],
};
