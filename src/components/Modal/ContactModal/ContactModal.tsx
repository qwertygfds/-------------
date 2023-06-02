import cn from "classnames";
import { useForm } from "react-hook-form";
import styles from "./ContactModal.module.css";
import { Input } from "../../Input/Input";
import { ContactInterface } from "../../../interface/Contact.interface";
import { Button } from "../../Button/Button";
import { useContext } from "react";
import { ModalContext } from "../../../context/Modal.context";
import { nanoid } from "nanoid";

export const ContactModal = (): JSX.Element => {
  const { handleSubmit, register } = useForm({ defaultValues: { phone: "", name: "" } });
  const { setIsOpen, setUpdatedItem } = useContext(ModalContext);

  const onSubmit = (formData: Pick<ContactInterface, "name" | "phone">) => {
    const contacts: ContactInterface[] = JSON.parse(localStorage.getItem("allContacts") ?? "[]");
    contacts.push({ id: nanoid(), ...formData });
    localStorage.setItem("allContacts", JSON.stringify(contacts));
    setIsOpen && setIsOpen(false);
    setUpdatedItem && setUpdatedItem(contacts.at(-1));
  };

  return (
    <form className={styles.mainDiv} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.div}>
        <label>Имя: </label>
        <Input {...register("name", { required: true })} />
      </div>
      <div className={styles.div}>
        <label>Номер телефона: </label>
        <Input type={"tel"} pattern="[0-9]{11}" {...register("phone", { required: true })} />
      </div>
      <Button className={styles.button} type={"submit"} appearance={"green"}>
        Добавить
      </Button>
    </form>
  );
};
