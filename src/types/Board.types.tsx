import { FetchResult } from "@apollo/client/link/core/types";

//boardList
export interface IBoardListUIProps {
  data: any[];
  onGoDetail: (id: any) => void;
}

//boardWrite
export interface IBoardWriteMyVariables {
  title?: string;
  contents?: string;
}
export interface IBoardWriteUIProps {
  onSubmit: (data: any, editData: any) => Promise<void>;
  onError: (errors: any, e: any) => void;
  isEdit: boolean;
  editData?: any;
  form?: any;
}

//boardCommentList
export interface IBoardCommentListProps {
  refetch: () => void;
  list: any;
}
export interface IBoardCommentListUIProps {
  data: any;
  onDeleteBoard: (deleteData: {
    id: string;
    password: string;
  }) => Promise<void>;
  passwordValue: string;
  isEdit: boolean;
  onChangeValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickEdit: () => void;
  refetch: () => void;
}

//boardCommentwrite
export interface IBoardCommentWriteProps {
  isEdit: boolean;
  editData?: any;
  refetch: () => void;
}
export interface ImyVariables {
  rating?: number;
  contents?: string;
}
export interface IBoardCommentWriteUIProps {
  onSubmitValue: (
    values: any
  ) => Promise<void | FetchResult<
    any,
    Record<string, any>,
    Record<string, any>
  >>;
  isEdit: boolean;
  editData?: any;
  form: any;
}
