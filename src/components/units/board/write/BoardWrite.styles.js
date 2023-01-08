import styled from "@emotion/styled";

export const Wrapper = styled.div`
  width: 1200px;
  padding: 60px 102px 100px;
  margin: 0 auto;
  margin-top: 100px;
  background: #ffffff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;

  > h2 {
    font-family: "Noto Sans CJK KR";
    font-style: normal;
    font-weight: 700;
    font-size: 36px;
    line-height: 53px;
    text-align: center;
    padding-bottom: 80px;
  }
  button {
    padding: 14px 16px;
    font-family: "Noto Sans CJK KR";
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    background: #000;
    color: #fff;
    border: none;
  }
`;
export const Label = styled.div`
  font-family: "Noto Sans CJK KR";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  position: relative;

  &.label_half {
    display: inline-block;
    width: 486px;
  }
  &.first {
    margin-right: 24px;
  }
`;
export const Input = styled.input`
  box-sizing: border-box;
  margin-top: 16px;
  margin-bottom: 40px;
  background: #ffffff;
  border: 1px solid #bdbdbd;
  padding: 14px 16px;
  width: 100%;
  color: #000;
  font-family: "Noto Sans CJK KR";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  &::placeholder {
    color: #c4c4c4;
    font-family: "Noto Sans CJK KR";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
  }
  &.postcode {
    width: 77px;
    margin-right: 16px;
    margin-bottom: 16px;
  }
`;
export const Textarea = styled.textarea`
  width: 100%;
  height: 480px;
  box-sizing: border-box;
  padding: 14px 16px;
  background: #ffffff;
  border: 1px solid #bdbdbd;
  margin: 16px 0;
  resize: none;
  color: #000;
  font-family: "Noto Sans CJK KR";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 40px;
  &::placeholder {
    color: #c4c4c4;
    font-family: "Noto Sans CJK KR";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
  }
`;
export const ImgUploader = styled.div`
  box-sizing: border-box;
  width: 78px;
  height: 78px;
  background: #bdbdbd;
  display: inline-block;
  margin-right: 24px;
  margin-bottom: 30px;
  text-align: center;
  > button {
    background: none !important;
    font-family: "Noto Sans CJK KR";
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;
    color: #4f4f4f;
    padding: 0;
    margin: 0;
    display: inline-block;
    width: 100%;
    height: 100%;
    padding: 42px 18px 18px 18px;
    position: relative;
    &:after {
      content: "";
      width: 14px;
      height: 2px;
      background: #4f4f4f;
      position: absolute;
      top: 29px;
      left: 50%;
      transform: translateX(-50%);
    }
    &:before {
      content: "";
      height: 14px;
      width: 2px;
      background: #4f4f4f;
      position: absolute;
      top: 23px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;
export const InputRadio = styled.div`
  > input[type="radio"] {
    vertical-align: middle;
    --webkit-appearance: none;
    --moz-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 100%;
    background: #fff;
    border: 1px solid #000;
    margin: 0;
    margin-right: 10px;
  }
  > input[type="radio"]:checked {
    vertical-align: middle;
    --webkit-appearance: none;
    --moz-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 100%;
    background: #fff;
    border: 1px solid #ffd600;
    margin: 0;
    margin-right: 10px;
    padding: 4px;
    position: relative;
    &:after {
      content: "";
      width: 12px;
      height: 12px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #ffd600;
      border-radius: 100%;
    }
  }
`;
export const Submit = styled.input`
  border: none;
  display: inline-block;
  background:${(props) => (props.activeColor ? '#ffd600 !important' : '#ddd')};
  font-family: "Noto Sans CJK KR";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #000000;
  padding: 14px 60px;
  margin: 0 auto;
  margin-top: 94px;
  cursor: pointer;
`;

export const Error = styled.small`
  position: absolute;
  left: 0;
  bottom: 10px;
  color: red;
`;
