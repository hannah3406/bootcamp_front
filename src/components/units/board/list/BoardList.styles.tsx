import styled from "@emotion/styled";

export const BoardListWrapper = styled.div`
  width: 70%;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  margin: 0 auto;
  margin-top: 40px;
  margin-bottom: 60px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 14px 0;
  font-family: "Noto Sans CJK KR";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 27px;
  text-align: center;
  color: #000000;
`;
export const Number = styled.div`
  width: 10%;
`;
export const Title = styled.div`
  width: 60%;
  cursor: pointer;
`;
export const Writer = styled.div`
  width: 15%;
`;
export const Date = styled.div`
  width: 15%;
`;

export const Body = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 14px 0;
  border-top: 1px solid #bdbdbd;
  font-family: "Noto Sans CJK KR";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: #4f4f4f;
  transition: 0.3s;

  &:hover {
    color: #ffd600;
    transition: 0.3s;
  }
`;
