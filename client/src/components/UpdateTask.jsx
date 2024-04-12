import TaskForm from "../layout/TaskForm";
import { useState, useEffect } from "react";

export default function UpdateTask(props) {
   const [task, setTask] = useState({
      title: props.title,
      description: props.description,
      priority: props.priority,
      status: props.status,
   });
   const [title, setTitle] = useState(task.title);
   const [description, setDescription] = useState(task.description);
   const [priorityValue, setPriorityValue] = useState(task.priority);
   const [statusValue, setStatusValue] = useState(task.status);

   const handlePriorityValue = value => {
      setPriorityValue(value);
      setTask(prev => ({ ...prev, priority: value }));
   };

   const handleStatusValue = value => {
      setStatusValue(value);
      setTask(prev => ({ ...prev, status: value }));
   };

   useEffect(() => {
      props.selectedTask(false);
   }, [props])


   const handleClick = async e => {
      e.preventDefault();
      try {
         const response = await fetch(`http://localhost:3001/update/${props.taskId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
               title: title,
               description: description,
               priority: priorityValue,
               status: statusValue,
            }),
         });
         if (response.ok) {
            props.handleCloseTask();
            props.getTaskData();
         } else {
            console.error("Error updating task:", response.statusText);
         }
      } catch (error) {
         console.log("Error updating task:", error);
      }
   };

   return (
      <TaskForm
         isDark={props.isDark}
         colorPalette={props.colorPalette}
         handleCloseTask={props.handleCloseTask}
         handleChangeTitle={e => setTitle(e.target.value)}
         handleChangeDescription={e => setDescription(e.target.value)}
         handlePriorityValue={handlePriorityValue}
         handleStatusValue={handleStatusValue}
         handleClick={handleClick}
         title={title}
         description={description}
         priorityValue={priorityValue}
         statusValue={statusValue}
      />
   );
}
