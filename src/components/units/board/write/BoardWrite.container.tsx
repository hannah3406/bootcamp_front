/* eslint-disable @typescript-eslint/no-floating-promises */
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import BoardWriteUI from "./BoardWrite.persenter";
import { CREATE_BOARD, UPDATE_BOARD } from "../../../../queries/Board.queries";
import {
  IBoardWriteData,
  IBoardWriteMyVariables,
  IBoardWriteProps,
} from "../../../../types/Board.types";
import {
  IMutation,
  IMutationCreateBoardArgs,
  IMutationUpdateBoardArgs,
} from "../../../../commons/types/generated/types";
import React from "react";
import { Address } from "react-daum-postcode";

export default function BoardWrite(props: IBoardWriteProps) {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [searchAddress, setSearchAddress] = React.useState<{
    zipcode: string;
    address: string;
  }>({ zipcode: "", address: "" });
  const { isEdit, editData } = props;
  const [createBoard] = useMutation<
    Pick<IMutation, "createBoard">,
    IMutationCreateBoardArgs
  >(CREATE_BOARD);
  const [updateBoard] = useMutation<
    Pick<IMutation, "updateBoard">,
    IMutationUpdateBoardArgs
  >(UPDATE_BOARD);
  const router = useRouter();

  const onSubmit = async (data: IBoardWriteData) => {
    if (!isEdit) {
      // key 와 value 가 같은 경우, writer : data.writer 가 아니라 writer 이라고만 써도 무방하다. (shorthand-property)
      const result = await createBoard({
        variables: {
          createBoardInput: {
            writer: data.writer,
            password: data.password,
            title: data.title,
            contents: data.contents,
            boardAddress: {
              zipcode: searchAddress.zipcode,
              address: searchAddress.address,
              addressDetail: data.addressDetail,
            },
            youtubeUrl: data.youtubeUrl,
          },
        },
      });
      console.log(data, "result");
      alert("게시물 등록이 완료되었습니다.");
      router.push(`/boards/${result.data.createBoard._id}`);
    }
    if (isEdit) {
      if (typeof router.query.id !== "string") {
        console.log(typeof router.query.id);
        router.push("/");
        return <></>;
      }
      // key 와 value 가 같은 경우, writer : data.writer 가 아니라 writer 이라고만 써도 무방하다. (shorthand-property)
      const myVariables: IBoardWriteMyVariables = {};
      if (data.title !== editData?.fetchBoard?.title)
        myVariables.title = data.title;
      if (data.contents !== editData?.fetchBoard?.contents)
        myVariables.contents = data.contents;
      if (searchAddress.zipcode !== editData?.fetchBoard?.boardAddress?.zipcode)
        myVariables.zipcode = searchAddress.zipcode;
      if (searchAddress.address !== editData?.fetchBoard?.boardAddress?.address)
        myVariables.address = searchAddress.address;
      if (
        data.addressDetail !== editData?.fetchBoard?.boardAddress?.addressDetail
      )
        myVariables.addressDetail = data.addressDetail;
      if (data.youtubeUrl !== editData?.fetchBoard?.youtubeUrl)
        myVariables.youtubeUrl = data.youtubeUrl;

      const result = await updateBoard({
        variables: {
          updateBoardInput: {
            title: myVariables.title,
            contents: myVariables.contents,
            boardAddress: {
              zipcode: myVariables.zipcode,
              address: myVariables.address,
              addressDetail: myVariables.addressDetail,
            },
            youtubeUrl: myVariables.youtubeUrl,
          },
          password: data.password,
          boardId: router.query.id,
        },
      });
      alert("게시물 수정이 완료되었습니다.");
      router.push(`/boards/${result.data.updateBoard._id}`);
    }
  };
  const onError = (errors: Error, e: { message: string }) => {
    console.log(errors, e);
    alert(e.message);
  };
  const onToggleModal = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOpen((prev) => !prev);
  };
  const handleComplete = (a: Address) => [
    setSearchAddress({
      zipcode: a.zonecode,
      address: a.address,
    }),
    setIsOpen((prev) => !prev),
  ];
  return (
    <BoardWriteUI
      onSubmit={onSubmit}
      onError={onError}
      isEdit={isEdit}
      editData={editData}
      isOpen={isOpen}
      address={searchAddress.address}
      zipcode={searchAddress.zipcode}
      handleComplete={handleComplete}
      onToggleModal={onToggleModal}
    />
  );
}
