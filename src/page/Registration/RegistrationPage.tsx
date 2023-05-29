import { useForm } from "react-hook-form";
import cn from "classnames";
import { Button, Input, Select } from "../../components";
import { useAppDispatch } from "../../store/hooks/redux";
import { fetchUser } from "../../store/reducers/ActionCreator";
import styles from "./Registration.module.css";
import { SelectInterface } from "../../interface/Select.interface";
import { useEffect, useState } from "react";
import { axiosPrivate } from "../../settings/axios";
import { toast } from "react-toastify";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router";

interface RegFormData {
  fullName: string;
  email: string;
  phone: string;
  login: string;
  groupId: string;
}
export const RegistrationPage = (): JSX.Element => {
  const navigate = useNavigate();
  const [allGroupsSelect, setAllGroupsSelect] = useState<SelectInterface[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const groupsRes = await axiosPrivate.get(`/group/select`);
        if (groupsRes.status === 200) {
          setAllGroupsSelect(groupsRes.data);
        }
      } catch (e: any) {
        toast.error("Ошибка! " + e.message);
      }
    })();
  }, []);

  const regFun = async (formData: any) => {
    const values: RegFormData = {
      fullName: formData.name + " " + formData.surname + " " + formData.lastName,
      email: formData.email,
      phone: formData.phone,
      login: formData.login,
      groupId: formData.groupId,
    };
    console.log(values);
    try {
      const { data, status } = await axiosPrivate.post(`register`, JSON.stringify(values));
      if (status === 200) {
        console.log(data);
        toast.success("Пароль выслан Вам на почту!");
        navigate(`/`);
      }
    } catch (e: any) {
      toast.error("Ошибка! " + e.message);
    }
    //reset();
  };

  const { register, reset, handleSubmit } = useForm({
    mode: "onBlur",
  });

  return (
    <form onSubmit={handleSubmit(regFun)} className={styles.login}>
      <h1>Регистрация</h1>
      <div className={styles.inputBlock}>
        <label htmlFor="name">Имя</label>
        <Input
          {...register("name", {
            required: true,
          })}
          required
          placeholder="Имя"
        />
      </div>
      <div className={styles.inputBlock}>
        <label htmlFor="lastName">Фамилия</label>
        <Input
          {...register("lastName", {
            required: true,
          })}
          required
          placeholder="Фамилия"
        />
      </div>
      <div className={styles.inputBlock}>
        <label htmlFor="surname">Отчество</label>
        <Input
          {...register("surname", {
            required: true,
          })}
          required
          placeholder="Отчество"
        />
      </div>
      <div className={styles.inputBlock}>
        <label htmlFor="phone">Телефон</label>
        <Input
          type={"tel"}
          {...register("phone", {
            required: true,
          })}
          required
          placeholder="Телефон"
        />
      </div>
      <div className={styles.inputBlock}>
        <label htmlFor="email">Почта</label>
        <Input
          type="email"
          {...register("email", {
            required: true,
          })}
          required
          placeholder="Почта"
        />
      </div>
      <div className={styles.inputBlock}>
        <label htmlFor="login">Логин</label>
        <Input
          {...register("login", {
            required: true,
          })}
          required
          placeholder="Почта"
        />
      </div>
      <div className={styles.inputBlock}>
        <label htmlFor="groupId">Группа</label>
        <Select
          {...register("groupId", {
            required: true,
          })}
        >
          <option value={-1}>Выберите группу</option>
          {allGroupsSelect.map((x) => (
            <option key={nanoid()} value={x.id}>
              {x.name}
            </option>
          ))}
        </Select>
      </div>
      <Button appearance="green" type="submit">
        Зарегестрироватся
      </Button>
    </form>
  );
};
