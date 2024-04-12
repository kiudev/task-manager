import { useState } from "react";
import { colorPalette } from "../color-palette";

export default function Button(props) {
   const [isHovered, setIsHovered] = useState(false);

   const handleClick = () => {
      if (!props.disabled) {
         if (props.href) {
            window.location.href = props.href;
         } else if (props.onClick) {
            props.onClick();
         }
      }
   }

   return (
      <button
         className={props.className}
         style={{
            backgroundColor: colorPalette[3],
            color: colorPalette[6],
            outline: isHovered
               ? props.isDark
                  ? `2px solid ${colorPalette[6]}`
                  : `2px solid ${colorPalette[0]}`
               : "transparent",
            opacity: props.disabled ? "0.5" : ""
         }}
         onClick={handleClick}
         type={props.type}
         disabled={props.disabled}
         onMouseEnter={() => setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}
      >
         {props.children}
      </button>
   );
}
