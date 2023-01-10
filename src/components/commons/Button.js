import styled from "@emotion/styled";

export default function Button(props) {
  const { onClick, text } = props;
  return <BtnStyled onClick={onClick}>{text}</BtnStyled>;
}

const BtnStyled = styled.div`
  width: 179px;
  background: #ffffff;
  box-sizing: border-box;
  border: 1px solid #bdbdbd;
  text-align: center;
  padding: 10px 0;
  font-family: "Noto Sans CJK KR";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: #000000;
  display: inline-block;
  margin-right: 24px;
  cursor: pointer;
`;
