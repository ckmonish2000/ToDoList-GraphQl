import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const Add_todo = gql`
  mutation addTodo($task: String!) {
    TodoCreate(task: $task) {
      todos {
        task
      }
    }
  }
`;

export default function Mutate() {
  var [input, setInput] = useState(null);
  var changing = (e) => {
    setInput(e.target.value);
  };
  var submit = (e) => {
    e.preventDefault();
    console.log(input);
    setInput(null);
  };
  return (
    <div>
      <form>
        <input onChange={changing} placeholder="what to do next"></input>
        <button onClick={submit}>submit</button>
      </form>
    </div>
  );
}
