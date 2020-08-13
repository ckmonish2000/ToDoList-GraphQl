import React, { Component } from "react";
import { gql, useQuery } from "@apollo/client";

export default function App() {
  var query = gql`
    {
      todolist
    }
  `;
  const { loading, error, data } = useQuery(query);

  if (loading) return <h1>loading...</h1>;
  if (error) return <h1>{`error: ${error}`}</h1>;
  console.log(data.todolist);
  return (
    <ol>
      {data.todolist.map((e) => {
        return <li>{e}</li>;
      })}
    </ol>
  );
}
