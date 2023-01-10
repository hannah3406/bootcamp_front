import BoardDetailUI from "./BoardDetail.presenter";
import { useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { FETCH_BOARD, DELETE_BOARD } from "./BoardDetail.queries";

export default function BoardDetail() {
  const router = useRouter();
  const [deleteBoard] = useMutation(DELETE_BOARD);
  const { data } = useQuery(FETCH_BOARD, {
    variables: {
      id: router.query.id,
    },
  });
  const onGoList = () => {
    router.push(`/boards`);
  };
  const onDeleteBoard = async () => {
    try {
      await deleteBoard({
        variables: {
          id: router.query.id,
        },
      });
      alert("게시물이 삭제되었습니다.");
      router.push(`/boards`);
    } catch (e) {
      console.log(e);
      alert("오류 발생");
    }
  };
  const onGoEdit = () => {
    router.push(`/boards/${router.query.id}/edit`);
  };
  return (
    <BoardDetailUI
      data={data && data.fetchBoard}
      onDeleteBoard={onDeleteBoard}
      onGoList={onGoList}
      onGoEdit={onGoEdit}
    />
  );
}
