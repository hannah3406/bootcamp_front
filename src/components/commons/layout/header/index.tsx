import styled from "@emotion/styled";
import { useRouter } from "next/router";
import LOGO from "/public/icon/logo.png";

export default function Header() {
  const router = useRouter();
  return (
    <Wrapper>
      <Logo className="btn" />
      <RightArea>
        <Login className="btn" onClick={() => router.push(`/login`)}>
          로그인
        </Login>
        <Join className="btn" onClick={() => router.push(`/join`)}>
          회원가입
        </Join>
      </RightArea>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  box-sizing: border-box;
  width: 1200px;
  margin: 0 auto;
  padding: 52px 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const RightArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Login = styled.div`
  margin-right: 20px;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: #000000;
`;
const Join = styled.div`
  padding: 10px 16px;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: #000000;
  background: #ffd600;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;
const Logo = styled.div`
  width: 236px;
  height: 36px;
  background-size: contain%;
  background-image: url(${LOGO});
`;
