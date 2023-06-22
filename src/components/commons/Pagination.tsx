import React, { Dispatch, SetStateAction } from "react";
import Pagination from "@mui/material/Pagination";
import { ApolloQueryResult, OperationVariables } from "@apollo/client";
import { IQuery } from "../../commons/types/generated/types";

interface IPaginationComponentsProps {
  setCurrentPage?: Dispatch<SetStateAction<number>>;
  refetch: (
    variables?: Partial<OperationVariables>
  ) => Promise<ApolloQueryResult<Pick<IQuery, "fetchBoards">>>;
  lastPage: number;
  currentPage: number;
  search: string;
}
interface Tquery {
  page?: number;
  search?: string;
}
export default function PaginationComponents(
  props: IPaginationComponentsProps
) {
  const { setCurrentPage, refetch, lastPage, search, currentPage } = props;
  const handlePage = (e: React.ChangeEvent<HTMLButtonElement>) => {
    const query: Tquery = {
      page: Number(e.target.outerText),
    };
    if (search) query.search = search;
    setCurrentPage(query.page);
    refetch(query);
  };
  return (
    <Pagination
      page={currentPage}
      count={lastPage}
      defaultPage={1}
      boundaryCount={2}
      color="primary"
      size="large"
      sx={{ margin: 2 }}
      onChange={handlePage}
    />
  );
}
