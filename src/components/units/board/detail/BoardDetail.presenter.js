import {
  Wrapper,
  Top,
  Middle,
  ProfileIcon,
  Writer,
  Date,
  IconWrap,
  IconShare,
  IconLocation,
  ImgWrapper,
  YoutubeWrapper,
  LikeWrapper,
  LikeIcon,
  DisLikeIcon,
} from "../../../../../styles/boardsDetail";
import moment from "moment";
import Image from "next/image";

export default function BoardDetailUI(props) {
  return (
    <Wrapper>
      <Top>
        <ProfileIcon />
        <div>
          <Writer>{props.data?.writer}</Writer>
          <Date>
            Date : {moment(props.data?.updatedAt).format("YYYY-MM-DD")}
          </Date>
        </div>
        <IconWrap>
          <IconShare />
          <IconLocation />
        </IconWrap>
      </Top>
      <Middle>
        <h2>{props.data?.title}</h2>
        {/* {detail?.img && <ImgWrapper></ImgWrapper>} */}
        <div dangerouslySetInnerHTML={{ __html: props.data?.contents }} />
        {/* {detail?.youtubeUrl && <YoutubeWrapper></YoutubeWrapper>} */}
        <LikeWrapper>
          <LikeIcon>1920</LikeIcon> <DisLikeIcon>1920</DisLikeIcon>
        </LikeWrapper>
      </Middle>
    </Wrapper>
  );
}
