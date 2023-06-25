import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Input } from "antd";

const { TextArea } = Input;

function App() {
  return (
    <div className="App">
      <TextArea rows={10} />
    </div>
  );
}

export default App;
