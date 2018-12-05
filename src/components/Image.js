import { Image } from "react-native";
import { COMPONENT_TYPES, FORM_TYPES } from "../core/component-types";

export default Image;

export const SEED_DATA = {
  name: "Image",
  tag: "Image",
  description: "A basic Image Component",
  type: COMPONENT_TYPES.primitive,
  supports_list_render: false,
  preview_image_url:
    "https://res.cloudinary.com/altos/image/upload/v1543956594/draftbit/Jigsaw/Image.svg",
  layout: {
    width: 200,
    height: 200
  },
  props: {
    source: {
      label: "Image Source",
      description: "The source of the image",
      editable: true,
      required: true,
      type: FORM_TYPES.localImage,
      value: null
    }
  }
};