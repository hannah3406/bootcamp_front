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
        <h2>{isEdit ? "게시물 수정" : "게시물 등록"}</h2>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <S.Label className="label_half first">
            작성자
            <S.Input
              ref={register}
              {...register("writer", {
                required: "닉네임을 입력해주세요.",
              })}
              placeholder="이름을 적어주세요"
            />
            {<S.Error>{errors.writer?.message}</S.Error>}
          </S.Label>
          <S.Label className="label label_half">
            비밀번호
            <S.Input
              type="password"
              {...register("password", {
                required: "비밀번호를 입력해주세요.",
                pattern: {
                  value: /^.{8,}$/,
                  message: "8글자 이상으로 입력해주세요.",
                },
              })}
              placeholder="비밀번호를 입력해주세요."
            />
            {<S.Error>{errors.password?.message}</S.Error>}
          </S.Label>
          <S.Label className="label">
            제목
            <S.Input
              {...register("title", {
                required: "제목을 작성해주세요.",
              })}
              placeholder="제목을 작성해주세요."
            />
            {<S.Error>{errors.title?.message}</S.Error>}
          </S.Label>
          <S.Label className="label">
            내용
            <S.Textarea
              {...register("contents", {
                required: "내용을 작성해주세요.",
              })}
              placeholder="내용을 작성해주세요."
            />
            {<S.Error>{errors.contents?.message}</S.Error>}
          </S.Label>
          <S.Label className="label">
            주소
            <div>
              <S.Input
                className="zipcode"
                value={zipcode}
                disabled
                {...register("zipcode")}
              />
              <button onClick={onToggleModal}>우편번호 검색 </button>
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
                required: "상세주소를 입력해주세요.",
              })}
              style={{
                marginBottom: `37px !important`,
                marginTop: `0px !important`,
              }}
            />
          </S.Label>

          <S.Label className="label">
            유튜브
            <S.Input
              {...register("youtubeUrl")}
              placeholder="링크를 복사해주세요."
            />
          </S.Label>

          <S.Label className="label">
            사진 첨부
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
              value={isEdit ? "수정하기" : "등록하기"}
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
