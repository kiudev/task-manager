import { useState } from "react";

export default function FilterBar(props) {
   const [hoveredPending, setHoveredPending] = useState(false);
   const [hoveredCurrent, setHoveredCurrent] = useState(false);
   const [hoveredCompleted, setHoveredCompleted] = useState(false);
   const [hoveredAll, setHoveredAll] = useState(false);

   return (
      <footer
         style={{
            backgroundColor: props.isDark
               ? props.colorPalette[4]
               : props.colorPalette[3],
         }}
         className="filter-container"
      >
         <svg
            onClick={() => props.handleFilterTask("pending")}
            onMouseEnter={() => setHoveredPending(true)}
            onMouseLeave={() => setHoveredPending(false)}
            xmlns="http://www.w3.org/2000/svg"
            width="54"
            height="54"
            viewBox="0 0 24 24"
            fill="none"
            stroke={
               hoveredPending ? props.colorPalette[6]
                  : props.isDark
                     ? props.colorPalette[2]
                     : props.colorPalette[5]
            }
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-rotate-clockwise-2"
         >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M9 4.55a8 8 0 0 1 6 14.9m0 -4.45v5h5" />
            <path d="M5.63 7.16l0 .01" />
            <path d="M4.06 11l0 .01" />
            <path d="M4.63 15.1l0 .01" />
            <path d="M7.16 18.37l0 .01" />
            <path d="M11 19.94l0 .01" />
         </svg>

         <svg
            onClick={() => props.handleFilterTask("current")}
            onMouseEnter={() => setHoveredCurrent(true)}
            onMouseLeave={() => setHoveredCurrent(false)}
            xmlns="http://www.w3.org/2000/svg"
            width="54"
            height="54"
            viewBox="0 0 24 24"
            fill="none"
            stroke={
               hoveredCurrent ? props.colorPalette[6]
                  : props.isDark
                     ? props.colorPalette[2]
                     : props.colorPalette[5]
            }
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-progress-bolt"
         >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10 20.777a8.942 8.942 0 0 1 -2.48 -.969" />
            <path d="M14 3.223a9.003 9.003 0 0 1 0 17.554" />
            <path d="M4.579 17.093a8.961 8.961 0 0 1 -1.227 -2.592" />
            <path d="M3.124 10.5c.16 -.95 .468 -1.85 .9 -2.675l.169 -.305" />
            <path d="M6.907 4.579a8.954 8.954 0 0 1 3.093 -1.356" />
            <path d="M12 9l-2 3h4l-2 3" />
         </svg>

         <svg
            onClick={() => props.handleFilterTask("completed")}
            onMouseEnter={() => setHoveredCompleted(true)}
            onMouseLeave={() => setHoveredCompleted(false)}
            xmlns="http://www.w3.org/2000/svg"
            width="54"
            height="54"
            viewBox="0 0 24 24"
            fill="none"
            stroke={
               hoveredCompleted ? props.colorPalette[6]
                  : props.isDark
                     ? props.colorPalette[2]
                     : props.colorPalette[5]
            }
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-circle-check"
         >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
            <path d="M9 12l2 2l4 -4" />
         </svg>

         <svg
            onClick={() => props.handleFilterTask("all")}
            onMouseEnter={() => setHoveredAll(true)}
            onMouseLeave={() => setHoveredAll(false)}
            xmlns="http://www.w3.org/2000/svg"
            width="54"
            height="54"
            viewBox="0 0 24 24"
            fill="none"
            stroke={
               hoveredAll ? props.colorPalette[6]
                  : props.isDark
                     ? props.colorPalette[2]
                     : props.colorPalette[5]
            }
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-menu-2"
         >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 6l16 0" />
            <path d="M4 12l16 0" />
            <path d="M4 18l16 0" />
         </svg>
      </footer>
   );
}
