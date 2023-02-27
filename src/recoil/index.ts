import { UploadFile } from "antd";
import { atom } from "recoil";

export const imgList = atom<File[]>({
  key: "boards/fileList",
  default: [],
});
