import styled from "@emotion/styled";
import ICON_EDIT from "/public/icon/icon_edit.png";
import ICON_CANCEL from "/public/icon/icon_cancel.png";

export const Wrapper = styled.div`
  position: relative;
  padding: 20px 0;
  border-bottom: 1px solid #bdbdbd;
  display: flex;
  justify-content: flex-start;
  align-items: top;
`;

export const ProfileImage = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 100%;
  background-color: #bdbdbd;
  margin-right: 12px;
`;
export const UserName = styled.div`
  font-family: "Noto Sans CJK KR";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #000000;
`;
export const Rate = styled.div`
  margin-left: 16px;
  display: inline-block;
`;
export const Contetns = styled.div`
  margin: 4px 0 20px 0;
  font-family: "Noto Sans CJK KR";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #4f4f4f;
`;
export const Date = styled.div`
  font-family: "Noto Sans CJK KR";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: #bdbdbd;
`;
export const ButtonWrap = styled.div`
  position: absolute;
  top: 20px;
  right: 0;
`;
export const ButtonEdit = styled.div`
  display: inline-block;
  width: 24px;
  height: 24px;
  margin-right: 5px;
  background-size: 100% 100%;
  background-image: url(${ICON_EDIT});
  cursor: pointer;
`;
export const ButtonCancle = styled.div`
  display: inline-block;
  width: 24px;
  height: 24px;
  background-size: 100% 100%;
  background-image: url(${ICON_CANCEL});
  cursor: pointer;
`;
