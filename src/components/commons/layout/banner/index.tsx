import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "@emotion/styled";
import BANNER_BG from "/public/icon/banner_bg.png";
import PREV_ICON from "/public/icon/navigate_before.png";
import NEXT_ICON from "/public/icon/navigate_next.png";

export default function Banner() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Wrapper>
      <Slider {...settings}>
        {[0, 1, 2].map((i) => (
          <BannerWrapper key={i}>
            <BannerContentsWrap>
              <BannerContents>
                <Title>CAROUSEL DESIGN</Title>
                <Content>
                  캐러셀은 이미지 로테이터, 슬라이더 등 다양한 이름으로 불리는데
                  같은 공간에 하나 이상의 콘텐츠를 보여주며, 한 번에 하나씩만
                  보이고 각각은 이미지와 약간의 텍스트로 구성되어있다고 합니다.
                </Content>
              </BannerContents>
            </BannerContentsWrap>
          </BannerWrapper>
        ))}
      </Slider>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  .slick-prev {
    left: 360px;
    width: 48px !important;
    height: 48px !important;
    z-index: 10;
    &:before {
      display: inline-block;
      opacity: 1;
      width: 48px !important;
      height: 48px !important;
      border-radius: 100%;
      background-size: 100% 100%;
      background-image: url(${PREV_ICON});
    }
  }
  .slick-next {
    right: 360px;
    width: 48px !important;
    height: 48px !important;
    z-index: 10;
    &:before {
      display: inline-block;
      opacity: 1;
      width: 48px !important;
      height: 48px !important;
      border-radius: 100%;
      background-size: 100% 100%;
      background-image: url(${NEXT_ICON});
    }
  }
  .slick-dots {
    bottom: 32px !important;
    li {
      button {
        &:before {
          color: #fff !important;
        }
      }
    }
  }
`;
const BannerWrapper = styled.div`
  height: 400px;
  background-size: cover;
  background-image: url(${BANNER_BG});
  .slick-dots {
    bottom: 32px !important;
  }
`;
const BannerContentsWrap = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BannerContents = styled.div`
  width: 1200px;
  margin: 0 auto;
  text-align: center;
  color: #fff;
`;
const Title = styled.div`
  font-weight: 700;
  font-size: 48px;
  line-height: 71px;
  text-align: center;
  text-transform: uppercase;
  color: #ffffff;
  padding-bottom: 32px;
`;
const Content = styled.div`
  width: 400px;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  text-align: center;
  text-transform: uppercase;
  color: #ffffff;
  display: inline-block;
`;
