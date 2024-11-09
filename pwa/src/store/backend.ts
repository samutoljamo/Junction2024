import { emptySplitApi as api } from "../emptyApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
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
  }),
  overrideExisting: false,
});
export { injectedRtkApi as backend };
export type UploadImageUploadtestPostApiResponse =
  /** status 200 Successful Response */ ItemStructure;
export type UploadImageUploadtestPostApiArg = void;
export type UploadImageUploadPostApiResponse =
  /** status 200 Successful Response */ ItemStructure;
export type UploadImageUploadPostApiArg = {
  imageUpload: ImageUpload;
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
export type ValidationError = {
  loc: (string | number)[];
  msg: string;
  type: string;
};
export type HttpValidationError = {
  detail?: ValidationError[];
};
export type ImageUpload = {
  /** List of base64 encoded images */
  images?: string[];
};
export const {
  useUploadImageUploadtestPostMutation,
  useUploadImageUploadPostMutation,
} = injectedRtkApi;
