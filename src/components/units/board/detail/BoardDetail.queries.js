import { gql } from "@apollo/client";

export const FETCH_BOARD = gql`
query fetchBoard($id: ID!) {
  fetchBoard(boardId: $id) {
    writer
    title
    contents
    updatedAt
  }
}
`;