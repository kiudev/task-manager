import "./styles/dashboard.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { CreateTask } from "./components/CreateTask.jsx";
import { colorPalette } from "./color-palette.js";
import Button from "./components/Button.jsx";
import Card from "./components/Card.jsx";
import FilterBar from "./components/FilterBar.jsx";
import UpdateTask from "./components/UpdateTask.jsx";

// Esta es la vista del panel de tareas, donde el usuario podrá probar la aplicación
export function App() {
   // Declaro los estados que quiero almacenar el valor y actualizarlos
   const [createTask, setCreateTask] = useState(false);
   const [updateTask, setUpdateTask] = useState(false);
   const [filterTask, setFilterTask] = useState("all");
   const [isDark, setIsDark] = useState("");
   const [taskData, setTaskData] = useState([]);
   const [selectedTask, setSelectedTask] = useState(false);
   const [userRole, setUserRole] = useState("");
   const [animationKey, setAnimationKey] = useState(Date.now());
   const [loading, setLoading] = useState(true);

   // Obtiene el estado del usuario al iniciar sesión y así manejar la funcionalidad a partir de su id.
   const location = useLocation();
   const user = location.state.user;

   // Maneja el botón al pulsar en el que se abra el formulario de crear la tarea, actualizando el estado createTask a true.
   const handleFormTask = () => {
      setCreateTask(true);
   };
   
   // Maneja el botón al pulsar en el que se cierre el formulario de crear la tarea, actualizando los estados createTask a false, selectedTask a false para que no se abra la ventana de la tarea detallada y updateTask para que no se abra el formulario de actualizar.
   const handleCloseTask = () => {
      setCreateTask(false);
      setSelectedTask(false);
      setUpdateTask(false);
   };

   // Maneja el botón al pulsar en el que abra cada tarea detallada según la tarea que pulsemos.
   const handleClick = task => {
      setSelectedTask(task);
   };

   // Maneja el botón al pulsar en el que podremos cambiar de modo claro a oscuro y aplicar distintos colores a otros elementos de la aplicación.
   const handleBgClick = () => {
      setIsDark(!isDark);
   };

   // Obtiene todos las tareas según el id del usuario, cuando recibimos los datos actualizamos el estado taskData y el estado loading para que se muestre una vez pasada la pantalla de carga.
   const getTaskData = () => {
      fetch("http://localhost:3001/taskdata", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            title: "",
            description: "",
            priority: "",
            status: "",
            userId: user.userId,
         }),
      })
         .then(response => response.json())
         .then(data => {
            setTaskData(data);

            setTimeout(() => {
               setLoading(false);
            }, 1000);
         })
         .catch(error => console.error("Error fetching data:", error));
   };

   // Obtiene los datos actualizados automáticamente cada vez que hagamos uso de cualquier funcionalidad.
   useEffect(() => {
      getTaskData();
   }, [user.userId]);

   // Obtenemos los roles por usuario.
   useEffect(() => {
      const getUserRoleData = () => {
         fetch("http://localhost:3001/roles", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: user.userId }),
         })
            .then(response => response.json())
            .then(data => {
               setUserRole(data);
            })
            .catch(error => console.error("Error fetching data:", error));
      };
      getUserRoleData();
   }, [user.userId]);

   // Implementa la funcionalidad de eliminar la tarea según su id y el id del usuario conectado.
   const handleDeleteTask = async taskId => {
      try {
         await fetch(`http://localhost:3001/delete/${taskId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: user.userId, taskId: taskId }),
         });

         getTaskData();
         setSelectedTask(false);
         setAnimationKey(Date.now());
      } catch (error) {
         console.error("Error removing task:", error);
      }
   };

   // Maneja el botón de actualizar tarea cuando pulsamos en la tarea que queremos que se abra su formulario.
   const handleUpdateTask = task => {
      setUpdateTask(task);
   };

   // Maneja los botones cuando filtramos la tarea por su estado y actualiza la animación en todas cada vez que cambiemos de filtro.
   const handleFilterTask = status => {
      setFilterTask(status);
      setAnimationKey(Date.now());
   };

   // Variable para filtrar el objeto donde teniamos almacenados los datos de las tareas y actualizamos el estado filterTask pasando el atributo status, por defecto el filtro mostrará todas las tareas.
   const filteredTasks = Object.values(taskData).filter(task => {
      if (filterTask === "all") return true;
      return task.status === filterTask;
   });

   // Variable para declarar una condición que utilizaremos para determinar las vistas y funcionalidades del rol del usuario.
   const isAdminOrRegistered =
      userRole === "Admin" || userRole === "Registered";

   // Devuelve la vista de carga cuando loading es true.
   if (loading) {
      return (
         <div className="loader-container">
            <div className="loader"></div>
         </div>
      )
   }

   return (
      <main
         style={{
            backgroundColor: isDark
               ? "rgba(14, 86, 61, 1)"
               : "rgba(114, 171, 151, 1)",
            backgroundImage: isDark
               ? "linear-gradient(220deg, rgba(14, 86, 61, 1) 0%, rgba(0, 57, 37, 1) 100%)"
               : "linear-gradient(220deg, rgba(114, 171, 151, 1) 0%, rgba(71, 142, 117, 1) 100%)",
         }}
         className="dashboard"
      >
         <header>
            <nav>
               <img className="logo" src="/logo-transparent.png" alt="Logo" />

               <div>
                  <Button className="bg-color-btn" onClick={handleBgClick}>
                     <img
                        src={isDark ? "moon-filled.svg" : "brightness-up.svg"}
                        alt=""
                     />
                  </Button>

                  <Button
                     className="sign-out-btn"
                     onClick={handleBgClick}
                     href="/"
                  >
                     Sign Out
                  </Button>
               </div>
            </nav>
         </header>

         <section>
            <nav>
               <div>
                  <h1
                     style={{
                        color: isDark ? colorPalette[6] : colorPalette[0],
                     }}
                     className="hello-user"
                  >
                     Hello, {user.username}
                  </h1>

                  {isAdminOrRegistered ? (
                     <Button
                        className="create-task-btn"
                        onClick={handleFormTask}
                     >
                        Create Task
                     </Button>
                  ) : (
                     <Button
                        className="create-task-btn-disabled"
                        onClick={handleFormTask}
                        disabled
                     >
                        Create Task
                     </Button>
                  )}
               </div>
            </nav>

            {isAdminOrRegistered ? (
               Array.isArray(taskData) && taskData.length > 0 ? (
                  filteredTasks.map((task, index) => (
                     <Card
                        key={`${index}-${animationKey}`}
                        onClick={() => handleClick(task)}
                        isDark={isDark}
                        colorPalette={colorPalette}
                        title={task.title}
                        description={task.description}
                        priority={task.priority}
                        status={task.status}
                        isAdminOrRegistered={isAdminOrRegistered}
                        deleteTask={() => handleDeleteTask(task.task_id)}
                        updateTask={() => handleUpdateTask(task)}
                     />
                  ))
               ) : (
                  <article
                     style={{
                        backgroundColor: isDark
                           ? colorPalette[4]
                           : colorPalette[3],
                     }}
                     className="task fadeInUp"
                  >
                     <h2 className="no-task">No tasks found 😴</h2>
                  </article>
               )
            ) : (
               <div>
                  <Card
                     key="1"
                     onClick={task => handleClick(task)}
                     title="This is a task"
                     description="Created a first task to test the functionality"
                     isDark={isDark}
                     colorPalette={colorPalette}
                     priority="Low"
                     status="Completed"
                  />
               </div>
            )}

            {createTask && (
               <CreateTask
                  isDark={isDark}
                  colorPalette={colorPalette}
                  handleCloseTask={handleCloseTask}
                  getTaskData={getTaskData}
               />
            )}

            {updateTask && (
               <UpdateTask
                  isDark={isDark}
                  colorPalette={colorPalette}
                  handleCloseTask={handleCloseTask}
                  getTaskData={getTaskData}
                  selectedTask={setSelectedTask}
                  taskId={updateTask.task_id}
                  title={updateTask.title}
                  description={updateTask.description}
                  priority={updateTask.priority}
                  status={updateTask.status}
               />
            )}

            {selectedTask && (
               <section className="background-task">
                  <div
                     className="task-clicked zoomIn"
                     style={{
                        backgroundColor: isDark
                           ? colorPalette[4]
                           : colorPalette[3],
                        color: isDark ? "#161616" : "#eeeeee",
                     }}
                  >
                     <svg
                        onClick={handleCloseTask}
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-x"
                        width="54"
                        height="54"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke={isDark ? "#161616" : "#eeeeee"}
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                     >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M18 6l-12 12" />
                        <path d="M6 6l12 12" />
                     </svg>

                     <div
                        style={{
                           color: isDark
                              ? colorPalette[0]
                              : colorPalette[6],
                        }}
                        className="task-info"
                     >
                        <h1>{selectedTask.title}</h1>

                        <p>{selectedTask.description}</p>
                     </div>
                  </div>
               </section>
            )}
         </section>

         {userRole === "Admin" && (
            <FilterBar
               handleFilterTask={handleFilterTask}
               isDark={isDark}
               colorPalette={colorPalette}
            />
         )}
      </main>
   );
}
