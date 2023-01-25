import styled from "@emotion/styled";

export default function Navigation() {
  return (
    <Wrapper>
      <BtnWrap>
        <Btn className="btn">자유게시판</Btn>
        <Btn className="center btn">중고마켓</Btn>
        <Btn className="btn">마이페이지</Btn>
      </BtnWrap>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: #ffd800;
  padding: 18px 0;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.15);
`;
const BtnWrap = styled.div`
  width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Btn = styled.div`
  font-weight: 700;
  font-size: 18px;
  line-height: 27px;
  text-align: center;
  color: #514400;
  padding: 0 40px;
  &.center {
    position: relative;
    &:after {
      content: "";
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 0;
      width: 1px;
      height: 22px;
      background: #fff;
    }
    &:before {
      content: "";
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 0;
      width: 1px;
      height: 22px;
      background: #fff;
    }
  }
`;
