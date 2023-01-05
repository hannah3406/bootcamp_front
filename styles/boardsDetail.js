import styled from "@emotion/styled";
import ICON_SHARE from "/public/icon/icon_share.png";
import ICON_LOCATION from "/public/icon/icon_location.png";

export const Wrapper = styled.div`
  width: 1200px;
  padding: 60px 102px 80px;
  margin: 0 auto;
  margin-top: 100px;
  background: #ffffff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  font-family: "Noto Sans CJK KR";
  font-style: normal;
`;
export const Top = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid #bdbdbd;
  position: relative;
  box-sizing: border-box;
`;
export const ProfileIcon = styled.div`
  box-sizing: border-box;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background-color: #bdbdbd;
  margin: 0 16px 0 4px;
`;
export const Writer = styled.div`
  font-weight: 500;
  font-size: 24px;
  line-height: 35px;
`;
export const Date = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #828282;
`;
export const IconWrap = styled.div`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const IconShare = styled.div`
  width: 27px;
  height: 13px;
  margin-right: 29px;
  background-size: 100% 100%;
  background-image: url(${ICON_SHARE});
`;
export const IconLocation = styled.div`
  width: 19px;
  height: 27px;
  background-size: contain%;
  background-image: url(${ICON_LOCATION});
`;
