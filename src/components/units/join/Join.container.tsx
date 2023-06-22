import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import {
  IMutation,
  IMutationCreateUserArgs,
} from "../../../commons/types/generated/types";
import { CREATE_USER } from "../../../queries/User.queries";
import { ICreateUserData } from "../../../types/User.types";
import JoinUI from "./Join.presenter";

export default function Join() {
  const router = useRouter();
  const [createUser] = useMutation<
    Pick<IMutation, "createUser">,
    IMutationCreateUserArgs
  >(CREATE_USER);

  const onSubmit = async (data: ICreateUserData) => {
    const { name, email, password } = data;
    const result = await createUser({
      variables: {
        createUserInput: {
          name,
          email,
          password,
        },
      },
    });
    console.log(data, result);
    alert("회원가입이 완료되었습니다. 로그인해주세요!");
    router.push(`/login`);
  };
  return <JoinUI onSubmit={onSubmit} />;
}
