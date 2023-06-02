import { createContext, PropsWithChildren, useState } from "react";
import { Modal } from "../components";
import { ContactInterface } from "../interface/Contact.interface";

export interface ModalContextInterface {
  isOpen: boolean;
  body: JSX.Element | undefined;
  header: string | undefined;
  updatedItem: ContactInterface | undefined;
  setIsOpen?: (value: boolean) => void;
  setBody?: (body: JSX.Element | undefined) => void;
  setHeader?: (header: string | undefined) => void;
  setUpdatedItem?: (item: any | undefined) => void;
}

export const ModalContext = createContext<ModalContextInterface>({
  isOpen: false,
  body: undefined,
  header: undefined,
  updatedItem: undefined,
});

export const ModalContextProvider = ({ children }: PropsWithChildren<ModalContextInterface>): JSX.Element => {
  const [isOpenState, setIsOpenState] = useState<boolean>(false);
  const [bodyState, setBodyState] = useState<JSX.Element | undefined>(undefined);
  const [headerState, setHeaderState] = useState<string | undefined>(undefined);
  const [updatedItemState, setUpdatedItemState] = useState<ContactInterface | undefined>(undefined);

  const setIsOpen = (isOpen: boolean) => {
    setIsOpenState(isOpen);
  };
  const setBody = (newBody: JSX.Element | undefined) => {
    setBodyState(newBody);
  };
  const setHeader = (newHeader: string | undefined) => {
    setHeaderState(newHeader);
  };
  const setUpdatedItem = (item: ContactInterface | undefined) => {
    setUpdatedItemState(item);
  };

  return (
    <ModalContext.Provider
      value={{
        isOpen: isOpenState,
        body: bodyState,
        header: headerState,
        updatedItem: updatedItemState,
        setIsOpen,
        setBody,
        setHeader,
        setUpdatedItem,
      }}
    >
      <Modal />
      {children}
    </ModalContext.Provider>
  );
};
