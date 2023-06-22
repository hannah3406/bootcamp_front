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
import PaginationComponents from "../../../commons/Pagination";
import SearchBar from "../../../commons/SearchBar";

export default function BoardList() {
  const router = useRouter();
  const [boardList, setBoardList] = useState<IBoardListData[]>([]);
  const [lastPage, setLastPage] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [search, setSearch] = useState<string | undefined>(undefined);

  const {
    data: list,
    loading: listLoading,
    refetch: refetchSearchList,
  } = useQuery<Pick<IQuery, "fetchBoards">>(FETCH_BOARDS, {
    variables: {
      page: currentPage,
      search,
    },
  });
  const {
    data: count,
    loading: countLoading,
    refetch: refetchSearchCount,
  } = useQuery<Pick<IQuery, "fetchBoardsCount">>(FETCH_BOARDS_COUNT);

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
      setBoardList(boardData);
    }
  }, [listLoading, countLoading, count, list, currentPage, totalCount]);

  const onGoDetail = (id: string) => {
    router.push(`/boards/${id}`);
  };

  const onGoNew = () => {
    router.push(`/boards/new`);
  };
  const onSearch = (search: string) => {
    setSearch(search);
    setCurrentPage(1);
    refetchSearchList({ search, page: 1 });
    refetchSearchCount({ search });
  };

  return (
    <>
      <div style={{ display: "inlne-block", width: "70%", margin: "0 auto" }}>
        <SearchBar onSearch={onSearch} />
      </div>
      {!!boardList && (
        <BoardListUI
          onGoDetail={onGoDetail}
          data={boardList && boardList}
          onGoNew={onGoNew}
        />
      )}
      <div style={{ display: "inlne-block", width: "50%", margin: "0 auto" }}>
        <PaginationComponents
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          refetch={refetchSearchList}
          lastPage={lastPage}
          search={search}
        />
      </div>
    </>
  );
}
