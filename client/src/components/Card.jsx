import { useState } from "react";
import TaskOptions from "./TaskOptions";
import { colorPalette } from "../color-palette";

export default function Card(props) {
   const [hovered, setHovered] = useState(false);

   return (
      <article
         className="task fadeInUp"
         key={props.index}
         onClick={props.onClick}
         style={{
            backgroundColor: props.isDark
               ? props.colorPalette[4]
               : props.colorPalette[3],
            outlineColor: hovered
               ? props.isDark
                  ? props.colorPalette[0]
                  : props.colorPalette[6]
               : "transparent",
         }}
         onMouseEnter={() => setHovered(true)}
         onMouseLeave={() => setHovered(false)}
      >
         <header>
            <p
               style={{
                  color: props.isDark
                     ? props.colorPalette[0]
                     : props.colorPalette[6]
               }}
               className="task-title"
            >
               {props.title}
            </p>
            <aside>
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  stroke={
                     props.isDark
                        ? props.colorPalette[0]
                        : props.colorPalette[6]
                  }
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-up-right"
               >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <path d="M17 7 7 17M8 7h9v9" />
               </svg>
            </aside>
         </header>

         <footer
            style={{
               color: props.isDark
                  ? props.colorPalette[0]
                  : props.colorPalette[6],
            }}
         >
            <p className="task-desc">{props.description}</p>

            <div
               className="prio-status"
            >
               <div>
                  <p className="task-prio">{props.priority}</p>

                  <hr style={{backgroundColor: props.isDark ? colorPalette[0] : colorPalette[6]}} className="hr" />

                  <p className="task-status">{props.status}</p>
               </div>

               {props.isAdminOrRegistered && (
                  <TaskOptions
                     isDark={props.isDark}
                     colorPalette={props.colorPalette}
                     deleteTask={props.deleteTask}
                     updateTask={props.updateTask}
                  />
               )}
            </div>
         </footer>
      </article>
   );
}
