import * as S from "./BoardCommentList.styles";
import { Button, Input, Popover, Rate } from "antd";
import moment from "moment";
import { ICommentListEl } from "./BoardCommentList.container";
import BoardCommentWrite from "../write/BoardCommentWrite.container";
interface IBoardCommentListProps {
  data: ICommentListEl;
  onDeleteBoard: (deleteData: {
    id: string;
    password: string;
  }) => Promise<void>;
  passwordValue: string;
  isEdit: boolean;
  onChangeValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickEdit: () => void;
}
export default function BoardCommentListUI(props: IBoardCommentListProps) {
  const {
    data,
    onDeleteBoard,
    onChangeValue,
    onClickEdit,
    passwordValue,
    isEdit,
  } = props;

  const content = (
    <div>
      <p>비밀번호를 입력해주세요.</p>
      <Input type="password" value={passwordValue} onChange={onChangeValue} />
      <Button
        onClick={() => onDeleteBoard({ id: data._id, password: passwordValue })}
      >
        삭제
      </Button>
    </div>
  );
  return (
    <>
      {isEdit && !!data ? (
        <BoardCommentWrite isEdit={isEdit} editData={data} />
      ) : (
        <S.Wrapper>
          <S.ProfileImage />
          <div>
            <S.UserName>
              {data.writer}
              <S.Rate>
                <Rate disabled defaultValue={data.rating} />
              </S.Rate>
            </S.UserName>
            <S.Contetns>{data.contents}</S.Contetns>
            <S.Date>{moment(data.updatedAt).format("YYYY-MM-DD")}</S.Date>
          </div>
          <S.ButtonWrap>
            <S.ButtonEdit onClick={onClickEdit} />

            <Popover content={content} title="Title" trigger="click">
              <S.ButtonCancle />
            </Popover>
          </S.ButtonWrap>
        </S.Wrapper>
      )}
    </>
  );
}
