import cn from "classnames";
import { Button, Input } from "../../components";
import { useAppDispatch } from "../../store/hooks/redux";
import { fetchUser } from "../../store/reducers/ActionCreator";
import { useForm } from "react-hook-form";
import styles from "./Login.module.css";

export interface DataLogin {
  idInstance: string;
  apiTokenInstance: string;
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
    defaultValues: {
      idInstance: "",
      apiTokenInstance: "",
    },
    mode: "all",
  });

  return (
    <form onSubmit={handleSubmit(authFun)} className={styles.login}>
      <h1>Вход</h1>
      <div
        className={cn(styles.inputBlock, {
          [styles.errorInput]: errors.idInstance,
        })}
      >
        <label htmlFor="idInstance">IdInstance</label>
        <Input
          type="text"
          id="userName"
          {...register("idInstance", {
            required: true,
          })}
          placeholder="idInstance"
        />
        {errors?.idInstance && <p>{errors.idInstance.message?.toString()}</p>}
        {errors?.idInstance && errors.idInstance.message === "" && <p>Необходимо заполнить поле</p>}
      </div>
      <div
        className={cn(styles.inputBlock, {
          [styles.errorInput]: errors.apiTokenInstance,
        })}
      >
        <label htmlFor="apiTokenInstance" className={cn("required")}>
          ApiTokenInstance
        </label>
        <Input
          id="apiTokenInstance"
          {...register("apiTokenInstance", {
            required: true,
          })}
          placeholder="apiTokenInstance"
        />
        {errors?.apiTokenInstance && <p>{errors.apiTokenInstance.message?.toString()}</p>}
        {errors?.apiTokenInstance && errors.apiTokenInstance.message === "" && <p>Необходимо заполнить поле</p>}
      </div>
      <Button appearance="green" type="submit">
        Войти
      </Button>
    </form>
  );
};
