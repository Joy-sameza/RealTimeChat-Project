export const userCollection = {
  collection: "users",
  meta: {
    collection: "users",
    icon: "person",
    note: "A collection of user information",
    display_template: "{{ userName }}",
    hidden: false,
    singleton: false,
    translations: [
      {
        language: "en-US",
        translation: "Users",
      },
      {
        language: "nl-NL",
        translation: "Gebruikers",
      },
    ],
    archive_field: "status",
    archive_value: "archived",
    unarchive_value: "draft",
    archive_app_filter: true,
    sort_field: "id",
    item_duplication_fields: ["userName", "email"],
    sort: 1,
  },
  schema: {
    name: "users",
    comment: "The users collection table",
  },
  fields: [
    {
      field: "id",
      type: "integer",
      schema: {
        is_primary_key: true,
        is_nullable: false,
        has_auto_increment: true,
      },
    },
    {
      field: "userName",
      type: "string",
      schema: {
        is_primary_key: false,
        is_nullable: false,
      },
    },
    {
      field: "email",
      type: "string",
      schema: {
        is_primary_key: false,
        is_nullable: false,
      },
    },
    {
      field: "password",
      type: "string",
      schema: {
        is_primary_key: false,
        is_nullable: false,
      },
    },
    {
      field: "role",
      type: "string",
      schema: {
        is_primary_key: false,
        is_nullable: false,
      },
    },
    {
      field: "profilePicture",
      type: "string",
      schema: {
        is_primary_key: false,
        is_nullable: true,
      },
    },
    {
      field: "verified",
      type: "boolean",
      schema: {
        is_primary_key: false,
        is_nullable: false,
      },
    },
    {
      field: "createdAt",
      type: "date",
      schema: {
        is_primary_key: false,
        is_nullable: false,
      },
    },
    {
      field: "updatedAt",
      type: "date",
      schema: {
        is_primary_key: false,
        is_nullable: false,
      },
    },
    {
      field: "lastLogin",
      type: "date",
      schema: {
        is_primary_key: false,
        is_nullable: true,
      },
    },
    {
      field: "status",
      type: "string",
      schema: {
        is_primary_key: false,
        is_nullable: false,
      },
    },
  ],
};

/**
 * Chat room model
 */
export const chatRoomsCollection = {
  collection: "chatRooms",
  meta: {
    collection: "chatRooms",
    icon: "article",
    note: "A collection for chat rooms",
    display_template: "{{ name }}",
    hidden: false,
    singleton: false,
    translations: [
      {
        language: "en-US",
        translation: "Chat Rooms",
      },
      {
        language: "nl-NL",
        translation: "Chatkamers",
      },
    ],
    archive_field: "name",
    archive_value: "archived",
    unarchive_value: "draft",
    archive_app_filter: true,
    sort_field: "id",
    item_duplication_fields: null,
    sort: 1,
  },
  schema: {
    name: "chatRooms",
    comment: "Table for storing chat room information",
  },
  fields: [
    {
      field: "id",
      type: "integer",
      schema: {
        is_primary_key: true,
        is_nullable: false,
        has_auto_increment: true,
      },
    },
    {
      field: "name",
      type: "string",
      schema: {
        is_primary_key: false,
        is_nullable: false,
      },
    },
    {
      field: "authorId",
      type: "integer",
      schema: {
        is_primary_key: false,
        is_nullable: false,
        foreign_key_column: "id",
        foreign_key_table: "users",
      },
    },
    {
      field: "description",
      type: "text",
      schema: {
        is_primary_key: false,
        is_nullable: true,
      },
    },
    {
      field: "createdAt",
      type: "date",
      schema: {
        is_primary_key: false,
        is_nullable: false,
      },
    },
    {
      field: "updatedAt",
      type: "date",
      schema: {
        is_primary_key: false,
        is_nullable: false,
      },
    },
    {
      field: "locked",
      type: "boolean",
      schema: {
        is_primary_key: false,
        is_nullable: false,
      },
    },
    {
      field: "open",
      type: "boolean",
      schema: {
        is_primary_key: false,
        is_nullable: false,
      },
    },
  ],
};

/**
 * messages collection
 */

export const messagesCollection = {
  collection: "messages",
  meta: {
    collection: "messages",
    icon: "message",
    note: "A collection for messages",
    display_template: "{{ content }}",
    hidden: false,
    singleton: false,
    translations: [
      {
        language: "en-US",
        translation: "Messages",
      },
      {
        language: "nl-NL",
        translation: "Berichten",
      },
    ],
    archive_field: "content",
    archive_value: "archived",
    unarchive_value: "draft",
    archive_app_filter: true,
    sort_field: "id",
    item_duplication_fields: null,
    sort: 1,
  },
  schema: {
    name: "messages",
    comment: "Table for storing messages",
  },
  fields: [
    {
      field: "id",
      type: "integer",
      schema: {
        is_primary_key: true,
        is_nullable: false,
        has_auto_increment: true,
      },
    },
    {
      field: "content",
      type: "string",
      schema: {
        is_primary_key: false,
        is_nullable: false,
      },
    },
    {
      field: "senderId",
      type: "integer",
      schema: {
        is_primary_key: false,
        is_nullable: false,
        foreign_key_column: "id",
        foreign_key_table: "users",
      },
    },
    {
      field: "chatRoomId",
      type: "integer",
      schema: {
        is_primary_key: false,
        is_nullable: false,
        foreign_key_column: "id",
        foreign_key_table: "chatRooms",
      },
    },
    {
      field: "createdAt",
      type: "date",
      schema: {
        is_primary_key: false,
        is_nullable: false,
      },
    },
    {
      field: "updatedAt",
      type: "date",
      schema: {
        is_primary_key: false,
        is_nullable: false,
      },
    },
    {
      field: "responseToMessageId",
      type: "integer",
      schema: {
        is_primary_key: false,
        is_nullable: true,
        foreign_key_column: "id",
        foreign_key_table: "messages",
      },
    },
  ],
};
