import BoardListUI from "./BoardList.presenter";
import { useRouter } from "next/router";
import {useEffect,useState} from "react"
import { useQuery } from "@apollo/client";
import { FETCH_BOARDS } from "./BoardList.queries";
import moment from "moment";


export default function BoardList() {
  const router = useRouter();
  const { data } = useQuery(FETCH_BOARDS, {
    variables: {
      page: 1,
    },
  });
  const [reverse,setReverse] = useState([])
  const boardData = reverse?.map((i,idx)=>({
    number:idx + 1,
    writer:i.writer,
    title:i.title,
    id:i._id,
    updatedAt:moment(i.updatedAt).format("YYYY-MM-DD")
  }))
  boardData.reverse()

  const onGoDetail =(event)=>{
    router.push(`/boards/${event.target.id}`);
  }
  useEffect(() => {
    if(data?.fetchBoards){
      setReverse([...data.fetchBoards].reverse());  
    }
  }, [data?.fetchBoards]);

  return <BoardListUI onGoDetail={onGoDetail} data={boardData && boardData} />;
}
