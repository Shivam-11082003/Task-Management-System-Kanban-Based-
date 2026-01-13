import { useEffect, useState } from "react";
import { fetchTasks, createTask, updateTask, deleteTask } from "../api";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function Kanban() {
  const token = localStorage.getItem("token");
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "", due_date: "" });

  useEffect(() => {
    fetchTasks(token).then(setTasks);
  }, []);

  const addTask = async () => {
    const res = await createTask({ ...newTask, status: "pending" }, token);
    const task = await res.json();
    setTasks([...tasks, task]);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const id = result.draggableId;
    const status = result.destination.droppableId;
    updateTask(id, { status }, token);
    setTasks(tasks.map((t) => (t._id === id ? { ...t, status } : t)));
  };

  const remove = async (id) => {
    await deleteTask(id, token);
    setTasks(tasks.filter((t) => t._id !== id));
  };

  const columns = ["pending", "in-progress", "completed"];

  return (
    <div>
      <h2>Kanban Board</h2>
      <input placeholder="Title" onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} />
      <input placeholder="Description" onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} />
      <input type="date" onChange={(e) => setNewTask({ ...newTask, due_date: e.target.value })} />
      <button onClick={addTask}>Add Task</button>
      <button onClick={() => (window.location = "/profile")}>Profile</button>
      <button onClick={() => {localStorage.removeItem("token"); window.location = "/";}}>Logout</button>

      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: "flex", gap: "20px" }}>
          {columns.map((col) => (
            <Droppable droppableId={col} key={col}>
              {(prov) => (
                <div ref={prov.innerRef} {...prov.droppableProps} style={{ border: "1px solid black", width: "250px", minHeight: "400px" }}>
                  <h3>{col}</h3>
                  {tasks.filter((t) => t.status === col).map((t, i) => (
                    <Draggable draggableId={t._id} index={i} key={t._id}>
                      {(prov) => (
                        <div ref={prov.innerRef} {...prov.draggableProps} {...prov.dragHandleProps} style={{ padding: "10px", margin: "10px", background: "#eee" }}>
                          <h4>{t.title}</h4>
                          <p>{t.description}</p>
                          <small>{t.due_date ? new Date(t.due_date).toDateString() : ""}</small>
                          <br />
                          <button onClick={() => remove(t._id)}>Delete</button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {prov.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
