import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { TrashIcon } from "@heroicons/react/24/outline";

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

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/tasks", { headers: headers })
      .then((response) => {
        console.log(response.data);
        setTodoData(response.data);
        setUpdateData(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [updateData]);

  const toggleTaskCompletion = (id) => {
    setTodoData((prevTodoData) => {
      const updatedTodoData = prevTodoData.map((task) =>
        task._id === id ? { ...task, completed: !task.completed } : task
      );

      const updatedTask = updatedTodoData.find((task) => task._id === id);

      axios
        .put(`http://localhost:3000/api/tasks/${id}`, updatedTask, {
          headers: headers,
        })
        .then((response) => {
          setUpdateData(true);
        })
        .catch((error) => {
          console.log(error);
        });

      return updatedTodoData;
    });
  };
  //Delete single task
  const deleteTask = (id) => {
    // const delete_task = todoData.find((task) => task._id === _id);
    //delete method
    axios
      .delete(`http://localhost:3000/api/tasks/${id}`, {
        headers: headers,
      })
      .then((response) => {
        console.log(response.data);
        setTodoData(todoData.filter((task) => task._id != id));
        setUpdateData(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //delete all tasks
  const handleDeleteAllTasks = () => {
    axios
      .delete("http://localhost:3000/api/tasks", {
        headers: headers,
      })
      .then((response) => {
        console.log(response.data);
        setTodoData([]);
        setUpdateData(true);
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
      {selectedBtn === "All" &&
        todoData.map((task) => (
          <li key={task._id} className="flex items-center mb-4 ml-[30rem]">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(task._id)}
              className="mr-3 h-6 w-6 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span
              className={`${
                task.completed ? "line-through text-gray-500" : ""
              }`}
            >
              {task.title}
            </span>
          </li>
        ))}
      {selectedBtn === "Active" &&
        todoData
          .filter((task) => !task.completed)
          .map((task) => (
            <li key={task.id} className="flex items-center mb-4 ml-[30rem]">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskCompletion(task._id)}
                className="mr-3 h-6 w-6 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span
                className={`${
                  task.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {task.title}
              </span>
            </li>
          ))}
      {selectedBtn === "Completed" &&
        todoData
          .filter((task) => task.completed)
          .map((task) => (
            <li key={task._id} className="flex items-center mb-4 ml-[30rem]">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskCompletion(task._id)}
                className="mr-3 h-6 w-6 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span
                className={`${
                  task.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {task.title}
              </span>
              <TrashIcon
                onClick={() => deleteTask(task._id)}
                className="h-5 w-5 text-red-500 cursor-pointer hover:text-red-700 ml-10"
              />
            </li>
          ))}
      {selectedBtn === "Completed" && todoData.length != 0 && (
        <div>
          <button
            className="flex items-center w-32 bg-red-500 text-white h-14 border-2 rounded-md p-2 ml-[55rem]"
            onClick={handleDeleteAllTasks}
          >
            <TrashIcon className="h-5 w-5 mr-2" />
            delete all
          </button>
        </div>
      )}
    </>
  );
};

export default TodoForm;
