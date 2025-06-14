import React, { useEffect, useState } from "react";
import axios from "axios";

function Create() {
  const [task, setTask] = useState();

  const handleAdd = () => {
    axios
      .post("http://localhost:5000/add", { task: task })
      .then((result) => {
        location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="home">
      <form className="create_form">
        <input
          type="text"
          name=""
          id=""
          placeholder="Enter Task"
          onChange={(e) => setTask(e.target.value)}
        />
        <button type="button" onClick={handleAdd}>
          Add
        </button>
      </form>
    </div>
  );
}

export default Create;