import { useEffect, useState } from "react";
import axios from "axios";
import "/src/App.scss";

function Todo() {
  //! State
  const [todos, setTodos] = useState({});
  const [editableTodo, setEditableTodo] = useState({
    title: "",
    isCompleted: false,
    isEditable: false,
  });

  //! Handlers
  const handleDltTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const handleEditMode = index => {
    setEditableTodo({ ...todos[index] });
    const newTodos = [...todos];
    newTodos[index].isEditable = true;
    setTodos(newTodos);
  };

  const handleEditTodo = title => {
    setEditableTodo({ ...editableTodo, title });
  };

  const handleDone = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1, editableTodo);
    setTodos(newTodos);
    alert(`You Update Your ToDo`);
  };

  //! useEffect
  useEffect(() => {
    axios("https://jsonplaceholder.typicode.com/todos?_limit=30").then(
      response => {
        setTodos(response.data);
      }
    );
  }, []);

  return (
    <div className="main__container">
      <div className="main__container__header">
        <div className="main__container__title">
          <h1>ToDo</h1>
        </div>
      </div>
      <div className="main__container__todo--section">
        <div className="todo__container">
          <ul className="todo__items">
            {Object.values(todos).map((todo, index) => {
              return todo.isEditable ? (
                <div className="input__container">
                  <input
                    className="input__container__item"
                    key={todo.id}
                    type="text"
                    value={editableTodo.title}
                    onChange={event => handleEditTodo(event.target.value)}
                  />
                  <button
                    onClick={() => handleDone(index)}
                    className="inner__input__btn"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <li key={todo.id} className="todo__item">
                  {todo.title}
                  <div className="todo__item__btn__box">
                    <button
                      className="todo__edit btn"
                      onClick={() => handleEditMode(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="todo__dlt btn"
                      onClick={() => {
                        handleDltTodo();
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Todo;
