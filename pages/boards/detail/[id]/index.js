import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import {
  Wrapper,
  Top,
  ProfileIcon,
  Writer,
  Date,
  IconWrap,
  IconShare,
  IconLocation,
} from "../../../../styles/boardsDetail";
import moment from "moment";

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
  console.log(data);

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
      <>
        <h2>{detail?.title}</h2>
        <div>{detail?.contents}</div>
        <div>
          <div>1920</div> <div>1920</div>
        </div>
      </>
    </Wrapper>
  );
}
