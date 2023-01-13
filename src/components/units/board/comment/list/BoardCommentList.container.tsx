import BoardCommentListUI from "./BoardCommentList.presenter";
import { useRouter } from "next/router";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  DELETE_BBOARD_COMMENT,
  FETCH_BOARD_COMMENTS,
} from "../../../../../queries/Board.queries";
import { Key, MouseEventHandler, useEffect, useState } from "react";
export interface ICommentListEl {
  password?: any;
  __typename?: string;
  _id?: string;
  contents: string;
  writer: string;
  rating: number;
  updatedAt?: string;
}
export default function BoardCommentList() {
  const page = 0;
  const router = useRouter();
  const [deleteBoardComment] = useMutation(DELETE_BBOARD_COMMENT);
  const [fetchBoardComments, { data: list }] = useLazyQuery(
    FETCH_BOARD_COMMENTS,
    {
      variables: {
        page: page + 1,
        id: router.query.id,
      },
    }
  );
  useEffect(() => {
    if (!!router.query.id) {
      fetchBoardComments();
    }
  }, [router.query.id]);
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
    } catch (e) {
      console.log(e);
      alert("오류 발생");
    }
  };
  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
  };
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [passwordValue, setPasswordValue] = useState<string>("");
  const onClickEdit = () => {
    setIsEdit(true);
  };

  return (
    !!list &&
    list.fetchBoardComments.map((i: ICommentListEl, idx: Key) => (
      <BoardCommentListUI
        key={i._id}
        data={i}
        onDeleteBoard={onDeleteBoard}
        onChangeValue={onChangeValue}
        passwordValue={passwordValue}
        isEdit={isEdit}
        onClickEdit={onClickEdit}
      />
    ))
  );
}
