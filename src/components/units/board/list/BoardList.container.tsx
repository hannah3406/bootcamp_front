import BoardListUI from "./BoardList.presenter";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import {
  FETCH_BOARDS,
  FETCH_BOARDS_COUNT,
} from "../../../../queries/Board.queries";
import moment from "moment";
import { useEffect, useState } from "react";

export default function BoardList() {
  const page = 0;
  const router = useRouter();
  const [boardList, setBoardList] = useState<any>([]);
  const { data: list, loading: listLoading } = useQuery(FETCH_BOARDS, {
    variables: {
      page: page + 1,
    },
  });
  const { data: count, loading: countLoading } = useQuery(FETCH_BOARDS_COUNT);

  useEffect(() => {
    if (!countLoading && !listLoading) {
      const boardData =
        count &&
        list?.fetchBoards?.map((i, idx) => ({
          number: count?.fetchBoardsCount - page * 10 - idx,
          writer: i.writer,
          title: i.title,
          id: i._id,
          updatedAt: moment(i.updatedAt).format("YYYY-MM-DD"),
        }));
      setBoardList(boardData);
    }
  }, [countLoading, listLoading, list, count]);

  const onGoDetail = (id) => {
    router.push(`/boards/${id}`);
  };

  return (
    !!boardList && (
      <BoardListUI onGoDetail={onGoDetail} data={boardList && boardList} />
    )
  );
}
