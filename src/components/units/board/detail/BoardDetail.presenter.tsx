import * as S from "./BoardDetail.styles";
import moment from "moment";
import Button from "../../../commons/Button";
import { IBoardDetailUIProps } from "../../../../types/Board.types";
import { Tooltip } from "antd";

export default function BoardDetailUI(props: IBoardDetailUIProps) {
  const {
    data,
    onGoList,
    onDeleteBoard,
    onGoEdit,
    onLikeBoard,
    onDisLikeBoard,
  } = props;

  return (
    <S.Wrapper>
      <S.DetailWrapper>
        <S.Top>
          <S.ProfileIcon />
          <div style={{ textAlign: "left" }}>
            <S.Writer>{data?.fetchBoard?.writer}</S.Writer>
            <S.Date>
              Date : {moment(data?.fetchBoard?.updatedAt).format("YYYY-MM-DD")}
            </S.Date>
          </div>
          <S.IconWrap>
            <S.IconShare />
            {/* <Tooltip
              placement="topRight"
              title={
                <div style={{ padding: "8px 16px" }}>
                  <p>{data?.fetchBoard?.boardAddress?.address}</p>
                  <p>{data?.fetchBoard?.boardAddress?.addressDetail}</p>
                </div>
              }
            >
              <S.IconLocation />
            </Tooltip> */}
          </S.IconWrap>
        </S.Top>
        <S.Middle>
          <h2>{data?.fetchBoard?.title}</h2>
          <div
            dangerouslySetInnerHTML={{ __html: data?.fetchBoard?.contents }}
          />
          <S.LikeWrapper>
            <S.LikeIcon onClick={onLikeBoard}>
              {data?.fetchBoard?.likeCount}
            </S.LikeIcon>
            <S.DisLikeIcon onClick={onDisLikeBoard}>
              {data?.fetchBoard?.dislikeCount}
            </S.DisLikeIcon>
          </S.LikeWrapper>
        </S.Middle>
      </S.DetailWrapper>
      <Button text="목록으로" onClick={onGoList} />
      <Button text="수정하기" onClick={onGoEdit} />
      <Button text="삭제하기" onClick={onDeleteBoard} />
    </S.Wrapper>
  );
}
