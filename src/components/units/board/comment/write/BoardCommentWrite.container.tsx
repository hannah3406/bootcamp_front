import BoardCommentWriteUI from "./BoardCommentWrite.presenter";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import {
  CREATE_BOARD_COMMENT,
  UPDATE_BOARD_COMMENT,
} from "../../../../../queries/Board.queries";
import {
  IBoardCommentWriteCreateData,
  IBoardCommentWriteProps,
  ImyVariables,
} from "../../../../../types/Board.types";
import { IMutation } from "../../../../../commons/types/generated/types";

export default function BoardCommentWrite(props: IBoardCommentWriteProps) {
  const { isEdit, editData, refetch } = props;
  const page = 0;
  const [createBoardComment] =
    useMutation<Pick<IMutation, "createBoardComment">>(CREATE_BOARD_COMMENT);
  const [updateBoardComment] =
    useMutation<Pick<IMutation, "updateBoardComment">>(UPDATE_BOARD_COMMENT);

  const router = useRouter();

  const onSubmitValue = async (values: IBoardCommentWriteCreateData) => {
    const writer = values.writer;
    const password = values.password;
    const rating = values.rating;
    const contents = values.contents;

    if (!writer) return alert("작성자 빈칸을 채워주세요.");
    if (!password) return alert("비밀번호 빈칸을 채워주세요.");
    if (!rating) return alert("별점 빈칸을 채워주세요.");
    if (!contents) return alert("내용 빈칸을 채워주세요.");

    if (!isEdit) {
      try {
        await createBoardComment({
          variables: {
            createBoardCommentInput: {
              writer,
              password,
              rating,
              contents,
            },
            id: router.query.id,
          },
        });
        alert("댓글 등록이 완료되었습니다.");
        refetch();
      } catch (e) {
        console.log(e);
        return alert("댓글 작성 오류가 발생하였습니다.");
      }
    }

    if (isEdit) {
      const myVariables: ImyVariables = {};
      if (rating !== editData.rating) myVariables.rating = rating;
      if (contents !== editData.contents) myVariables.contents = contents;
      try {
        await updateBoardComment({
          variables: {
            updateBoardCommentInput: {
              rating: myVariables.rating,
              contents: myVariables.contents,
            },
            password,
            id: editData._id,
          },
        });
        refetch();
        alert("댓글 수정이 완료되었습니다.");
      } catch (e) {
        console.log(e);
        return alert("댓글 수정 오류가 발생하였습니다.");
      }
    }
  };

  return (
    <BoardCommentWriteUI
      onSubmitValue={onSubmitValue}
      isEdit={isEdit}
      editData={!!editData && editData}
    />
  );
}
