import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";
import BoardWrite from "../../../src/components/units/board/write/BoardWrite.container";
import { useRouter } from "next/router";

export const FETCH_BOARD = gql`
  query fetchBoard($id: ID!) {
    fetchBoard(boardId: $id) {
      writer
      title
      contents
    }
  }
`;

export default function Edit() {
  const router = useRouter();
  const { data } = useQuery(FETCH_BOARD, {
    variables: {
      id: router.query.id,
    },
  });

  return (
    !!data?.fetchBoard && (
      <BoardWrite isEdit={true} editData={data?.fetchBoard} />
    )
  );
}
