import * as S from "./BoardDetail.styles";
import moment from "moment";

export default function BoardDetailUI(props) {
  const {data}=props
  return (
    <S.Wrapper>
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
    </S.Wrapper>
  );
}
