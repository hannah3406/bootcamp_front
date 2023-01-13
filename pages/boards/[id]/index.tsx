import styled from "@emotion/styled";
import BoardCommentList from "../../../src/components/units/board/comment/list/BoardCommentList.container";
import BoardCommentWrite from "../../../src/components/units/board/comment/write/BoardCommentWrite.container";
import BoardDetail from "../../../src/components/units/board/detail/BoardDetail.container";

const Wrapper = styled.div`
  width: 1200px;
  margin: 0 auto;
`;
export default function Detail() {
  return (
    <Wrapper>
      <BoardDetail />
      <BoardCommentWrite />
      <BoardCommentList />
    </Wrapper>
  );
}
