import * as S from "./BoardList.styles";

export default function BoardListUI(props) {
  const { data, onGoDetail } = props;

  return (
    <S.BoardListWrapper>
      <S.Header>
        <S.Number>번호</S.Number>
        <S.Title>제목</S.Title>
        <S.Writer>작성자</S.Writer>
        <S.Date>날짜</S.Date>
      </S.Header>
      {data?.map((list) => (
        <S.Body
          id={list.id}
          key={list.number}
          onClick={() => onGoDetail(list.id)}
        >
          <S.Number>{list.number}</S.Number>
          <S.Title>{list.title}</S.Title>
          <S.Writer>{list.writer}</S.Writer>
          <S.Date>{list.updatedAt}</S.Date>
        </S.Body>
      ))}
    </S.BoardListWrapper>
  );
}
