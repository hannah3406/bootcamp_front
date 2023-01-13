import styled from "@emotion/styled";
import ICON_SHARE from "/public/icon/icon_share.png";
import ICON_LOCATION from "/public/icon/icon_location.png";
import ICON_LIKE from "/public/icon/icon_like.png";
import ICON_DISLIKE from "/public/icon/icon_dislike.png";

export const Wrapper = styled.div`
  text-align: center;
`;
export const DetailWrapper = styled.div`
  padding: 60px 102px 80px;
  margin-top: 100px;
  margin-bottom: 100px;
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
  width: 32px;
  height: 32px;
  margin-right: 20px;
  background-size: 100% 100%;
  background-image: url(${ICON_SHARE});
`;
export const IconLocation = styled.div`
  width: 32px;
  height: 32px;
  background-size: contain%;
  background-image: url(${ICON_LOCATION});
`;
export const Middle = styled.div`
  padding-top: 80px;
  > h2 {
    font-family: "Noto Sans CJK KR";
    font-style: normal;
    font-weight: 700;
    font-size: 36px;
    line-height: 53px;
    color: #000000;
  }
`;
export const ImgWrapper = styled.div`
  margin: 40px 0;
`;
export const ContentsWrapper = styled.div`
  font-family: "Noto Sans CJK KR";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #000000;
`;
export const YoutubeWrapper = styled.div`
  margin: 120px 0;
`;
export const LikeWrapper = styled.div`
  width: 100%;
  text-align: center;
  padding-top: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const LikeIcon = styled.div`
  position: relative;
  font-family: "Noto Sans CJK KR";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 27px;
  text-align: center;
  color: #ffd600;
  margin-right: 40px;
  padding-top: 22px;
  &:after {
    content: "";
    width: 20px;
    height: 18px;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    background: url(${ICON_LIKE}) no-repeat center center;
    background-size: 100% 100%;
  }
`;
export const DisLikeIcon = styled.div`
  position: relative;
  font-family: "Noto Sans CJK KR";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 27px;
  text-align: center;
  color: #828282;
  padding-top: 22px;
  &:after {
    content: "";
    width: 20px;
    height: 18px;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    background: url(${ICON_DISLIKE}) no-repeat center center;
    background-size: 100% 100%;
  }
`;
