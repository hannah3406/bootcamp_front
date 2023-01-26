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
import PaginationComponents from "../../../commons/Pagination";

export default function BoardList() {
  const router = useRouter();
  const [boardList, setBoardList] = useState<IBoardListData[]>([]);
  const [lastPage, setLastPage] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const {
    data: list,
    loading: listLoading,
    refetch,
  } = useQuery<Pick<IQuery, "fetchBoards">>(FETCH_BOARDS, {
    variables: {
      page: currentPage,
    },
  });
  const { data: count, loading: countLoading } =
    useQuery<Pick<IQuery, "fetchBoardsCount">>(FETCH_BOARDS_COUNT);

  useEffect(() => {
    if (!countLoading && !!count) {
      setTotalCount(count?.fetchBoardsCount);

      setLastPage(
        count?.fetchBoardsCount % 10 === 0
          ? Math.trunc(count?.fetchBoardsCount / 10)
          : Math.trunc(count?.fetchBoardsCount / 10) + 1
      );
    }
  }, [countLoading, count]);
  useEffect(() => {
    if (!!totalCount && !listLoading && !!list) {
      const boardData = list.fetchBoards?.map((i, idx) => ({
        number: totalCount - (currentPage - 1) * 10 - idx,
        writer: i.writer,
        title: i.title,
        id: i._id,
        updatedAt: moment(i.updatedAt).format("YYYY-MM-DD"),
      }));
      console.log(boardData, "boardData1");
      setBoardList(boardData);
    }
    console.log(!!totalCount);
    console.log(!listLoading);
    console.log(!!list);
    console.log(!!totalCount && !listLoading && !!list);
    console.log("boardData2");
  }, [listLoading, countLoading, count, list, currentPage, totalCount]);

  const onGoDetail = (id: string) => {
    router.push(`/boards/${id}`);
  };
  const onGoNew = () => {
    router.push(`/boards/new`);
  };

  return (
    <>
      {!!boardList && (
        <BoardListUI
          onGoDetail={onGoDetail}
          data={boardList && boardList}
          onGoNew={onGoNew}
        />
      )}
      <div style={{ display: "inlne-block", width: "50%", margin: "0 auto" }}>
        <PaginationComponents
          setCurrentPage={setCurrentPage}
          refetch={refetch}
          lastPage={lastPage}
        />
      </div>
    </>
  );
}
