import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { axiosPrivate } from "../../settings/axios";
import { toast } from "react-toastify";

interface propsData {
  idInstance: string;
  apiTokenInstance: string;
}

export const fetchUser = createAsyncThunk<{}, propsData>("user/fetchLogin", async (formData, thunkAPI) => {
  try {
    const { status, data } = await axiosPrivate.get(
      `waInstance${formData.idInstance}/getStateInstance/${formData.apiTokenInstance}`
    );
    if (status === 200 && data.stateInstance === "authorized") {
      Cookies.set("idInstance", formData.idInstance);
      Cookies.set("apiTokenInstance", formData.apiTokenInstance);
      return formData;
    }
  } catch (e) {
    console.log(e);
  }
  toast.error("Ошибка! Проверьте правильность логина и пароля");
  return thunkAPI.rejectWithValue({ error: "Ошибка, проверте введенные данные" });
});
