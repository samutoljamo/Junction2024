import { emptySplitApi as api } from "../emptyApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    listPicturesApiPicturesGet: build.query<
      ListPicturesApiPicturesGetApiResponse,
      ListPicturesApiPicturesGetApiArg
    >({
      query: () => ({ url: `/api/pictures` }),
    }),
    getItemPicturesApiItemsItemIdPicturesGet: build.query<
      GetItemPicturesApiItemsItemIdPicturesGetApiResponse,
      GetItemPicturesApiItemsItemIdPicturesGetApiArg
    >({
      query: (queryArg) => ({ url: `/api/items/${queryArg.itemId}/pictures` }),
    }),
    createItemCreateItemPost: build.mutation<
      CreateItemCreateItemPostApiResponse,
      CreateItemCreateItemPostApiArg
    >({
      query: (queryArg) => ({
        url: `/create_item`,
        method: "POST",
        body: queryArg.itemBase,
      }),
    }),
    createItemItemsPost: build.mutation<
      CreateItemItemsPostApiResponse,
      CreateItemItemsPostApiArg
    >({
      query: (queryArg) => ({
        url: `/items/`,
        method: "POST",
        body: queryArg.itemBase,
      }),
    }),
    createNewItemCreateNewItemGet: build.query<
      CreateNewItemCreateNewItemGetApiResponse,
      CreateNewItemCreateNewItemGetApiArg
    >({
      query: () => ({ url: `/create_new_item` }),
    }),
    uploadImageUploadtestPost: build.mutation<
      UploadImageUploadtestPostApiResponse,
      UploadImageUploadtestPostApiArg
    >({
      query: () => ({ url: `/uploadtest/`, method: "POST" }),
    }),
    uploadImageUploadPost: build.mutation<
      UploadImageUploadPostApiResponse,
      UploadImageUploadPostApiArg
    >({
      query: (queryArg) => ({
        url: `/upload/`,
        method: "POST",
        body: queryArg.imageUpload,
      }),
    }),
    getItemIdsItemIdsGet: build.query<
      GetItemIdsItemIdsGetApiResponse,
      GetItemIdsItemIdsGetApiArg
    >({
      query: () => ({ url: `/item_ids` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as backend };
export type ListPicturesApiPicturesGetApiResponse =
  /** status 200 Successful Response */ Picture[];
export type ListPicturesApiPicturesGetApiArg = void;
export type GetItemPicturesApiItemsItemIdPicturesGetApiResponse =
  /** status 200 Successful Response */ Picture[];
export type GetItemPicturesApiItemsItemIdPicturesGetApiArg = {
  itemId: number;
};
export type CreateItemCreateItemPostApiResponse =
  /** status 200 Successful Response */ any;
export type CreateItemCreateItemPostApiArg = {
  itemBase: ItemBase;
};
export type CreateItemItemsPostApiResponse =
  /** status 200 Successful Response */ Item;
export type CreateItemItemsPostApiArg = {
  itemBase: ItemBase;
};
export type CreateNewItemCreateNewItemGetApiResponse =
  /** status 200 Successful Response */ any;
export type CreateNewItemCreateNewItemGetApiArg = void;
export type UploadImageUploadtestPostApiResponse =
  /** status 200 Successful Response */ any;
export type UploadImageUploadtestPostApiArg = void;
export type UploadImageUploadPostApiResponse =
  /** status 200 Successful Response */ any;
export type UploadImageUploadPostApiArg = {
  imageUpload: ImageUpload;
};
export type GetItemIdsItemIdsGetApiResponse =
  /** status 200 Successful Response */ any;
export type GetItemIdsItemIdsGetApiArg = void;
export type Picture = {
  url: string;
  id: number;
  item_id: number;
  created_at: string;
};
export type ValidationError = {
  loc: (string | number)[];
  msg: string;
  type: string;
};
export type HttpValidationError = {
  detail?: ValidationError[];
};
export type ItemBase = {
  name: string;
  description?: string | null;
};
export type Item = {
  name: string;
  description?: string | null;
  id: number;
  pictures?: Picture[];
};
export type ImageUpload = {
  image: string;
};
export const {
  useListPicturesApiPicturesGetQuery,
  useGetItemPicturesApiItemsItemIdPicturesGetQuery,
  useCreateItemCreateItemPostMutation,
  useCreateItemItemsPostMutation,
  useCreateNewItemCreateNewItemGetQuery,
  useUploadImageUploadtestPostMutation,
  useUploadImageUploadPostMutation,
  useGetItemIdsItemIdsGetQuery,
} = injectedRtkApi;
