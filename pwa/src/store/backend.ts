import { emptySplitApi as api } from "../emptyApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    showGalleryGalleryGet: build.query<
      ShowGalleryGalleryGetApiResponse,
      ShowGalleryGalleryGetApiArg
    >({
      query: () => ({ url: `/gallery` }),
    }),
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
    getItemItemsItemIdGet: build.query<
      GetItemItemsItemIdGetApiResponse,
      GetItemItemsItemIdGetApiArg
    >({
      query: (queryArg) => ({ url: `/items/${queryArg.itemId}` }),
    }),
    testUploadTestUploadPost: build.mutation<
      TestUploadTestUploadPostApiResponse,
      TestUploadTestUploadPostApiArg
    >({
      query: () => ({ url: `/test/upload/`, method: "POST" }),
    }),
    testUploadTestUploadItemIdGet: build.query<
      TestUploadTestUploadItemIdGetApiResponse,
      TestUploadTestUploadItemIdGetApiArg
    >({
      query: (queryArg) => ({ url: `/test/upload/${queryArg.itemId}` }),
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
export type ShowGalleryGalleryGetApiResponse = unknown;
export type ShowGalleryGalleryGetApiArg = void;
export type ListPicturesApiPicturesGetApiResponse =
  /** status 200 Successful Response */ Picture[];
export type ListPicturesApiPicturesGetApiArg = void;
export type GetItemPicturesApiItemsItemIdPicturesGetApiResponse =
  /** status 200 Successful Response */ Picture[];
export type GetItemPicturesApiItemsItemIdPicturesGetApiArg = {
  itemId: number;
};
export type CreateItemItemsPostApiResponse =
  /** status 200 Successful Response */ Item;
export type CreateItemItemsPostApiArg = {
  itemBase: ItemBase;
};
export type UploadImageUploadPostApiResponse =
  /** status 200 Successful Response */ any;
export type UploadImageUploadPostApiArg = {
  imageUpload: ImageUpload;
};
export type GetItemItemsItemIdGetApiResponse =
  /** status 200 Successful Response */ Item;
export type GetItemItemsItemIdGetApiArg = {
  itemId: number;
};
export type TestUploadTestUploadPostApiResponse =
  /** status 200 Successful Response */ any;
export type TestUploadTestUploadPostApiArg = void;
export type TestUploadTestUploadItemIdGetApiResponse =
  /** status 200 Successful Response */ any;
export type TestUploadTestUploadItemIdGetApiArg = {
  itemId: number;
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
export type Item = {
  name: string;
  description?: string | null;
  id: number;
  created_at: string;
  pictures?: Picture[];
};
export type ItemBase = {
  name: string;
  description?: string | null;
};
export type ImageUpload = {
  image: string;
  visit_id: number;
};
export const {
  useShowGalleryGalleryGetQuery,
  useListPicturesApiPicturesGetQuery,
  useGetItemPicturesApiItemsItemIdPicturesGetQuery,
  useCreateItemItemsPostMutation,
  useUploadImageUploadPostMutation,
  useGetItemItemsItemIdGetQuery,
  useTestUploadTestUploadPostMutation,
  useTestUploadTestUploadItemIdGetQuery,
  useGetItemIdsItemIdsGetQuery,
} = injectedRtkApi;
