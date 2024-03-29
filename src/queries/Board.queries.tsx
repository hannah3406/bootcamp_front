import { gql } from "@apollo/client";
// mutation
export const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
    }
  }
`;

export const UPDATE_BOARD = gql`
  mutation updateBoard(
    $updateBoardInput: UpdateBoardInput!
    $password: String
    $boardId: ID!
  ) {
    updateBoard(
      updateBoardInput: $updateBoardInput
      password: $password
      boardId: $boardId
    ) {
      _id
    }
  }
`;
export const UPDATE_BOARD_COMMENT = gql`
  mutation updateBoardComment(
    $updateBoardCommentInput: UpdateBoardCommentInput!
    $password: String
    $id: ID!
  ) {
    updateBoardComment(
      updateBoardCommentInput: $updateBoardCommentInput
      password: $password
      boardCommentId: $id
    ) {
      _id
    }
  }
`;

export const CREATE_BOARD_COMMENT = gql`
  mutation createBoardComment(
    $createBoardCommentInput: CreateBoardCommentInput!
    $id: ID!
  ) {
    createBoardComment(
      createBoardCommentInput: $createBoardCommentInput
      boardId: $id
    ) {
      _id
    }
  }
`;
export const LIKE_BOARD = gql`
  mutation likeBoard($boardId: ID!) {
    likeBoard(boardId: $boardId)
  }
`;
export const DISLIKE_BOARD = gql`
  mutation dislikeBoard($boardId: ID!) {
    dislikeBoard(boardId: $boardId)
  }
`;
export const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;

// fetch
export const FETCH_BOARD = gql`
  query fetchBoard($id: ID!) {
    fetchBoard(boardId: $id) {
      writer
      title
      images
      contents
      updatedAt
      likeCount
      youtubeUrl
      dislikeCount
      boardAddress {
        zipcode
        address
        addressDetail
      }
    }
  }
`;
export const FETCH_BOARDS = gql`
  query fetchBoards($page: Int, $search: String) {
    fetchBoards(page: $page, search: $search) {
      _id
      writer
      title
      updatedAt
    }
  }
`;

export const FETCH_BOARD_COMMENTS = gql`
  query fetchBoardComments($page: Int, $id: ID!) {
    fetchBoardComments(page: $page, boardId: $id) {
      _id
      writer
      contents
      rating
      updatedAt
    }
  }
`;

export const FETCH_BOARDS_COUNT = gql`
  query fetchBoardsCount($search: String) {
    fetchBoardsCount(search: $search)
  }
`;

export const DELETE_BOARD = gql`
  mutation deleteBoard($id: ID!) {
    deleteBoard(boardId: $id)
  }
`;

export const DELETE_BBOARD_COMMENT = gql`
  mutation deleteBoardComment($password: String, $id: ID!) {
    deleteBoardComment(password: $password, boardCommentId: $id)
  }
`;
