import { gql, useQuery } from "@apollo/client";
import BoardWrite from "../../../src/components/units/board/write/BoardWrite.container";
import { useRouter } from "next/router";
import { IQuery } from "../../../src/commons/types/generated/types";

export const FETCH_BOARD = gql`
  query fetchBoard($id: ID!) {
    fetchBoard(boardId: $id) {
      writer
      title
      contents
      youtubeUrl
      boardAddress {
        zipcode
        address
        addressDetail
      }
      images
    }
  }
`;

export default function Edit() {
  const router = useRouter();
  const { data } = useQuery<Pick<IQuery, "fetchBoard">>(FETCH_BOARD, {
    variables: {
      id: router.query.id,
    },
  });

  return !!data?.fetchBoard && <BoardWrite isEdit={true} editData={data} />;
}
