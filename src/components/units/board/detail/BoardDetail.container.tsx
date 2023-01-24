import BoardDetailUI from "./BoardDetail.presenter";
import { useMutation, useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import {
  FETCH_BOARD,
  FETCH_BOARDS,
  DELETE_BOARD,
} from "../../../../queries/Board.queries";
import { useEffect } from "react";
import { IMutation, IQuery } from "../../../../commons/types/generated/types";

export default function BoardDetail() {
  const router = useRouter();
  const [deleteBoard] =
    useMutation<Pick<IMutation, "deleteBoard">>(DELETE_BOARD);

  const [fetchBoard, { data }] = useLazyQuery<Pick<IQuery, "fetchBoard">>(
    FETCH_BOARD,
    {
      variables: {
        id: router.query.id,
      },
    }
  );
  useEffect(() => {
    if (!!router.query.id) {
      fetchBoard();
    }
  }, [router.query.id]);
  const onGoList = () => {
    router.push(`/boards`);
  };
  const onDeleteBoard = async () => {
    try {
      await deleteBoard({
        variables: {
          id: router.query.id,
        },
        refetchQueries: [
          {
            query: FETCH_BOARDS,
          },
        ],
      });
      alert("게시물이 삭제되었습니다.");
      router.push(`/boards`);
    } catch (e) {
      console.log(e);
      alert("오류 발생");
    }
  };
  const onGoEdit = () => {
    router.push(`/boards/${router.query.id}/edit`);
  };

  return (
    <BoardDetailUI
      data={data && data}
      onDeleteBoard={onDeleteBoard}
      onGoList={onGoList}
      onGoEdit={onGoEdit}
    />
  );
}
