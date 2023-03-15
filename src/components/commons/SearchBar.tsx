import { ApolloQueryResult, OperationVariables } from "@apollo/client";
import { Input } from "antd";
import { IQuery } from "../../commons/types/generated/types";

const { Search } = Input;
interface ISearchBarProps {
  refetchSearchList: (
    variables?: Partial<OperationVariables>
  ) => Promise<ApolloQueryResult<Pick<IQuery, "fetchBoards">>>;
  refetchSearchCount: (
    variables?: Partial<OperationVariables>
  ) => Promise<ApolloQueryResult<Pick<IQuery, "fetchBoardsCount">>>;
}

const SearchBar = (props: ISearchBarProps) => {
  const { refetchSearchList, refetchSearchCount } = props;
  const onSearch = (search: string) => {
    refetchSearchList({ search, page: 1 });
    refetchSearchCount({ search });
  };
  return (
    <Search
      placeholder="제목을 입력해주세요."
      enterButton="검색하기"
      onSearch={onSearch}
      style={{ width: "100%" }}
    />
  );
};

export default SearchBar;
