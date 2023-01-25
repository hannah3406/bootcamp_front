import BoardCommentListUI from "./BoardCommentList.presenter";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import {
  DELETE_BBOARD_COMMENT,
  FETCH_BOARD_COMMENTS,
} from "../../../../../queries/Board.queries";
import { useState } from "react";
import {
  IBoardCommentListProps,
  IFetchBoardComment,
} from "../../../../../types/Board.types";
import { IMutation } from "../../../../../commons/types/generated/types";

export default function BoardCommentList(props: IBoardCommentListProps) {
  const { list, refetch } = props;

  const page = 0;
  const router = useRouter();
  const [deleteBoardComment] = useMutation<
    Pick<IMutation, "deleteBoardComment">
  >(DELETE_BBOARD_COMMENT);

  const onDeleteBoard = async (deleteData: {
    id: string;
    password: string;
  }) => {
    try {
      await deleteBoardComment({
        variables: {
          password: deleteData.password,
          id: deleteData.id,
        },
        refetchQueries: [
          {
            query: FETCH_BOARD_COMMENTS,
            variables: {
              page: page + 1,
              id: router.query.id,
            },
          },
        ],
      });
      alert("댓글이 삭제되었습니다.");
      refetch();
    } catch (e) {
      console.log(e);
      alert("오류 발생");
    }
  };
  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
  };

  const [passwordValue, setPasswordValue] = useState<string>("");

  const [isEdit, setIsEdit] = useState<string>(null);
  const onClickEdit = (id: string) => {
    setIsEdit(id);
  };
  const onShowWriter = (writer: string) => {
    alert(`${writer}님이 작성한 댓글입니다.`);
  };

  return (
    <>
      {!!list &&
        list.map((i: IFetchBoardComment) => (
          <BoardCommentListUI
            key={i._id}
            data={i}
            onDeleteBoard={onDeleteBoard}
            onChangeValue={onChangeValue}
            passwordValue={passwordValue}
            isEdit={isEdit === i._id}
            refetch={refetch}
            onShowWriter={onShowWriter}
            onClickEdit={onClickEdit}
          />
        ))}
    </>
  );
}
