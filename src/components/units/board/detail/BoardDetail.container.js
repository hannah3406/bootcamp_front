import BoardDetailUI from "./BoardDetail.presenter";

import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
const FETCH_BOARD = gql`
  query fetchBoard($id: ID!) {
    fetchBoard(boardId: $id) {
      writer
      title
      contents
      updatedAt
    }
  }
`;

export default function BoardDetail() {
  const router = useRouter();
  const { data } = useQuery(FETCH_BOARD, {
    variables: {
      id: router.query.id,
    },
  });
  return <BoardDetailUI data={data && data.fetchBoard} />;
}
