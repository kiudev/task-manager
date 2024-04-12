import Button from "../components/Button";
import { colorPalette } from "../color-palette";

export default function UserForm({ children, isDark, handleBgClick, navClick }) {
   return (
      <div
         style={{
            backgroundColor: isDark
               ? "rgba(14, 86, 61, 1)"
               : "rgba(114, 171, 151, 1)",
            backgroundImage: isDark
               ? "linear-gradient(220deg, rgba(14, 86, 61, 1) 50%, rgba(0, 57, 37, 1) 100%)"
               : "linear-gradient(220deg, rgba(114, 171, 151, 1) 50%, rgba(71, 142, 117, 1) 100%)",
            color: colorPalette[6],
         }}
         className="container-layout"
      >
         <nav className="nav-bar">
            <Button
               className="bg-color-btn"
               onClick={handleBgClick}
               isDark={isDark}
            >
               <img
                  src={isDark ? "moon-filled.svg" : "brightness-up.svg"}
                  alt=""
               />
            </Button>

            <Button className="bg-color-btn" onClick={navClick} isDark={isDark}>
               Try it!
            </Button>
         </nav>

         {children}
      </div>
   );
}
