import BoardListUI from "./BoardList.presenter";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import {
  FETCH_BOARDS,
  FETCH_BOARDS_COUNT,
} from "../../../../queries/Board.queries";
import moment from "moment";
import { useEffect, useState } from "react";
import { IQuery } from "../../../../commons/types/generated/types";
import { IBoardListData } from "../../../../types/Board.types";
import * as S from "./BoardList.styles";

export default function BoardList() {
  const page = 0;
  const router = useRouter();
  const [boardList, setBoardList] = useState<IBoardListData[]>([]);
  const { data: list, loading: listLoading } = useQuery<
    Pick<IQuery, "fetchBoards">
  >(FETCH_BOARDS, {
    variables: {
      page: page + 1,
    },
  });
  const { data: count, loading: countLoading } =
    useQuery<Pick<IQuery, "fetchBoardsCount">>(FETCH_BOARDS_COUNT);

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

  const onGoDetail = (id: string) => {
    router.push(`/boards/${id}`);
  };
  const onGoNew = () => {
    router.push(`/boards/new`);
  };

  return (
    <>
      {!!boardList && (
        <BoardListUI onGoDetail={onGoDetail} data={boardList && boardList} />
      )}
      <S.GoNewButton onClick={onGoNew}>게시물 등록하기</S.GoNewButton>
    </>
  );
}
