import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const TodoForm = () => {
  const [selectedBtn, setSelectedBtn] = useState("All");
  const [todoData, setTodoData] = useState([]);
  const location = useLocation();
  const { username } = location.state;
  const [updateData, setUpdateData] = useState(false);
  console.log(username);

  const [task, setTask] = useState("");

  const handleClick = (value) => {
    setSelectedBtn(value);
  };
  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const todo_task = {
    title: `${task}`,
    description: `${task}`,
    completed: false,
  };

  const headers = {
    "Content-Type": "Application/json",
    "Authorization": `Bearer ${localStorage.getItem(username)}`,
  };

  const handleAddTask = () => {
    axios
      .post("http://localhost:3000/api/tasks", todo_task, { headers: headers })
      .then((response) => {
        console.log(response.data);
        setUpdateData(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(
    () => {
      axios
        .get("http://localhost:3000/api/tasks", { headers: headers })
        .then((response) => {
          console.log(response.data);
          setTodoData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [updateData],
    []
  );

  const toggleTaskCompletion = (id) => {
    setTodoData(
      todoData.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );

    let updated_task = todoData.find((task) => task.id === id);
    //put method
    axios
      .put(`http://localhost:3000/api/tasks/${id}`, updated_task, {
        headers: headers,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="flex m-1 justify-center mt-10">
        <button
          className={
            selectedBtn == "All"
              ? "mx-12 border-b-4 border-blue-500 w-[70px] p-1"
              : "mx-12"
          }
          onClick={() => handleClick("All")}
        >
          All
        </button>
        <button
          className={
            selectedBtn == "Active"
              ? "mx-12 border-b-4 border-blue-500 w-[70px] p-1"
              : "mx-12"
          }
          onClick={() => handleClick("Active")}
        >
          Active
        </button>
        <button
          className={
            selectedBtn == "Completed"
              ? "mx-12 border-b-4 border-blue-500 w-[100px] p-1"
              : "mx-12"
          }
          onClick={() => handleClick("Completed")}
        >
          Completed
        </button>
      </div>
      <hr className="w-[38%] ml-[30rem] -mt-1" />
      <div>
        <input
          placeholder="add task"
          className="border-2 rounded-xl w-[35%] h-14 ml-[30rem] mt-10 p-2"
          onChange={handleChange}
        />
        <button
          className="m-8 rounded-xl bg-blue-600 w-28 h-14 text-white"
          onClick={handleAddTask}
        >
          ADD
        </button>
      </div>
      {todoData.map((task) => (
        <li key={task.id} className="flex items-center mb-4 ml-[30rem]">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTaskCompletion(task._id)}
            className="mr-3 h-6 w-6 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span
            className={`${task.completed ? "line-through text-gray-500" : ""}`}
          >
            {task.title}
          </span>
        </li>
      ))}
    </>
  );
};

export default TodoForm;
