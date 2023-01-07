import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import BoardWriteUI from "./BoardWrite.persenter";
import {CREATE_BOARD} from "./BoardWrite.queries"


export default function BoardWrite() {
  const [createBoard] = useMutation(CREATE_BOARD);
  const router = useRouter();

  // const [data, setData] = useState("");
  const onSubmit = async (data) => {
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
    alert("게시물 등록이 완료되었습니다.");
    router.push(`/boards/${result.data.createBoard._id}`);
  };

  const onError = (errors, e) => console.log(errors, e);
  return <BoardWriteUI onSubmit={onSubmit} onError={onError} />;
}
