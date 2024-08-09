import { useState } from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import DeleteForeverSharpIcon from "@mui/icons-material/DeleteForeverSharp";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import ChecklistSharpIcon from "@mui/icons-material/ChecklistSharp";

function App() {
  const [addTask, setAddTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editTask, setEditTask] = useState();
  const fillTask = (e) => {
    setAddTask(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!addTask == "") {
      setTasks([...tasks, addTask]);
      setAddTask("");
    }
  };
  const handleDelete = (index) => {
    tasks.splice(index, 1);
    setTasks([...tasks]);
  };
  const handleEdit = (index) => {
    setEditIndex(index);
    setEditTask(tasks[index]);
  };
  const handleEditChange = (e) => {
    setEditTask(e.target.value);
  };
  const handleUpdateTask = () => {
    const updatedTask = tasks.map((task, index) =>
      index === editIndex ? editTask : task
    );
    setTasks(updatedTask);
    setEditIndex(null);
    setEditTask("");
  };

  return (
    <div className="flex justify-center items-center bg-gradient-to-r from-blue-600 via-sky-300 to-blue-600 min-h-screen">
      <div className="container">
        <div className="row">
          <div className="col-md-5 col-12 my-1 px-2">
            <div className="box p-5">
              <h2 className="heading">Enter a Task</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={addTask}
                  onChange={fillTask}
                  placeholder="Enter a task ..."
                  className="mt-3"
                />
                <button className="bg-blue-800 text-white rounded-md">
                  Add Task
                </button>
              </form>
            </div>
          </div>
          <div className="col-md-7 col-12 my-1 px-2 ">
            <div className="list-container">
              {tasks.length > 0 ? (
                <div>
                  <h1 className="heading py-5">Tasks list</h1>
                  {tasks.map((x, index) => {
                    return (
                      <div key={index} className="container">
                        <div className="row flex">
                          <div className="col-10  my-1">
                            {editIndex === index ? (
                              <input
                                type="text"
                                value={editTask}
                                onChange={handleEditChange}
                                className="list-container-input w-100"
                              />
                            ) : (
                              <p className="w-100">{x}</p>
                            )}
                          </div>
                          <div className="col-1 px-0 my-1 flex justify-end">
                            {editIndex === index ? (
                              <div
                                onClick={handleUpdateTask}
                                className="text-success hover:cursor-pointer "
                              >
                                <ChecklistSharpIcon className="w-100" />
                              </div>
                            ) : (
                              <div
                                className=" text-primary hover:cursor-pointer"
                                onClick={() => handleEdit(index)}
                              >
                                <EditSharpIcon className="w-100" />
                              </div>
                            )}
                          </div>
                          <div className="col-1 px-0 my-1">
                            <div
                              onClick={() => handleDelete(index)}
                              className="text-danger hover:cursor-pointer"
                            >
                              <DeleteForeverSharpIcon className="w-100" />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="flex justify-center items-center no-tasks-display">
                  No tasks to display.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
