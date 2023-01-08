import * as S from "./BoardWrite.styles";
import { useForm } from "react-hook-form";

export default function BoardWriteUI(props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors  },
  } = useForm({ mode: "onChange",
  defaultValues: { writer: null, password: null, title: null, contents: null }, });
  const {onSubmit,onError}=props
  const isValid = !watch(["writer", "password","title","contents"]).includes(null);
  console.log(isValid)
  return (
    <S.Wrapper>
      <h2>게시물 등록</h2>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <S.Label className="label_half first">
          작성자
          <S.Input
            {...register("writer", {
              required: "닉네임을 입력해주세요.",
              // pattern: {
              //   value:
              //     /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
              //   message: "@을 포함한 이메일 형식으로 작성해주세요",
              // },
            })}
            placeholder="이름을 적어주세요"
          />
          {<S.Error>{errors.writer?.message}</S.Error>}
        </S.Label>
        <S.Label className="label label_half">
          비밀번호
          <S.Input
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
          {<S.Error>{errors.password?.message}</S.Error>}
        </S.Label>
        <S.Label className="label">
          제목
          <S.Input
            {...register("title", {
              required: "제목을 작성해주세요.",
            })}
            placeholder="제목을 작성해주세요."
          />
          {<S.Error>{errors.title?.message}</S.Error>}
        </S.Label>
        <S.Label className="label">
          내용
          <S.Textarea
            {...register("contents", {
              required: "내용을 작성해주세요.",
            })}
            placeholder="내용을 작성해주세요."
          />
          {<S.Error>{errors.contents?.message}</S.Error>}
        </S.Label>
        <S.Label className="label">
          주소
          <div>
            <S.Input className="postcode" {...register("postcode")} />
            <button>우편번호 검색</button>
          </div>
          <S.Input
            style={{
              marginBottom: `30px !important`,
              marginTop: `0px !important`,
            }}
            {...register("address1")}
          />
          <S.Input
            {...register("address2")}
            style={{
              marginBottom: `37px !important`,
              marginTop: `0px !important`,
            }}
          />
        </S.Label>
        <S.Label className="label">
          유튜브
          <S.Input {...register("youtube")} placeholder="링크를 복사해주세요." />
        </S.Label>
        <S.Label className="label">
          사진 첨부
          <div style={{ marginTop: 16 }}>
            {[1, 2, 3].map((i) => {
              return (
                <S.ImgUploader key={i} {...register(`imgSrc${i}`)}>
                  <button>upload</button>
                </S.ImgUploader>
              );
            })}
          </div>
        </S.Label>
        <S.Label className="label">
          메인 설정
          <S.InputRadio style={{ marginTop: 16 }}>
            <input type="radio" {...register("mainset")} value="youtube" />
            유튜브
            <input
              style={{ marginLeft: 22 }}
              type="radio"
              {...register("mainset")}
              value="photo"
            />
            사진
          </S.InputRadio>
        </S.Label>
        <div style={{ textAlign: "center" }}>
          <S.Submit type="submit" value="등록하기" activeColor={isValid} />
        </div>
      </form>
    </S.Wrapper>
  );
}
