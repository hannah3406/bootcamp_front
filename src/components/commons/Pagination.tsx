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
}

export default function PaginationComponents(
  props: IPaginationComponentsProps
) {
  const { setCurrentPage, refetch, lastPage } = props;
  const handlePage = (e: React.ChangeEvent<HTMLButtonElement>) => {
    setCurrentPage(Number(e.target.outerText));
    refetch({ page: Number(e.target.outerText) });
  };
  return (
    <Pagination
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
