import { useRouter } from "next/router";
import { useEffect } from "react";

export const withAuth =
  (Component: React.ComponentType<any>) => (props: any) => {
    const router = useRouter();

    useEffect(() => {
      if (!localStorage.getItem("accessToken")) {
        alert("로그인을 먼저 해주세요");
        router.push("/login");
      }
    }, []);

    return <Component {...props} />;
  };
