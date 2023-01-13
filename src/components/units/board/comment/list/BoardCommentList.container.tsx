import BoardCommentListUI from "./BoardCommentList.presenter";
import { useRouter } from "next/router";
import { useLazyQuery, useQuery } from "@apollo/client";
import { FETCH_BOARD_COMMENTS } from "../../../../../queries/Board.queries";
import { Key, useEffect } from "react";
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

  return (
    !!list &&
    list.fetchBoardComments.map((i: ICommentListEl, idx: Key) => (
      <BoardCommentListUI key={idx} data={i} />
    ))
  );
}
