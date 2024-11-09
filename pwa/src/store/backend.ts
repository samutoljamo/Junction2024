import { emptySplitApi as api } from "../emptyApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getItemItemGet: build.query<
      GetItemItemGetApiResponse,
      GetItemItemGetApiArg
    >({
      query: () => ({ url: `/item` }),
    }),
    getAllItemsGetAllItemsForGivenFloorPost: build.mutation<
      GetAllItemsGetAllItemsForGivenFloorPostApiResponse,
      GetAllItemsGetAllItemsForGivenFloorPostApiArg
    >({
      query: (queryArg) => ({
        url: `/get_all_items_for_given_floor`,
        method: "POST",
        params: {
          floor_number: queryArg.floorNumber,
        },
      }),
    }),
    createNewItemCreateNewItemGet: build.query<
      CreateNewItemCreateNewItemGetApiResponse,
      CreateNewItemCreateNewItemGetApiArg
    >({
      query: (queryArg) => ({
        url: `/create_new_item`,
        body: queryArg.itemBaseInput,
      }),
    }),
    modifyItemModifyItemGet: build.query<
      ModifyItemModifyItemGetApiResponse,
      ModifyItemModifyItemGetApiArg
    >({
      query: (queryArg) => ({
        url: `/modify_item`,
        body: queryArg.itemBaseInput,
        params: {
          item_id: queryArg.itemId,
        },
      }),
    }),
    deleteItemDeleteItemGet: build.query<
      DeleteItemDeleteItemGetApiResponse,
      DeleteItemDeleteItemGetApiArg
    >({
      query: (queryArg) => ({
        url: `/delete_item`,
        params: {
          item_id: queryArg.itemId,
        },
      }),
    }),
    addVisitToItemAddVisitToItemGet: build.query<
      AddVisitToItemAddVisitToItemGetApiResponse,
      AddVisitToItemAddVisitToItemGetApiArg
    >({
      query: (queryArg) => ({
        url: `/add_visit_to_item`,
        body: queryArg.visitBase,
        params: {
          item_id: queryArg.itemId,
        },
      }),
    }),
    modifyVisitModifyVisitGet: build.query<
      ModifyVisitModifyVisitGetApiResponse,
      ModifyVisitModifyVisitGetApiArg
    >({
      query: (queryArg) => ({
        url: `/modify_visit`,
        body: queryArg.visitBase,
        params: {
          visit_id: queryArg.visitId,
        },
      }),
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
export type GetAllItemsGetAllItemsForGivenFloorPostApiResponse =
  /** status 200 Successful Response */ ItemBase[];
export type GetAllItemsGetAllItemsForGivenFloorPostApiArg = {
  floorNumber: number;
};
export type CreateNewItemCreateNewItemGetApiResponse =
  /** status 200 Successful Response */ ItemBase;
export type CreateNewItemCreateNewItemGetApiArg = {
  itemBaseInput: ItemBase2;
};
export type ModifyItemModifyItemGetApiResponse =
  /** status 200 Successful Response */ ItemBase;
export type ModifyItemModifyItemGetApiArg = {
  itemId: number;
  itemBaseInput: ItemBase2;
};
export type DeleteItemDeleteItemGetApiResponse =
  /** status 200 Successful Response */ ItemBase;
export type DeleteItemDeleteItemGetApiArg = {
  itemId: number;
};
export type AddVisitToItemAddVisitToItemGetApiResponse =
  /** status 200 Successful Response */ ItemBase;
export type AddVisitToItemAddVisitToItemGetApiArg = {
  itemId: number;
  visitBase: VisitBase;
};
export type ModifyVisitModifyVisitGetApiResponse =
  /** status 200 Successful Response */ VisitBase;
export type ModifyVisitModifyVisitGetApiArg = {
  visitId: number;
  visitBase: VisitBase;
};
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
  useGetAllItemsGetAllItemsForGivenFloorPostMutation,
  useCreateNewItemCreateNewItemGetQuery,
  useModifyItemModifyItemGetQuery,
  useDeleteItemDeleteItemGetQuery,
  useAddVisitToItemAddVisitToItemGetQuery,
  useModifyVisitModifyVisitGetQuery,
  useUploadImageUploadtestPostMutation,
  useUploadImageUploadPostMutation,
  useGetItemIdsItemIdsGetQuery,
} = injectedRtkApi;
