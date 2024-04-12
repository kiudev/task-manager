import { Navigate, useLocation } from 'react-router-dom';
import { App } from '../App';

// Protege la ruta al acceder al panel de tareas, si no hemos iniciado sesión no podremos acceder de ninguna manera.
export const ProtectedRoute = () => {
   const location = useLocation();

   const user = location.state ? location.state.user : null;

   if (!user) {
      return <Navigate to='/' />;
   } else {
      return <App />;
   }
};
