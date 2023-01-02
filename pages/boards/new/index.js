import { useForm } from "react-hook-form";
import React, { useState } from "react";
import {
  Wrapper,
  Label,
  Input,
  Textarea,
  ImgUploader,
  InputRadio,
  Submit,
} from "../../../styles/emotion";

export default function New() {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");

  return (
    <Wrapper>
      <h2>게시물 등록</h2>
      <form onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}>
        <Label className="label_half first">
          작성자
          <Input {...register("name")} placeholder="이름을 적어주세요" />
        </Label>
        <Label className="label label_half">
          비밀번호
          <Input
            type="password"
            {...register("password")}
            placeholder="비밀번호를 입력해주세요."
          />
        </Label>
        <Label className="label">
          제목
          <Input {...register("title")} placeholder="제목을 작성해주세요." />
        </Label>
        <Label className="label">
          내용
          <Textarea
            {...register("content")}
            placeholder="내용을 작성해주세요."
          />
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
        {data}
      </form>
    </Wrapper>
  );
}
