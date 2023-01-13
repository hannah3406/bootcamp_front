import BoardCommentWriteUI from "./BoardCommentWrite.presenter";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import {
  CREATE_BOARD_COMMENT,
  FETCH_BOARD_COMMENTS,
  UPDATE_BOARD_COMMENT,
} from "../../../../../queries/Board.queries";
import { ICommentListEl } from "../list/BoardCommentList.container";

interface IBoardCommentWriteProps {
  isEdit?: boolean;
  editData?: ICommentListEl;
}
interface ImyVariables {
  rating?: number;
  contents?: string;
}

export default function BoardCommentWrite(props: IBoardCommentWriteProps) {
  const { isEdit, editData } = props;

  const [createBoardComment] = useMutation(CREATE_BOARD_COMMENT);
  const [updateBoardComment] = useMutation(UPDATE_BOARD_COMMENT);
  const router = useRouter();

  const onSubmitValue = async (values: ICommentListEl) => {
    // e.preventDefault();
    const writer = values.writer;
    const password = values.password;
    const rating = values.rating;
    const contents = values.contents;

    try {
      if (!writer) return alert("작성자 빈칸을 채워주세요.");
      if (!password) return alert("비밀번호 빈칸을 채워주세요.");
      if (!rating) return alert("별점 빈칸을 채워주세요.");
      if (!contents) return alert("내용 빈칸을 채워주세요.");
      if (isEdit) {
        const myVariables: ImyVariables = {};
        if (rating !== editData.rating) myVariables.rating = rating;
        if (contents !== editData.contents) myVariables.contents = contents;
        return await updateBoardComment({
          variables: {
            updateBoardCommentInput: {
              rating: myVariables.rating,
              contents: myVariables.contents,
            },
            password: password,
            id: router.query.id,
          },
          refetchQueries: [
            {
              query: FETCH_BOARD_COMMENTS,
              variables: {
                id: router.query.id,
              },
            },
          ],
        });
      }
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
        refetchQueries: [
          {
            query: FETCH_BOARD_COMMENTS,
            variables: {
              id: router.query.id,
            },
          },
        ],
      });
      alert("댓글 등록이 완료되었습니다.");
    } catch (e) {
      console.log(e);
      return alert("댓글 작성 오류가 발생하였습니다.");
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
