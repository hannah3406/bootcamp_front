import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import BoardWriteUI from "./BoardWrite.persenter";
import { CREATE_BOARD, UPDATE_BOARD } from "../../../../queries/Board.queries";
import {
  IBoardWriteData,
  IBoardWriteMyVariables,
  IBoardWriteProps,
} from "../../../../types/Board.types";
import {
  IMutation,
  IMutationCreateBoardArgs,
  IMutationUpdateBoardArgs,
} from "../../../../commons/types/generated/types";

export default function BoardWrite(props: IBoardWriteProps) {
  const { isEdit, editData } = props;
  const [createBoard] = useMutation<
    Pick<IMutation, "createBoard">,
    IMutationCreateBoardArgs
  >(CREATE_BOARD);
  const [updateBoard] = useMutation<
    Pick<IMutation, "updateBoard">,
    IMutationUpdateBoardArgs
  >(UPDATE_BOARD);
  const router = useRouter();

  const onSubmit = async (data: IBoardWriteData) => {
    if (typeof router.query.id !== "string") {
      router.push("/");
      return <></>;
    }
    if (!isEdit) {
      // key 와 value 가 같은 경우, writer : data.writer 가 아니라 writer 이라고만 써도 무방하다. (shorthand-property)
      const result = await createBoard({
        variables: {
          createBoardInput: {
            writer: data.writer,
            password: data.password,
            title: data.title,
            contents: data.contents,
          },
        },
      });
      alert("게시물 등록이 완료되었습니다.");
      router.push(`/boards/${result.data.createBoard._id}`);
    }
    if (isEdit) {
      // key 와 value 가 같은 경우, writer : data.writer 가 아니라 writer 이라고만 써도 무방하다. (shorthand-property)
      const myVariables: IBoardWriteMyVariables = {};
      if (data.title !== editData?.fetchBoard?.title)
        myVariables.title = data.title;
      if (data.contents !== editData?.fetchBoard?.contents)
        myVariables.contents = data.contents;

      const result = await updateBoard({
        variables: {
          updateBoardInput: {
            title: myVariables.title,
            contents: myVariables.contents,
          },
          password: data.password,
          boardId: router.query.id,
        },
      });
      alert("게시물 수정이 완료되었습니다.");
      router.push(`/boards/${result.data.updateBoard._id}`);
    }
  };
  const onError = (errors: Error, e: { message: string }) => {
    console.log(errors, e);
    alert(e.message);
  };
  return (
    <BoardWriteUI
      onSubmit={onSubmit}
      onError={onError}
      isEdit={isEdit}
      editData={editData}
    />
  );
}
