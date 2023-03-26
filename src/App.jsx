import { useState } from "react";
import Todo from "./Components/todo";
import "./App.scss";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Todo />
    </div>
  );
}

export default App;
