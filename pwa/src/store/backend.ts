import { emptySplitApi as api } from "../emptyApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getItemItemGet: build.query<
      GetItemItemGetApiResponse,
      GetItemItemGetApiArg
    >({
      query: () => ({ url: `/item` }),
    }),
    createItemCreateItemPost: build.mutation<
      CreateItemCreateItemPostApiResponse,
      CreateItemCreateItemPostApiArg
    >({
      query: (queryArg) => ({
        url: `/create_item`,
        method: "POST",
        body: queryArg.itemBaseInput,
      }),
    }),
    createItemItemsPost: build.mutation<
      CreateItemItemsPostApiResponse,
      CreateItemItemsPostApiArg
    >({
      query: (queryArg) => ({
        url: `/items/`,
        method: "POST",
        body: queryArg.itemBaseInput,
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
export type GetItemItemGetApiResponse =
  /** status 200 Successful Response */ ItemBase;
export type GetItemItemGetApiArg = void;
export type CreateItemCreateItemPostApiResponse =
  /** status 200 Successful Response */ any;
export type CreateItemCreateItemPostApiArg = {
  itemBaseInput: ItemBase2;
};
export type CreateItemItemsPostApiResponse =
  /** status 200 Successful Response */ ItemBase;
export type CreateItemItemsPostApiArg = {
  itemBaseInput: ItemBase2;
};
export type CreateNewItemCreateNewItemGetApiResponse =
  /** status 200 Successful Response */ any;
export type CreateNewItemCreateNewItemGetApiArg = void;
export type UploadImageUploadtestPostApiResponse =
  /** status 200 Successful Response */ ItemStructure;
export type UploadImageUploadtestPostApiArg = void;
export type UploadImageUploadPostApiResponse =
  /** status 200 Successful Response */ ItemStructure;
export type UploadImageUploadPostApiArg = {
  imageUpload: ImageUpload;
};
export type GetItemIdsItemIdsGetApiResponse =
  /** status 200 Successful Response */ any;
export type GetItemIdsItemIdsGetApiArg = void;
export type PictureBase = {
  id: number;
  url: string;
};
export type VisitBase = {
  id: number;
  timestamp: number;
  condition: string;
  notes: string;
  pictures?: PictureBase[];
};
export type ItemBase = {
  id: number;
  name: string;
  x: number;
  y: number;
  floor: number;
  serial_number: string | null;
  material: string | null;
  model: string | null;
  manufacturer: string | null;
  description: string | null;
  manufacturing_year: number | null;
  visits?: VisitBase[];
};
export type ValidationError = {
  loc: (string | number)[];
  msg: string;
  type: string;
};
export type HttpValidationError = {
  detail?: ValidationError[];
};
export type ItemBase2 = {
  id: number;
  name: string;
  x: number;
  y: number;
  floor: number;
  serial_number: string | null;
  material: string | null;
  model: string | null;
  manufacturer: string | null;
  description: string | null;
  manufacturing_year: number | null;
  visits?: VisitBase[];
};
export type ItemTypeCategory =
  | "structure"
  | "ventilation"
  | "electrical"
  | "plumbing"
  | "other";
export type ItemStructure = {
  /** The name of the equipment */
  equipment_name?: string | null;
  /** Type of the item */
  equipment_type?: ItemTypeCategory;
  /** The manufacturer of the item */
  manufacturer?: string | null;
  /** The manufacturing year of the item */
  manufacturing_year?: number | null;
  /** The model of the item */
  model?: string | null;
  /** The serial number of the device if found */
  serial_number?: string | null;
  /** The material of the item */
  material?: string | null;
  /** The surface condition of the item */
  surface_condition?: string | null;
};
export type ImageUpload = {
  images: string[];
};
export const {
  useGetItemItemGetQuery,
  useCreateItemCreateItemPostMutation,
  useCreateItemItemsPostMutation,
  useCreateNewItemCreateNewItemGetQuery,
  useUploadImageUploadtestPostMutation,
  useUploadImageUploadPostMutation,
  useGetItemIdsItemIdsGetQuery,
} = injectedRtkApi;
