import cn from "classnames";
import { Button, Input, Loader } from "../../components";
import { useAppDispatch, useAppSelector } from "../../store/hooks/redux";
import { fetchUser } from "../../store/reducers/ActionCreator";
import { useForm } from "react-hook-form";
import styles from "./ChatsPage.module.css";
import { useContext, useEffect, useState } from "react";
import { ContactInterface, ContactType } from "../../interface/Contact.interface";
import { FaTrash, FaUser } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { ModalContext } from "../../context/Modal.context";
import { ContactModal } from "../../components/Modal/ContactModal/ContactModal";
import InputEmoji from "react-input-emoji";
import { axiosPrivate } from "../../settings/axios";
import { SendMessageInterface } from "../../interface/SendMessage.interface";
import { toast } from "react-toastify";
import { MessageHistoryInterface } from "../../interface/Message.interface";

export const ChatsPage = (): JSX.Element => {
  const { idInstance, apiTokenInstance } = useAppSelector((state) => state.user);

  const [allContacts, setAllContacts] = useState<ContactInterface[]>([]);
  const [allContactsFiltered, setAllContactsFiltered] = useState<ContactInterface[]>([]);
  const [contactsSearchString, setContactsSearchString] = useState<string>("");

  const [selectedContact, setSelectedContact] = useState<ContactInterface | undefined>(undefined);
  const [messageText, setMessageText] = useState<string>("");
  const [allMessages, setAllMessages] = useState<MessageHistoryInterface[]>([]);

  const [needToUpdate, setNeedToUpdate] = useState<boolean>(false);

  const { setBody, setHeader, setIsOpen, updatedItem } = useContext(ModalContext);

  useEffect(() => {
    const contact = JSON.parse(localStorage.getItem("allContacts") ?? "[]");
    setAllContacts(contact);
    setAllContactsFiltered(contact);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (updatedItem) {
      allContacts.push(updatedItem);
      setAllContacts([...allContacts]);
      setAllContactsFiltered([...allContacts]);
      setContactsSearchString("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatedItem]);

  useEffect(() => {
    selectedContact && updateChat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedContact]);

  useEffect(() => {
    const elem = document.getElementById("messagesDiv");
    elem && (elem.scrollTop = elem.scrollHeight);
  }, [allMessages]);

  useEffect(() => {
    needToUpdate && selectedContact && updateChat();
    setNeedToUpdate(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [needToUpdate]);

  const filterContact = (search: string) => {
    setAllContactsFiltered(allContacts.filter((x) => x.name.includes(search) || x.phone.includes(search)));
  };

  const addContact = () => {
    setHeader && setHeader("Добавление контакта");
    setBody && setBody(<ContactModal />);
    setIsOpen && setIsOpen(true);
  };

  const deleteContact = (id: string) => {
    allContacts.splice(
      allContacts.findIndex((x) => x.id === id),
      1
    );
    setSelectedContact(undefined);
    setAllContacts([...allContacts]);
    setAllContactsFiltered([...allContacts]);
    localStorage.setItem("allContacts", JSON.stringify(allContacts));
  };

  const updateChat = async () => {
    if (selectedContact) {
      const formData: SendMessageInterface = {
        chatId: selectedContact.phone + ContactType.PERSON,
        message: messageText,
      };
      try {
        const { status, data } = await axiosPrivate.post(
          `waInstance${idInstance}/getChatHistory/${apiTokenInstance}`,
          JSON.stringify(formData)
        );
        if (status === 200) {
          setAllMessages(
            data
              .filter(
                (x: MessageHistoryInterface) =>
                  x.typeMessage === "textMessage" || x.typeMessage === "extendedTextMessage"
              )
              .reverse()
          );
        }
      } catch (e: any) {
        toast.error("Ошибка!");
        console.log(e);
      }
      setTimeout(() => setNeedToUpdate(true), 10000);
    }
  };

  const sendMessage = async () => {
    if (selectedContact) {
      try {
        const formData: SendMessageInterface = {
          chatId: selectedContact.phone + ContactType.PERSON,
          message: messageText,
        };
        const { status } = await axiosPrivate.post(
          `waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
          JSON.stringify(formData)
        );
        if (status === 200) {
          allMessages.push({ type: "outgoing", textMessage: messageText } as MessageHistoryInterface);
          setAllMessages([...allMessages]);
          setMessageText("");
        }
      } catch (e: any) {
        toast.error("Ошибка!");
        console.log(e);
      }
    }
  };

  return (
    <div className={styles.mainDiv}>
      <div className={styles.children}>
        <div className={styles.leftPanel}>
          <div className={styles.header}>
            <Button appearance={"green"} onClick={() => addContact()}>
              Добавить контакт
            </Button>
          </div>
          {allContacts.length !== 0 ? (
            <div className={styles.inner}>
              <Input
                className={styles.input}
                value={contactsSearchString}
                onChange={(e) => {
                  filterContact(e.target.value);
                  setContactsSearchString(e.target.value);
                }}
                placeholder="Введите номер или имя"
              />
              {allContactsFiltered.map((x) => (
                <div key={x.id} className={styles.messageDivBase}>
                  <div className={styles.contactItem} onClick={() => setSelectedContact(x)}>
                    <FaUser className={styles.icon} size={30} />
                    <div>
                      <p>
                        <b>{x.name}</b>
                      </p>
                      <p>{x.phone}</p>
                    </div>
                  </div>
                  <Button title={"Удалить"} appearance={"red"} onClick={() => deleteContact(x.id)}>
                    <FaTrash size={13} />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p>У Вас еще нет контактов</p>
          )}
        </div>
        {selectedContact ? (
          <div className={styles.rightPanel}>
            <div className={cn(styles.contactItem, styles.rightHeader)}>
              <FaUser className={styles.icon} size={30} />
              <div>
                <p>
                  <b>{selectedContact.name}</b>
                </p>
                <p>{selectedContact.phone}</p>
              </div>
            </div>
            <div id={"messagesDiv"} className={styles.messages}>
              {allMessages.length !== 0 ? (
                <>
                  {allMessages.map((message) => (
                    <div
                      key={message.idMessage}
                      className={styles.messageDiv}
                      style={{ "--justify": message.type === "incoming" ? "left" : "right" } as React.CSSProperties}
                    >
                      <div
                        className={styles.item}
                        style={
                          {
                            "--color":
                              message.type === "incoming"
                                ? "var(--textIncomingBackgroud)"
                                : "var(--textOutcomingBackgroud)",
                          } as React.CSSProperties
                        }
                      >
                        {message.textMessage}
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <p>Сообщений пока нет</p>
              )}
            </div>
            <div className={styles.inputBox}>
              <IoMdSend className={styles.icon} size={25} onClick={() => sendMessage()} />
              <InputEmoji
                value={messageText}
                onChange={setMessageText}
                cleanOnEnter
                onEnter={sendMessage}
                placeholder="Введите сообщение..."
              />
            </div>
          </div>
        ) : (
          <p>Выберите чат</p>
        )}
      </div>
    </div>
  );
};
