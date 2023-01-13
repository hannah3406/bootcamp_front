import * as S from "./BoardCommentWrite.styles";
import { Form, Input, Rate } from "antd";
import { useEffect, useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { ICommentListEl } from "../list/BoardCommentList.container";
import { FetchResult } from "@apollo/client";

const { TextArea } = Input;

interface IBoardCommentWriteProps {
  onSubmitValue: (
    values: ICommentListEl
  ) => Promise<void | FetchResult<
    any,
    Record<string, any>,
    Record<string, any>
  >>;
  isEdit: boolean;
  editData?: ICommentListEl;
}
export default function BoardCommentWriteUI(props: IBoardCommentWriteProps) {
  const { onSubmitValue, isEdit, editData } = props;

  const [propsRating, setPropsRating] = useState<number>(
    !!editData ? editData.rating : 0
  );
  useEffect(() => {
    if (!!editData?.rating) setPropsRating(editData?.rating);
  }, [editData]);
  return (
    <S.Wrapper isEdit={isEdit}>
      {!isEdit && <S.Title>댓글</S.Title>}
      <Form
        onFinish={onSubmitValue}
        initialValues={{
          contents: !!editData ? editData.contents : "",
          writer: !!editData ? editData.writer : "",
        }}
      >
        <Form.Item
          style={{
            display: "inline-block",
          }}
          name="writer"
        >
          <Input placeholder="작성자" disabled={isEdit} />
        </Form.Item>
        <Form.Item
          name="password"
          style={{
            display: "inline-block",
          }}
        >
          <Input type="password" placeholder="비밀번호" />
        </Form.Item>
        <Form.Item
          name="rating"
          style={{
            display: "inline-block",
            marginBottom: "0 !important",
            verticalAlign: "unset",
          }}
        >
          <Rate
            onChange={setPropsRating}
            defaultValue={propsRating}
            allowHalf
          />
        </Form.Item>
        <div style={{ position: "relative" }}>
          <Form.Item name="contents">
            <TextArea
              showCount
              autoSize={{ minRows: 2 }}
              maxLength={100}
              placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
            />
          </Form.Item>
          <Form.Item
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              marginBottom: "0 !important",
            }}
          >
            <S.Submitbtn type="submit" value="등록하기" />
          </Form.Item>
        </div>
      </Form>
    </S.Wrapper>
  );
}