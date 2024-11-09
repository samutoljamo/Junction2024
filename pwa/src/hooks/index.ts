import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { useUploadImageUploadPostMutation } from "../store/backend";
import {
  setCondition,
  setEquipmentName,
  setEquipmentType,
  setManufacturer,
  setManufacturingYear,
  setModel,
  setSerialNumber,
  setTypeOfMaterial,
} from "../formSlice";

export function useFormFill() {
  const [uploadImage, { data }] = useUploadImageUploadPostMutation();
  const images = useAppSelector((state) => state.form.images);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(data);
    if (data?.equipment_name) {
      console.log("here", data.equipment_name);
      dispatch(setEquipmentName(data.equipment_name));
    }
    if (data?.equipment_type) {
      dispatch(setEquipmentType(data.equipment_type));
    }

    if (data?.manufacturer) {
      dispatch(setManufacturer(data.manufacturer));
    }
    if (data?.manufacturing_year) {
      dispatch(setManufacturingYear(data.manufacturing_year));
    }
    if (data?.material) {
      dispatch(setTypeOfMaterial(data.material));
    }
    if (data?.model) {
      dispatch(setModel(data.model));
    }
    if (data?.serial_number) {
      dispatch(setSerialNumber(data.serial_number));
    }
    if (data?.surface_condition) {
      dispatch(setCondition(data.surface_condition));
    }
  }, [data]);

  return function () {
    if (images.length > 0) {
      uploadImage({
        imageUpload: {
          images: images.map((img) => img.data),
        },
      });
    }
  };
}
