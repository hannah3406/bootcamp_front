import { useForm } from "react-hook-form";
import { useMutation, gql } from "@apollo/client";

import {
  Wrapper,
  Label,
  Input,
  Textarea,
  ImgUploader,
  InputRadio,
  Submit,
  Error,
} from "../../../styles/boardsNew";

const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
    }
  }
`;

export default function New() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const [createBoard] = useMutation(CREATE_BOARD);

  // const [data, setData] = useState("");
  const onSubmit = async (data, e) => {
    if (data) {
      // key 와 value 가 같은 경우, writer : data.writer 가 아니라 writer 이라고만 써도 무방하다. (shorthand-property)
      const result = await createBoard({
        variables: {
          createBoardInput: {
            writer: data.writer,
            password: data.password,
            title: data.title,
            contents: data.contents,
          },
        },
      });
      console.log(result);
    }
  };
  const onError = (errors, e) => console.log(errors, e);

  return (
    <Wrapper>
      <h2>게시물 등록</h2>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <Label className="label_half first">
          작성자
          <Input
            {...register("writer", {
              required: "닉네임을 입력해주세요.",
              pattern: {
                value:
                  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                message: "@을 포함한 이메일 형식으로 작성해주세요",
              },
            })}
            placeholder="이름을 적어주세요"
          />
          {<Error>{errors.writer?.message}</Error>}
        </Label>
        <Label className="label label_half">
          비밀번호
          <Input
            type="password"
            {...register("password", {
              required: "비밀번호를 입력해주세요.",
              pattern: {
                value: /^.{8,}$/,
                message: "8글자 이상으로 입력해주세요.",
              },
            })}
            placeholder="비밀번호를 입력해주세요."
          />
          {<Error>{errors.password?.message}</Error>}
        </Label>
        <Label className="label">
          제목
          <Input
            {...register("title", {
              required: "제목을 작성해주세요.",
            })}
            placeholder="제목을 작성해주세요."
          />
          {<Error>{errors.title?.message}</Error>}
        </Label>
        <Label className="label">
          내용
          <Textarea
            {...register("contents", {
              required: "내용을 작성해주세요.",
            })}
            placeholder="내용을 작성해주세요."
          />
          {<Error>{errors.contents?.message}</Error>}
        </Label>
        <Label className="label">
          주소
          <div>
            <Input className="postcode" {...register("postcode")} />
            <button>우편번호 검색</button>
          </div>
          <Input
            style={{
              marginBottom: `30px !important`,
              marginTop: `0px !important`,
            }}
            {...register("address1")}
          />
          <Input
            {...register("address2")}
            style={{
              marginBottom: `37px !important`,
              marginTop: `0px !important`,
            }}
          />
        </Label>
        <Label className="label">
          유튜브
          <Input {...register("youtube")} placeholder="링크를 복사해주세요." />
        </Label>
        <Label className="label">
          사진 첨부
          <div style={{ marginTop: 16 }}>
            {[1, 2, 3].map((i) => {
              return (
                <ImgUploader key={i} {...register(`imgSrc${i}`)}>
                  <button>upload</button>
                </ImgUploader>
              );
            })}
          </div>
        </Label>
        <Label className="label">
          메인 설정
          <InputRadio style={{ marginTop: 16 }}>
            <input type="radio" {...register("mainset")} value="youtube" />
            유튜브
            <input
              style={{ marginLeft: 22 }}
              type="radio"
              {...register("mainset")}
              value="photo"
            />
            사진
          </InputRadio>
        </Label>
        <div style={{ textAlign: "center" }}>
          <Submit type="submit" value="등록하기" />
        </div>
      </form>
    </Wrapper>
  );
}
