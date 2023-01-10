import * as S from "./BoardDetail.styles";
import moment from "moment";
import Button from "../../../commons/Button";

export default function BoardDetailUI(props) {
  const { data, onGoList, onDeleteBoard } = props;
  return (
    <S.Wrapper>
      <S.DetailWrapper>
        <S.Top>
          <S.ProfileIcon />
          <div>
            <S.Writer>{data?.writer}</S.Writer>
            <S.Date>
              Date : {moment(data?.updatedAt).format("YYYY-MM-DD")}
            </S.Date>
          </div>
          <S.IconWrap>
            <S.IconShare />
            <S.IconLocation />
          </S.IconWrap>
        </S.Top>
        <S.Middle>
          <h2>{data?.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: data?.contents }} />
          <S.LikeWrapper>
            <S.LikeIcon>1920</S.LikeIcon> <S.DisLikeIcon>1920</S.DisLikeIcon>
          </S.LikeWrapper>
        </S.Middle>
      </S.DetailWrapper>
      <Button text="목록으로" onClick={onGoList} />
      <Button text="수정하기" />
      <Button text="삭제하기" onClick={onDeleteBoard} />
    </S.Wrapper>
  );
}
