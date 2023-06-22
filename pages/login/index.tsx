import { useMutation } from "@apollo/client";
import styled from "@emotion/styled";
import { Alert, Button, Form, Input } from "antd";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import {
  IMutation,
  IMutationLoginUserArgs,
} from "../../src/commons/types/generated/types";
import { LOGIN_USER } from "../../src/queries/User.queries";
import { accessToken } from "../../src/recoil";
import { ILoginUserData } from "../../src/types/User.types";
export default function Login() {
  const router = useRouter();
  const setAccessToken = useSetRecoilState<string>(accessToken);
  const [loginUser] = useMutation<
    Pick<IMutation, "loginUser">,
    IMutationLoginUserArgs
  >(LOGIN_USER);
  const onFinish = async (values: ILoginUserData) => {
    const { email, password } = values;
    try {
      const result = await loginUser({
        variables: { email, password },
      });
      const accessToken = result.data?.loginUser.accessToken;
      setAccessToken(accessToken);
      localStorage.setItem("accessToken", accessToken);
      void router.push("/");
    } catch (errors) {
      Alert(errors.message);
    }
  };
  return (
    <Wrapper>
      <Form
        name="basic"
        labelCol={{ span: 16 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        autoComplete="off"
        onFinish={onFinish}
      >
        <Text>로그인</Text>
        <Form.Item
          name="email"
          label="이메일"
          rules={[
            {
              type: "email",
              message: "유효한 이메일 형식이 아닙니다.",
            },
            {
              required: true,
              message: "이메일을 입력해주세요!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="비밀번호"
          rules={[{ required: true, message: "비밀번호를 입력해주세요." }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            로그인하기
          </Button>
        </Form.Item>
      </Form>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  padding: 30px 0;
  form {
    margin: 50px auto;
    text-align: center;
    .form-label {
      margin-bottom: 5px;
      display: inline-block;
    }

    .ant-form-item-row {
      display: inline-block;
      width: 450px;
    }
    .ant-form-item-control {
      text-align: left;
      margin: 0 auto;
      font-size: 14px;
    }
    .ant-form-item-label {
      width: 100%;
      text-align: left;
      font-weight: bold;
    }
    .ant-form-item-label label {
      font-size: 14px;
    }
    .ant-input-suffix {
      font-size: 14px;
    }
    .ant-form-item-control-input-content {
      width: 100%;
      > button {
        width: 100%;
        font-weight: bold;
        font-size: 16px;
        height: 40px;
      }
    }
    .ant-input-affix-wrapper {
      padding: 4px 11px;
    }
    input {
      padding: 4px 11px;
    }
  }
`;
const Text = styled.p`
  width: 300;
  margin: 15px auto;
  display: inline-block;
  margin-bottom: 30px;
  text-align: center;
  font-weight: "bold";
`;
