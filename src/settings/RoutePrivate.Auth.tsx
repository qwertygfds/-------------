import { Login } from "../page/Login/Login";
import { useAppSelector } from "../store/hooks/redux";

export const RequireAuth = ({ children }) => {
  const { token } = useAppSelector((state) => state.user);
  if (!token) {
    return <Login />;
  }

  return children;
};
