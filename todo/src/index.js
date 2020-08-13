import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

var client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache(),
});

export default function Index() {
  return (
    <ApolloProvider client={client}>
      <div>
        <h2>ToDo Apollo app 🚀</h2>
        <App />
      </div>
    </ApolloProvider>
  );
}

ReactDOM.render(<Index />, document.getElementById("root"));
