import BoardListUI from "./BoardList.presenter";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { FETCH_BOARDS, FETCH_BOARDS_COUNT } from "./BoardList.queries";
import moment from "moment";

export default function BoardList() {
  const page = 0;
  const router = useRouter();
  const { data: list } = useQuery(FETCH_BOARDS, {
    variables: {
      page: page + 1,
    },
  });
  const { data: count } = useQuery(FETCH_BOARDS_COUNT);

  const boardData = list?.fetchBoards?.map((i, idx) => ({
    number: count?.fetchBoardsCount - page * 10 - idx,
    writer: i.writer,
    title: i.title,
    id: i._id,
    updatedAt: moment(i.updatedAt).format("YYYY-MM-DD"),
  }));

  const onGoDetail = (id) => {
    router.push(`/boards/${id}`);
  };

  return (
    !!boardData && (
      <BoardListUI onGoDetail={onGoDetail} data={boardData && boardData} />
    )
  );
}
