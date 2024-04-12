import { useNavigate } from "react-router-dom";
import "../styles/form.css";
import { useState } from "react";
import { colorPalette } from "../color-palette";
import UserForm from "../layout/UserForm";
import TextField from "../components/TextField";
import Button from "../components/Button";

// Esta es la vista para que podamos registrar nuestro usuario.
export function SignUp() {
   // Declaro estados para almacenar y actualizarlos después.
   const [user, setUser] = useState({
      email: "",
      password: "",
      username: "",
   });

   const [isDark, setIsDark] = useState("");
   const [wrongUser, setWrongUser] = useState("");
   const [correctUser, setCorrectUser] = useState("");

   // Función para manejar el modo claro/oscuro al pulsar.
   const handleBgClick = () => {
      setIsDark(!isDark);
   };

   // Guarda el uso de la navegación en una variable para poder navegar a otra página.
   const nav = useNavigate();

   // Obtiene los datos que escribo en los campos para registrarlos.
   const handleChange = e => {
      setUser(prev => ({ ...prev, [e.target.name]: e.target.value }));
   };

   // Función para manejar el botón cuando inicias sesión para redirigirme al panel con el nombre de usuario, por defecto será Guest si es un usuario invitado.
   const navClick = () => {
      nav("/home", { state: { user: { username: "Guest" } } });
   };

   // Registra los datos del usuario en la base de datos.
   const handleClick = async e => {
      e.preventDefault();
      const request = {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(user),
      };
      try {
         const response = await fetch(
            "http://localhost:3001/register",
            request
         );

         if (response.ok) {
            setCorrectUser("User registered successfully");

            setTimeout(() => {
               nav("/");
            }, 2000);
         } else {
            setWrongUser("Fields cannot be empty");

            setTimeout(() => {
               setWrongUser(false);
            }, 2000);
         }
      } catch (err) {
         console.log(err);
      }
   };

   return (
      <UserForm handleBgClick={handleBgClick} isDark={isDark} navClick={navClick}>
         <main
            style={{
               backgroundColor: isDark ? colorPalette[4] : colorPalette[4],
            }}
            className="form"
         >
            <header>
               <img className="logo" src="/logo-transparent.png" alt="Logo" />

               {wrongUser && <p className="alert-user">{wrongUser}</p>}

               {correctUser && <p className="correct-user">{correctUser}</p>}

               <p>
                  Do you have an account?{" "}
                  <a className="nav-signin" href="/">
                     Sign In
                  </a>
               </p>
            </header>

            <form onSubmit={e => handleClick(e)}>
               <TextField
                  classContainer="username-container"
                  isDark={isDark}
                  src="/username.svg"
                  alt="User Icon"
                  type="text"
                  classInput={`username ${isDark ? 'dark-placeholder' : 'light-placeholder'}`}
                  name="username"
                  placeholder="Username"
                  onChange={handleChange}
               />

               <TextField
                  classContainer="email-container"
                  isDark={isDark}
                  src="/mail.svg"
                  alt="Mail Icon"
                  type="text"
                  classInput={`email ${isDark ? 'dark-placeholder' : 'light-placeholder'}`}
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
               />

               <TextField
                  classContainer="password-container"
                  isDark={isDark}
                  src="/password.svg"
                  alt="Password Icon"
                  type="password"
                  classInput={`password ${isDark ? 'dark-placeholder' : 'light-placeholder'}`}
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
               />

               <div className="button-container">
                  <Button className="submit-btn" type="submit" isDark={isDark}>
                     Sign Up
                  </Button>
               </div>
            </form>
         </main>
      </UserForm>
   );
}
