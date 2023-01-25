import { Address } from "react-daum-postcode";
import { IQuery } from "../commons/types/generated/types";

// 게시글 목록 데이터
export interface IBoardListData {
  number: number;
  writer: string;
  title: string;
  id: string;
  updatedAt: string;
}
// 게시글 쓰기 데이터
export interface IBoardWriteData {
  youtubeUrl?: string;
  addressDetail?: string;
  address?: string;
  zipcode?: string;
  password?: string;
  writer?: string;
  title: string;
  contents: string;
}
// 게시글 댓글 쓰기 데이터
export interface IBoardCommentWriteCreateData {
  password: string;
  writer: string;
  title: string;
  rating: number;
  contents: string;
}

// boardList
export interface IBoardListUIProps {
  data: IBoardListData[];
  onGoDetail: (id: string) => void;
}

// boardWrite
export interface IBoardWriteProps {
  isEdit: boolean;
  editData?: Pick<IQuery, "fetchBoard">;
}
export interface IBoardWriteMyVariables {
  youtubeUrl?: string;
  addressDetail?: string;
  address?: string;
  zipcode?: string;
  title?: string;
  contents?: string;
}
export interface IBoardWriteUIProps {
  onSubmit: (data: IBoardWriteData) => Promise<JSX.Element>;
  onError: (errors: any, e: any) => void;
  isEdit: boolean;
  editData?: Pick<IQuery, "fetchBoard">;
  form?: any;
  isOpen?: boolean;
  address?: string;
  zipcode?: string;
  handleComplete: (address: Address) => void[];
  onToggleModal: (e: React.FormEvent<HTMLButtonElement>) => void;
}

// boardCommentList

// 댓글 el 데이터
export interface IFetchBoardComment {
  _id: string;
  writer?: string;
  contents: string;
  rating: number;
  updatedAt: string;
  deletedAt?: string;
  createdAt: string;
}
export interface IBoardCommentListProps {
  refetch: () => void;
  list: IFetchBoardComment[];
}
export interface IBoardCommentListUIProps {
  data: IFetchBoardComment;
  onDeleteBoard: (deleteData: {
    id: string;
    password: string;
  }) => Promise<void>;
  passwordValue: string;
  isEdit: boolean;
  onChangeValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickEdit: (id: string) => void;
  refetch: () => void;
  onShowWriter: (writer: string) => void;
}

// boardCommentwrite
export interface IBoardCommentWriteProps {
  isEdit: boolean;
  editData?: IFetchBoardComment;
  refetch: () => void;
}
export interface ImyVariables {
  rating?: number;
  contents?: string;
}
export interface IBoardCommentWriteUIProps {
  onSubmitValue: (values: IBoardCommentWriteCreateData) => Promise<void>;
  isEdit: boolean;
  editData?: IFetchBoardComment;
  form: any;
}

// 게시글 상세
export interface IBoardDetailUIProps {
  onDeleteBoard: () => Promise<void>;
  onGoList: () => void;
  onGoEdit: () => void;
  data: Pick<IQuery, "fetchBoard">;
  onLikeBoard: () => Promise<void>;
  onDisLikeBoard: () => Promise<void>;
}
