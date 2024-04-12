// import { useContext, createContext, useState } from 'react';

// const AuthContext = createContext({
//    isAuthenticated: false,
// })

// export function AuthProvider({ children }) {
//    const [isAuth, setIsAuth] = useState(false);

//    const login = (user) => {
//       setIsAuth(true);
//    }

//    const logout = () => {
//       setIsAuth(false);
//    }

//    return (
//       <AuthContext.Provider value={{ isAuth, login, logout }}>
//          {children}
//       </AuthContext.Provider>
//    );
// }

// export const useAuth = () => {
//    return useContext(AuthContext);
// }