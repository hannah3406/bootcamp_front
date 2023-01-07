import BoardDetailUI from "./BoardDetail.presenter";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { FETCH_BOARD } from "./BoardDetail.queries";


export default function BoardDetail() {
  const router = useRouter();
  const { data } = useQuery(FETCH_BOARD, {
    variables: {
      id: router.query.id,
    },
  });
  return <BoardDetailUI data={data && data.fetchBoard} />;
}
