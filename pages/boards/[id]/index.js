import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

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
} from "../../../styles/boardsDetail";
import moment from "moment";
import Image from "next/image";

const FETCH_BOARD = gql`
  query fetchBoard($id: ID!) {
    fetchBoard(boardId: $id) {
      writer
      title
      contents
      updatedAt
    }
  }
`;

export default function Detail() {
  const router = useRouter();
  const [detail, setDetail] = useState({});
  const { data } = useQuery(FETCH_BOARD, {
    variables: {
      id: router.query.id,
    },
  });
  useEffect(() => {
    if (data) {
      setDetail({
        writer: data.fetchBoard.writer,
        title: data.fetchBoard.title,
        contents: data.fetchBoard.contents,
        updatedAt: data.fetchBoard.updatedAt,
      });
    }
  }, [data]);

  return (
    <Wrapper>
      <Top>
        <ProfileIcon />
        <div>
          <Writer>{detail?.writer}</Writer>
          <Date> Date : {moment(detail?.updatedAt).format("YYYY-MM-DD")}</Date>
        </div>
        <IconWrap>
          <IconShare />
          <IconLocation />
        </IconWrap>
      </Top>
      <Middle>
        <h2>{detail?.title}</h2>
        {/* {detail?.img && <ImgWrapper></ImgWrapper>} */}
        <div dangerouslySetInnerHTML={{ __html: detail?.contents }} />
        {/* {detail?.youtubeUrl && <YoutubeWrapper></YoutubeWrapper>} */}
        <LikeWrapper>
          <LikeIcon>1920</LikeIcon> <DisLikeIcon>1920</DisLikeIcon>
        </LikeWrapper>
      </Middle>
    </Wrapper>
  );
}
