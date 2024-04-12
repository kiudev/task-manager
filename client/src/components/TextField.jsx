import { colorPalette } from "../color-palette";

export default function TextField(props) {
   return (
      <div className={props.classContainer}>
         <img style={{backgroundColor: props.isDark ? colorPalette[3] : colorPalette[5]}} src={props.src} alt={props.alt} />

         <input
            style={{
               backgroundColor: props.isDark
                  ? colorPalette[3]
                  : colorPalette[5],
               color: props.isDark ? colorPalette[6] : colorPalette[0]
            }}
            type={props.type}
            className={props.classInput}
            name={props.name}
            onChange={props.onChange}
            placeholder={props.placeholder}
            
         />
      </div>
   );
}
