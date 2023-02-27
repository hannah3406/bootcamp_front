import * as S from "./BoardDetail.styles";
import moment from "moment";
import Button from "../../../commons/Button";
import { IBoardDetailUIProps } from "../../../../types/Board.types";
import { Tooltip } from "antd";
import ReactPlayer from "react-player";

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
            <Tooltip
              placement="topRight"
              title={
                <div style={{ padding: "8px 16px" }}>
                  <p>{data?.fetchBoard?.boardAddress?.address}</p>
                  <p>{data?.fetchBoard?.boardAddress?.addressDetail}</p>
                </div>
              }
            >
              <S.IconLocation />
            </Tooltip>
          </S.IconWrap>
        </S.Top>
        <S.Middle>
          <S.Title>{data?.fetchBoard?.title}</S.Title>
          {data?.fetchBoard?.images &&
            data?.fetchBoard?.images.map((img) => (
              <S.ImgWrapper key={img}>
                <img src={"https://storage.googleapis.com/" + img} />
              </S.ImgWrapper>
            ))}
          <div
            dangerouslySetInnerHTML={{ __html: data?.fetchBoard?.contents }}
          />
          {data?.fetchBoard?.youtubeUrl && (
            <S.ImgWrapper>
              <ReactPlayer
                url={data?.fetchBoard?.youtubeUrl}
                muted={false}
                playing={true}
                loop={true}
              />
            </S.ImgWrapper>
          )}
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
