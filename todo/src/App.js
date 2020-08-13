import React, { Component, useState } from "react";
import Mutate from "./mutate";
import Query from "./query";
export default function App() {
  return (
    <div>
      <Mutate />
      <Query />
    </div>
  );
}
