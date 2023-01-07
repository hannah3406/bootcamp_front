import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

export default function App({ Component, pageProps }) {
  const client = new ApolloClient({
    // uri: "https://cors-anywhere.herokuapp.com/http://backendonline.codebootcamp.co.kr/graphql",
    uri: "https://backendonline.codebootcamp.co.kr/graphql",
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
//페이지가 아님! 모든 페이지에 공통 적용되는 설정들
