import styled from "@emotion/styled";
import { useRouter } from "next/router";
import Banner from "./banner";

import Header from "./header";
import Navigation from "./navigation";

const HIDDEN_HEADERS = ["/"];

interface ILayoutProps {
  children: JSX.Element;
}
export default function Layout(props: ILayoutProps) {
  const router = useRouter();
  const isHiddenHeader = HIDDEN_HEADERS.includes(router.asPath);

  return (
    <>
      <Header />
      <Banner />
      <Navigation />
      <Contents>{props.children}</Contents>
    </>
  );
}

const Contents = styled.div`
  padding: 100px 0 280px 0;
  box-sizing: border-box;
  width: 1200px;
  margin: 0 auto;
`;
