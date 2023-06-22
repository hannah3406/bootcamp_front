import { ApolloQueryResult, OperationVariables } from "@apollo/client";
import { Input } from "antd";
import { IQuery } from "../../commons/types/generated/types";

const { Search } = Input;
interface ISearchBarProps {
  onSearch: (search: string) => void;
}

const SearchBar = (props: ISearchBarProps) => {
  const { onSearch } = props;
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
