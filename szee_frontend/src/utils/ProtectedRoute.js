import { Navigate } from "react-router-dom";
import LoadingPage from "../pages/LoadingPage/LoadingPage";

const ProtectedRoute = ({ user, children }) => {
  if(!user.loaded) return <LoadingPage />
  else if (user?.id) return children
  else return <Navigate to="/login" replace />
};

export default ProtectedRoute