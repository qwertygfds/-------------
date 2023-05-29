/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-lone-blocks */
import { Route, Routes } from "react-router-dom";
import { withLayout } from "./Layout/Layout";
import { NotPage } from "./page/NotPage/NotPage";
import { useDispatch } from "react-redux";
import { userSlice } from "./store/reducers/UserSlice";
import { RequireAuth } from "./settings/RoutePrivate.Auth";
import { RegistrationPage } from "./page/Registration/RegistrationPage";

function App() {
  const dispatch = useDispatch();

  setInterval(() => {
    dispatch(userSlice.actions.userAutoLogin());
  }, 1);

  return (
    <Routes>
      {/* <Route
        path="/directories"
        element={
          <RequireAuth>
            <DirectoryPage />
          </RequireAuth>
        }
      /> */}
      <Route path="*" element={<NotPage />} />
      <Route path="/registration" element={<RegistrationPage />} />
    </Routes>
  );
}

export default withLayout(App);
