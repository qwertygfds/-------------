import cn from "classnames";
import { Button, Input } from "../../components";
import { useAppDispatch } from "../../store/hooks/redux";
import { fetchUser } from "../../store/reducers/ActionCreator";
import { useForm } from "react-hook-form";
import styles from "./Login.module.css";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

export interface DataLogin {
  userName: string;
  password: string;
}

export const Login = () => {
  const dispatch = useAppDispatch();

  const authFun = async (formData: any) => {
    await dispatch(fetchUser(formData));
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "all",
  });

  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar={true} theme={"dark"} autoClose={3000} />
      <form onSubmit={handleSubmit(authFun)} className={styles.login}>
        <h1>Вход</h1>
        <div
          className={cn(styles.inputBlock, {
            [styles.errorInput]: errors.userName,
          })}
        >
          <label className={cn("required")} htmlFor="userName">
            Логин
          </label>
          <Input
            type="text"
            id="userName"
            {...register("username", {
              required: true,
            })}
            placeholder="Логин"
          />
          {errors?.userName && <p>{errors.userName.message?.toString()}</p>}
          {errors?.userName && errors.userName.message === "" && <p>Необходимо заполнить поле</p>}
        </div>
        <div
          className={cn(styles.inputBlock, {
            [styles.errorInput]: errors.password,
          })}
        >
          <label htmlFor="password" className={cn("required")}>
            Пароль
          </label>
          <Input
            type="password"
            id="password"
            {...register("password", {
              required: true,
            })}
            placeholder="Пароль"
          />
          {errors?.password && <p>{errors.password.message?.toString()}</p>}
          {errors?.password && errors.password.message === "" && <p>Необходимо заполнить поле</p>}
        </div>
        <Button appearance="green" type="submit">
          Войти
        </Button>
        <div className={styles.flex}>
          <Link to={"/registration"}>Зарегистрироваться</Link>
          <Link to={"/newlogin"}>Не могу зайти в аккаунт</Link>
        </div>
      </form>
    </>
  );
};
