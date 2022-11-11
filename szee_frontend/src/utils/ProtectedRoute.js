import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ user, children }) => {
  if (user?.id) return children
  else return <Navigate to="/login" replace />
};

export default ProtectedRoute