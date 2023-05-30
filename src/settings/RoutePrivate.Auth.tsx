import { Login } from "../page/Login/Login";
import { useAppSelector } from "../store/hooks/redux";

export const RequireAuth = ({ children }) => {
  const { idInstance } = useAppSelector((state) => state.user);
  if (!idInstance) {
    return <Login />;
  }

  return children;
};
