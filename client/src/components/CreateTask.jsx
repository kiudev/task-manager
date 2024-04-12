import { useState } from "react";
// import { colorPalette } from '../color-palette';
import { useLocation } from "react-router-dom";
import TaskForm from "../layout/TaskForm";

export function CreateTask(props) {
   const [task, setTask] = useState({
      title: "",
      description: "",
      priority: "",
      status: "",
   });
   
   const [title, setTitle] = useState(task.title);
   const [description, setDescription] = useState(task.description);
   const [priorityValue, setPriorityValue] = useState("");
   const [statusValue, setStatusValue] = useState("");

   const location = useLocation();

   const handlePriorityValue = value => {
      setPriorityValue(value);
      setTask(prev => ({ ...prev, priority: value }));
   };

   const handleStatusValue = value => {
      setStatusValue(value);
      setTask(prev => ({ ...prev, status: value }));
   };

   const handleClick = async e => {
      e.preventDefault();

      const user = location.state.user;

      const request = {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({
            ...task,
            userId: user.userId,
            title,
            description,
         }),
      };

      try {
         const response = await fetch("http://localhost:3001/tasks", request);
         if (response.ok) {
            console.log("Task applied successfully");
            props.handleCloseTask();
            props.getTaskData();
         } else {
            console.log("Task not applied successfully", response.statusText);
         }
      } catch (err) {
         console.log(err);
      }
   };

   return (
      <TaskForm
         isDark={props.isDark}
         colorPalette={props.colorPalette}
         handleCloseTask={props.handleCloseTask}
         priorityValue={priorityValue}
         handlePriorityValue={handlePriorityValue}
         statusValue={statusValue}
         handleStatusValue={handleStatusValue}
         handleClick={handleClick}
         handleChangeTitle={e => setTitle(e.target.value)}
         handleChangeDescription={e => setDescription(e.target.value)}
      />
   );
}
