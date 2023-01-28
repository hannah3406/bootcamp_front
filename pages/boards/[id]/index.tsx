/* eslint-disable @typescript-eslint/no-misused-promises */
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import BoardCommentList from "../../../src/components/units/board/comment/list/BoardCommentList.container";
import BoardCommentWrite from "../../../src/components/units/board/comment/write/BoardCommentWrite.container";
import BoardDetail from "../../../src/components/units/board/detail/BoardDetail.container";
import { useQuery } from "@apollo/client";
import { FETCH_BOARD_COMMENTS } from "../../../src/queries/Board.queries";
import { IQuery } from "../../../src/commons/types/generated/types";

const Wrapper = styled.div`
  width: 1200px;
  margin: 0 auto;
`;
export default function Detail() {
  const page = 0;
  const router = useRouter();
  const {
    data: list,
    refetch,
    fetchMore,
  } = useQuery<Pick<IQuery, "fetchBoardComments">>(FETCH_BOARD_COMMENTS, {
    variables: {
      page: page + 1,
      id: router.query.id,
    },
  });

  const onLoadMore = () => {
    if (list?.fetchBoardComments === undefined) return;
    fetchMore({
      variables: {
        page: Math.trunc(list?.fetchBoardComments.length / 10) + 1,
        id: router.query.id,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        if (!Number.isInteger(prev.fetchBoardComments.length / 10)) return prev;

        return Object.assign({}, prev, {
          fetchBoardComments: [
            ...prev.fetchBoardComments,
            ...fetchMoreResult.fetchBoardComments,
          ],
        });
      },
    });
  };

  return (
    <Wrapper>
      <BoardDetail />
      <BoardCommentWrite refetch={refetch} isEdit={false} />
      <BoardCommentList
        list={list?.fetchBoardComments}
        refetch={refetch}
        onLoadMore={onLoadMore}
      />
    </Wrapper>
  );
}
