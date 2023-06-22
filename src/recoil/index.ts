import { UploadFile } from "antd";
import { atom } from "recoil";

export const imgList = atom<File[]>({
  key: "boards/fileList",
  default: [],
});

export const accessToken = atom<string>({
  key: "accessTokenState",
  default: "",
});
