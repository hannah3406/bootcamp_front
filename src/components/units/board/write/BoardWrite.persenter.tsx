import * as S from "./BoardWrite.styles";
import { Controller, useForm } from "react-hook-form";
import { IBoardWriteUIProps } from "../../../../types/Board.types";
import { Modal, Upload, UploadFile } from "antd";
import DaumPostcodeEmbed from "react-daum-postcode";
import { useEffect, useState } from "react";
import ImgCrop from "antd-img-crop";
import { useMutation } from "@apollo/client";
import { UPLOAD_FILE } from "../../../../queries/Board.queries";

export default function BoardWriteUI(props: IBoardWriteUIProps) {
  const {
    onSubmit,
    onError,
    isEdit,
    editData,
    onToggleModal,
    isOpen,
    handleComplete,
    address,
    zipcode,
  } = props;
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      writer: editData?.fetchBoard?.writer ? editData?.fetchBoard?.writer : "",
      password: "",
      title: editData?.fetchBoard?.title ? editData?.fetchBoard?.title : "",
      contents: editData?.fetchBoard?.contents
        ? editData?.fetchBoard?.contents
        : "",
      zipcode,
      address,
      addressDetail: editData?.fetchBoard?.boardAddress?.addressDetail
        ? editData?.fetchBoard?.boardAddress?.addressDetail
        : "",
      images: editData?.fetchBoard?.images ? editData?.fetchBoard?.images : [],
      youtubeUrl: editData?.fetchBoard?.youtubeUrl
        ? editData?.fetchBoard?.youtubeUrl
        : "",
    },
  });

  const [fileList, setFileList] = useState<UploadFile[]>(
    editData?.fetchBoard?.images
      ? editData?.fetchBoard?.images.map((i, idx) => ({
          name: i.substr(32, i.length - 32),
          uid: String(idx),
          url: "https://storage.googleapis.com/" + i,
          fileLabel: String(idx),
        }))
      : []
  );
  const [images, setImages] = useState<string[]>(
    editData?.fetchBoard?.images ? editData?.fetchBoard?.images : []
  );
  const [uploadFile] = useMutation(UPLOAD_FILE);

  const onUpload = async (file: any) => {
    if (file.status === "removed") {
      const name = fileList.find((x) => x.name === file.name).name;
      const findidx = images.findIndex(
        (x) => x.substr(32, x.length - 32) === name
      );
      const result = [...images];
      result.splice(findidx, 1);
      return setImages(result);
    }
    try {
      const result = await uploadFile({ variables: { file } });
      setImages([result.data?.uploadFile.url, ...images]);
    } catch (e) {
      alert(e);
    }
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;

    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  const isValid = !watch(["writer", "password", "title", "contents"]).includes(
    ""
  );
  useEffect(() => {
    setValue("images", images);
  }, [images]);

  return (
    <>
      <S.Wrapper>
        <h2>{isEdit ? "????????? ??????" : "????????? ??????"}</h2>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <S.Label className="label_half first">
            ?????????
            <S.Input
              ref={register}
              {...register("writer", {
                required: "???????????? ??????????????????.",
              })}
              placeholder="????????? ???????????????"
            />
            {<S.Error>{errors.writer?.message}</S.Error>}
          </S.Label>
          <S.Label className="label label_half">
            ????????????
            <S.Input
              type="password"
              {...register("password", {
                required: "??????????????? ??????????????????.",
                pattern: {
                  value: /^.{8,}$/,
                  message: "8?????? ???????????? ??????????????????.",
                },
              })}
              placeholder="??????????????? ??????????????????."
            />
            {<S.Error>{errors.password?.message}</S.Error>}
          </S.Label>
          <S.Label className="label">
            ??????
            <S.Input
              {...register("title", {
                required: "????????? ??????????????????.",
              })}
              placeholder="????????? ??????????????????."
            />
            {<S.Error>{errors.title?.message}</S.Error>}
          </S.Label>
          <S.Label className="label">
            ??????
            <S.Textarea
              {...register("contents", {
                required: "????????? ??????????????????.",
              })}
              placeholder="????????? ??????????????????."
            />
            {<S.Error>{errors.contents?.message}</S.Error>}
          </S.Label>
          <S.Label className="label">
            ??????
            <div>
              <S.Input
                className="zipcode"
                value={zipcode}
                disabled
                {...register("zipcode")}
              />
              <button onClick={onToggleModal}>???????????? ?????? </button>
            </div>
            <S.Input
              style={{
                marginBottom: `30px !important`,
                marginTop: `0px !important`,
              }}
              value={address}
              disabled
              {...register("address")}
            />
            <S.Input
              {...register("addressDetail", {
                required: "??????????????? ??????????????????.",
              })}
              style={{
                marginBottom: `37px !important`,
                marginTop: `0px !important`,
              }}
            />
          </S.Label>

          <S.Label className="label">
            ?????????
            <S.Input
              {...register("youtubeUrl")}
              placeholder="????????? ??????????????????."
            />
          </S.Label>

          <S.Label className="label">
            ?????? ??????
            <div style={{ display: "flex" }}>
              <Controller
                control={control}
                name="images"
                render={() => (
                  <ImgCrop rotate>
                    <Upload
                      listType="picture-card"
                      beforeUpload={() => false}
                      maxCount={3}
                      onChange={(info) => {
                        setFileList(info.fileList);
                        onUpload(info.file as unknown as File);
                        // onUpload(info.fileList);
                      }}
                      fileList={fileList}
                      onPreview={onPreview}
                    >
                      {fileList.length < 3 && "+ Upload"}
                    </Upload>
                  </ImgCrop>
                )}
              />
            </div>
          </S.Label>
          <div style={{ textAlign: "center" }}>
            <S.Submit
              type="submit"
              value={isEdit ? "????????????" : "????????????"}
              activeColor={isValid}
              disabled={!isValid}
            />
          </div>
        </form>
      </S.Wrapper>
      {isOpen && (
        <Modal
          open={true}
          onCancel={onToggleModal}
          footer={null}
          closable={false}
        >
          <DaumPostcodeEmbed onComplete={handleComplete} />
        </Modal>
      )}
    </>
  );
}
