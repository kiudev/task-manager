import { useNavigate } from "react-router-dom";
import "../styles/form.css";
import { useState } from "react";
import { colorPalette } from "../color-palette";
import Button from "../components/Button";
import TextField from "../components/TextField";
import UserForm from "../layout/UserForm";

// Esta es la vista principal de la aplicación para que podamos iniciar sesión.
export function SignIn() {
   // Declaro estados para almacenar y actualizarlos después.
   const [user, setUser] = useState({
      email: "",
      password: "",
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

   // Obtiene los datos que escribo en los campos para iniciar sesión.
   const handleChange = value => {
      setUser(prev => ({ ...prev, [value.target.name]: value.target.value }));
   };

   // Función para manejar el botón cuando inicias sesión para redirigirme al panel con el nombre de usuario, por defecto será Guest si es un usuario invitado.
   const navClick = () => {
      nav("/home", { state: { user: { username: "Guest" } } });
   };

   // Maneja los datos del usuario para validar que están registrados en la base de datos.
   const handleClick = async e => {
      e.preventDefault();
      try {
         const response = await fetch("http://localhost:3001/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
         });

         if (response.ok) {
            setCorrectUser("User logged");

            const userData = await response.json();

            setUser(prev => ({
               ...prev,
               userId: userData.userId,
               username: userData.username,
            }));

            setTimeout(() => {
               nav("/home", { state: { user: userData } });
            }, 2000);
         } else {
            setWrongUser("User not found");

            setTimeout(() => {
               setWrongUser(false);
            }, 2000);
         }
      } catch (err) {
         setWrongUser("Server is not running");
         console.log(err);
      }
   };

   return (
      <UserForm
         isDark={isDark}
         handleBgClick={handleBgClick}
         navClick={navClick}
      >
         <main
            style={{
               backgroundColor: isDark ? colorPalette[4] : colorPalette[4],
            }}
            className="form"
         >
            <header>
               <img className="logo" src="/logo-transparent.png" alt="Logo" />

               <h1 className="welcome-user">Welcome, user!</h1>

               {wrongUser && <p className="alert-user">{wrongUser}</p>}

               {correctUser && <p className="correct-user">{correctUser}</p>}

               <p style={{ marginBottom: "10px" }}>
                  Don&apos;t have an account yet?{" "}
                  <a className="nav-signup" href="/account">
                     Sign Up
                  </a>
               </p>
            </header>

            <form onSubmit={e => handleClick(e)} method="post">
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
                     Sign In
                  </Button>
               </div>
            </form>
         </main>
      </UserForm>
   );
}
