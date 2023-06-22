// 회원가입 데이터
export interface ICreateUserData {
  email: string;
  password: string;
  name: string;
}

// 로그인 데이터
export interface ILoginUserData {
  email: string;
  password: string;
}
