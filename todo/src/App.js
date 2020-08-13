import React, { Component, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import Mutate from "./mutate";
export default function App() {
  const [dataz, setDataz] = useState(0);
  var query = gql`
    {
      todolist
    }
  `;
  console.log(dataz);
  const { loading, error, data } = useQuery(query);

  if (loading) return <h1>loading...</h1>;
  if (error) return <h1>{`error: ${error}`}</h1>;
  console.log(data.todolist);
  var z = 0;
  return (
    <div>
      <Mutate />
      <ol>
        {data.todolist.map((e) => {
          z += 1;
          var x = z;
          return (
            <li>
              {e}
              {z}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
