import * as S from "./BoardCommentList.styles";
import { Rate } from "antd";
import moment from "moment";
import { useState } from "react";
import { ICommentListEl } from "./BoardCommentList.container";
import BoardCommentWrite from "../write/BoardCommentWrite.container";
interface IBoardCommentListProps {
  data: ICommentListEl;
}
export default function BoardCommentListUI(props: IBoardCommentListProps) {
  const { data } = props;
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const onClickEdit = (e) => {
    setIsEdit(true);
  };
  return (
    <>
      <S.Wrapper>
        <S.ProfileImage onClick={onClickEdit} />
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
      </S.Wrapper>
      {isEdit && !!data && (
        <BoardCommentWrite isEdit={isEdit} editData={data} />
      )}
    </>
  );
}
