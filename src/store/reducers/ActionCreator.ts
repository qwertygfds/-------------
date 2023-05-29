import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { axiosPrivate } from "../../settings/axios";
import { toast } from "react-toastify";

interface propsData {
  userName: string;
  password: string;
}

export const fetchUser = createAsyncThunk<propsData, {}>("user/fetchLogin", async (formData, thunkAPI) => {
  try {
    const { data } = await axiosPrivate.post("login", formData);
    Cookies.set("token", data.token);
    Cookies.set("refreshToken", data.refreshToken);
    Cookies.set("expiration", data.expiration);
    return data;
  } catch (e) {
    toast.error("Ошибка! Проверьте правильность логина и пароля");
    return thunkAPI.rejectWithValue({ error: "Ошибка, проверте введенные данные" });
  }
});
