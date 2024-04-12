import "../styles/task.css";
import { useState } from "react";

export default function TaskForm({
   isDark,
   colorPalette,
   handleCloseTask,
   priorityValue,
   statusValue,
   handlePriorityValue,
   handleStatusValue,
   handleClick,
   title,
   description,
   handleChangeTitle,
   handleChangeDescription,
   handleChange,
}) {
   const [hoveredLow, setHoveredLow] = useState(false);
   const [hoveredMedium, setHoveredMedium] = useState(false);
   const [hoveredHigh, setHoveredHigh] = useState(false);
   const [hoveredPending, setHoveredPending] = useState(false);
   const [hoveredCurrent, setHoveredCurrent] = useState(false);
   const [hoveredCompleted, setHoveredCompleted] = useState(false);
   const [hoveredApply, setHoveredApply] = useState(false);

   const btnDarkModePriority = isDark
      ? priorityValue === "medium"
         ? colorPalette[0]
         : colorPalette[6]
      : colorPalette[6];

   const btnLightModePriority = isDark
      ? priorityValue === "medium"
         ? colorPalette[0]
         : colorPalette[6]
      : colorPalette[0];

   const btnDarkModeStatus = isDark
      ? statusValue === "current"
         ? colorPalette[0]
         : colorPalette[6]
      : colorPalette[6];

   const btnLightModeStatus = isDark
      ? statusValue === "current"
         ? colorPalette[0]
         : colorPalette[6]
      : colorPalette[0];

   return (
      <div className="background-task">
         <form
            style={{
               backgroundColor: isDark ? colorPalette[4] : colorPalette[3],
               color: isDark ? "#161616" : "#eeeeee",
            }}
            className={`task-form zoomIn`}
         >
            <svg
               onClick={handleCloseTask}
               xmlns="http://www.w3.org/2000/svg"
               className="icon icon-tabler icon-tabler-x"
               width="74"
               height="74"
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
            <input
               style={{
                  backgroundColor: isDark ? colorPalette[3] : colorPalette[5],
                  color: isDark ? colorPalette[6] : colorPalette[0],
                  border: "none",
               }}
               name="title"
               className={`title ${
                  isDark ? "dark-placeholder" : "light-placeholder"
               }`}
               type="text"
               placeholder="Title"
               onChange={handleChangeTitle}
               value={title}
            />

            <textarea
               style={{
                  backgroundColor: isDark ? colorPalette[3] : colorPalette[5],
                  color: isDark ? colorPalette[6] : colorPalette[0],
                  border: "none",
               }}
               name="description"
               className={`desc ${
                  isDark ? "dark-placeholder" : "light-placeholder"
               }`}
               type="text"
               placeholder="Description"
               onChange={handleChangeDescription}
               value={description !== null ? description : ""}
            />

            <label htmlFor="priority">Priority</label>
            <div>
               <input
                  id="priority"
                  name="priority"
                  onClick={() => handlePriorityValue("low")}
                  style={{
                     backgroundColor:
                        priorityValue === "low"
                           ? "#008000"
                           : isDark
                           ? colorPalette[3]
                           : colorPalette[5],
                     color: !isDark
                        ? priorityValue === "low"
                           ? colorPalette[6]
                           : colorPalette[0]
                        : colorPalette[6],
                     outline: hoveredLow
                        ? isDark
                           ? `2px solid ${colorPalette[6]}`
                           : `2px solid ${colorPalette[0]}`
                        : "transparent",
                  }}
                  className="low-button"
                  type="button"
                  value="Low"
                  onMouseEnter={() => setHoveredLow(true)}
                  onMouseLeave={() => setHoveredLow(false)}
               />
               <input
                  id="priority"
                  name="priority"
                  onClick={() => handlePriorityValue("medium")}
                  style={{
                     backgroundColor:
                        priorityValue === "medium"
                           ? "#ffff00"
                           : isDark
                           ? colorPalette[3]
                           : colorPalette[5],
                     color: isDark ? btnDarkModePriority : btnLightModePriority,
                     outline: hoveredMedium
                        ? isDark
                           ? `2px solid ${colorPalette[6]}`
                           : `2px solid ${colorPalette[0]}`
                        : "transparent",
                  }}
                  className="medium-button"
                  type="button"
                  value="Medium"
                  onChange={handleChange}
                  onMouseEnter={() => setHoveredMedium(true)}
                  onMouseLeave={() => setHoveredMedium(false)}
               />
               <input
                  id="priority"
                  name="priority"
                  onClick={() => handlePriorityValue("high")}
                  style={{
                     backgroundColor:
                        priorityValue === "high"
                           ? "#ff0000"
                           : isDark
                           ? colorPalette[3]
                           : colorPalette[5],
                     color: !isDark
                        ? priorityValue === "high"
                           ? colorPalette[6]
                           : colorPalette[0]
                        : colorPalette[6],
                     outline: hoveredHigh
                        ? isDark
                           ? `2px solid ${colorPalette[6]}`
                           : `2px solid ${colorPalette[0]}`
                        : "transparent",
                  }}
                  className="high-button"
                  type="button"
                  value="High"
                  onChange={handleChange}
                  onMouseEnter={() => setHoveredHigh(true)}
                  onMouseLeave={() => setHoveredHigh(false)}
               />
            </div>

            <label htmlFor="status">Status</label>
            <div>
               <input
                  id="status"
                  name="status"
                  onClick={() => handleStatusValue("pending")}
                  style={{
                     backgroundColor:
                        statusValue === "pending"
                           ? "#3B82F6"
                           : isDark
                           ? colorPalette[3]
                           : colorPalette[5],
                     color: !isDark
                        ? statusValue === "pending"
                           ? colorPalette[6]
                           : colorPalette[0]
                        : colorPalette[6],
                     outline: hoveredPending
                        ? isDark
                           ? `2px solid ${colorPalette[6]}`
                           : `2px solid ${colorPalette[0]}`
                        : "transparent",
                  }}
                  className="pending-button"
                  type="button"
                  value="Pending"
                  onChange={handleChange}
                  onMouseEnter={() => setHoveredPending(true)}
                  onMouseLeave={() => setHoveredPending(false)}
               />
               <input
                  id="status"
                  name="status"
                  onClick={() => handleStatusValue("current")}
                  style={{
                     backgroundColor:
                        statusValue === "current"
                           ? "#ffff00"
                           : isDark
                           ? colorPalette[3]
                           : colorPalette[5],
                     color: isDark ? btnDarkModeStatus : btnLightModeStatus,
                     outline: hoveredCurrent
                        ? isDark
                           ? `2px solid ${colorPalette[6]}`
                           : `2px solid ${colorPalette[0]}`
                        : "transparent",
                  }}
                  className="current-button"
                  type="button"
                  value="Current"
                  onChange={handleChange}
                  onMouseEnter={() => setHoveredCurrent(true)}
                  onMouseLeave={() => setHoveredCurrent(false)}
               />
               <input
                  id="status"
                  name="status"
                  onClick={() => handleStatusValue("completed")}
                  style={{
                     backgroundColor:
                        statusValue === "completed"
                           ? "#008000"
                           : isDark
                           ? colorPalette[3]
                           : colorPalette[5],
                     color: !isDark
                        ? statusValue === "completed"
                           ? colorPalette[6]
                           : colorPalette[0]
                        : colorPalette[6],
                     outline: hoveredCompleted
                        ? isDark
                           ? `2px solid ${colorPalette[6]}`
                           : `2px solid ${colorPalette[0]}`
                        : "transparent",
                  }}
                  className="completed-button"
                  type="button"
                  value="Completed"
                  onChange={handleChange}
                  onMouseEnter={() => setHoveredCompleted(true)}
                  onMouseLeave={() => setHoveredCompleted(false)}
               />
            </div>

            <input
               style={{
                  backgroundColor: isDark ? colorPalette[3] : colorPalette[5],
                  color: isDark ? colorPalette[6] : colorPalette[0],
                  outline: hoveredApply
                     ? isDark
                        ? `2px solid ${colorPalette[6]}`
                        : `2px solid ${colorPalette[0]}`
                     : "transparent",
               }}
               className="apply-button"
               type="submit"
               value="Apply"
               onClick={handleClick}
               onMouseEnter={() => setHoveredApply(true)}
               onMouseLeave={() => setHoveredApply(false)}
            />
         </form>
      </div>
   );
}
