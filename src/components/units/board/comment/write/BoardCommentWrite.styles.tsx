import styled from "@emotion/styled";
import ICON_COMMENT from "/public/icon/icon_comment.png";
interface IBoardCommentWriteUIProps {
  isEdit: boolean;
}
export const Wrapper = styled.div`
box-sizing: border-box;
  width: 1200px;
  padding: 20px 0;
  margin-top:${(props: IBoardCommentWriteUIProps) =>
    props.isEdit ? "0px;" : "87px;"}
  border-top:${(props: IBoardCommentWriteUIProps) =>
    props.isEdit ? "0px;" : "1px solid #bdbdbd;"}
  .ant-form-item{
    margin-bottom:0px !important;
    vertical-align:unset !important;
  }
  .ant-input {
    box-sizing: border-box;
    width: 180px;
    padding: 14px 20px;
    color: #4f4f4f;
    font-size: 16px;
    border-radius: 0;
    display: inline-block;
    margin-right: 24px;
    border-color: #bdbdbd;
  }
  .ant-input-textarea {
    box-sizing: border-box;
    position:relative !important;
    padding: 0 !important;
    padding-bottom:52px !important;
    margin: 0 !important;
    margin-top: 20px !important;
    border:1px solid #bdbdbd !important;

    .ant-input {
      box-sizing: border-box;
      resize: none !important;
      width: 100% !important;1
      border-radius: 0;
      border:none !important;
      border-bottom:1px solid #F2F2F2 !important;
    }
    &:after{
      box-sizing: border-box;
      float:left !important;
      position: absolute !important;
      bottom: 14px !important;
      left: 20px !important;
      font-family: 'Noto Sans CJK KR';
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;     
      color: #BDBDBD;
    }
  }
`;

export const Title = styled.div`
  padding: 20px 34px;
  font-family: "Noto Sans CJK KR";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 27px;
  color: #000000;
  position: relative;
  box-sizing: border-box;
  &:after {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    background-size: 100% 100%;
    background-image: url(${ICON_COMMENT});
  }
`;

export const Submitbtn = styled.input`
  height: 52px;
  background:${(props: IBoardCommentWriteUIProps) =>
    props.isEdit ? "#FFD600;" : "#000;"}
  font-family: "Noto Sans CJK KR";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: #ffffff;
  box-sizing: border-box;
  padding: 0 19px;
  cursor: pointer;
  border:none !important;
`;
