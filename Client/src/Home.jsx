import React, { useEffect, useState } from "react";
import Create from "./Create";
import axios from "axios";
import {
  BsFillCheckCircleFill,
  BsCircleFill,
  BsFillTrashFill,
} from "react-icons/bs";

function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/get") 
      .then((result) => {
        console.log("Fetched data:", result.data); 
        if (Array.isArray(result.data.data)) {
          setTodos(result.data.data);
        } else {
          console.error("Unexpected data format:", result.data);
          setTodos([]);
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setTodos([]);
      });
  }, []);
  

  const handleEdit = (id) => {
    axios
      .put("http://localhost:5000/update/" + id, { done: true })
      .then(() => {
        location.reload(); 
      })
      .catch((err) => console.log(err));
  };

 
  const handleDelete = (id) => {
    axios
      .delete("http://localhost:5000/delete/" + id)
      .then(() => {
        location.reload(); 
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="home page">
      <div className="topic">
        <h1>TO DO LIST.</h1>
      </div>

      <Create />

      {!Array.isArray(todos) || todos.length === 0 ? (
        <div className="topic">
          <h2>No Records.</h2>
        </div>
      ) : (
        todos.map((todo) => (
          <div className="task" key={todo._id}>
            <div className="checkbox" onClick={() => handleEdit(todo._id)}>
              {todo.done ? (
                <BsFillCheckCircleFill className="icon" />
              ) : (
                <BsCircleFill className="icon" />
              )}
              <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
            </div>
            <div>
              <BsFillTrashFill
                className="icon"
                onClick={() => handleDelete(todo._id)}
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
