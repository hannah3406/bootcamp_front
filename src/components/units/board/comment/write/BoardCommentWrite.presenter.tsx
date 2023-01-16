import * as S from "./BoardCommentWrite.styles";
import { Form, Input, Rate } from "antd";
import { IBoardCommentWriteUIProps } from "../../../../../types/Board.types";

const { TextArea } = Input;

export default function BoardCommentWriteUI(props: IBoardCommentWriteUIProps) {
  const { onSubmitValue, isEdit, editData, form } = props;

  return (
    <S.Wrapper isEdit={isEdit}>
      {!isEdit && <S.Title>댓글</S.Title>}
      <Form
        form={form}
        onFinish={(values) => {
          onSubmitValue(values);
          form.resetFields();
        }}
        initialValues={{
          contents: !!editData ? editData.contents : "",
          writer: !!editData ? editData.writer : "",
          rating: !!editData ? editData.rating : 0,
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
          }}
        >
          <Rate allowHalf />
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
            }}
          >
            <S.Submitbtn
              isEdit={isEdit}
              type="submit"
              value={isEdit ? "수정하기" : "등록하기"}
            />
          </Form.Item>
        </div>
      </Form>
    </S.Wrapper>
  );
}
