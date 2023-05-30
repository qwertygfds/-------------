/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-lone-blocks */
import { Route, Routes } from "react-router-dom";
import { withLayout } from "./Layout/Layout";
import { NotPage } from "./page/NotPage/NotPage";
import { useDispatch } from "react-redux";
import { userSlice } from "./store/reducers/UserSlice";
import { RequireAuth } from "./settings/RoutePrivate.Auth";

function App() {
  const dispatch = useDispatch();

  setInterval(() => {
    dispatch(userSlice.actions.userAutoLogin());
  }, 1);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequireAuth>
            <NotPage />
          </RequireAuth>
        }
      />
      <Route path="*" element={<NotPage />} />
    </Routes>
  );
}

export default withLayout(App);
