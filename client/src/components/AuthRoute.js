import { getToken } from '../utils/StorageFunctions';
import { Navigate } from 'react-router-dom';

function RequireAuth({ children, redirectTo }) {
    let isAuthenticated = getToken();
    return isAuthenticated ? children : <Navigate to={redirectTo} />;
  }
  export default RequireAuth