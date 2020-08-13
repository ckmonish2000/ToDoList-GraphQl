import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";

export default function Query() {
  const [dataz, setDataz] = useState(0);

  var query = gql`
    {
      todolist
    }
  `;

  const { loading, error, data } = useQuery(query);

  if (loading) return <h1>loading...</h1>;
  if (error) return <h1>{`error: ${error}`}</h1>;
  console.log(data.todolist);
  var z = 0;
  return (
    <div>
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
