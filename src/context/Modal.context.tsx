import { createContext, PropsWithChildren, useState } from "react";
import { Modal } from "../components";

export interface ModalContextInterface {
  isOpen: boolean;
  body: JSX.Element | undefined;
  header: string | undefined;
  setIsOpen?: (value: boolean) => void;
  setBody?: (Body: JSX.Element | undefined) => void;
  setHeader?: (Header: string | undefined) => void;
}

export const ModalContext = createContext<ModalContextInterface>({
  isOpen: false,
  body: undefined,
  header: undefined,
});

export const ModalContextProvider = ({ children }: PropsWithChildren<ModalContextInterface>): JSX.Element => {
  const [isOpenState, setIsOpenState] = useState<boolean>(false);
  const [BodyState, setBodyState] = useState<JSX.Element | undefined>(undefined);
  const [HeaderState, setHeaderState] = useState<string | undefined>(undefined);

  const setIsOpen = (isOpen: boolean) => {
    setIsOpenState(isOpen);
  };
  const setBody = (newBody: JSX.Element | undefined) => {
    setBodyState(newBody);
  };
  const setHeader = (newHeader: string | undefined) => {
    setHeaderState(newHeader);
  };

  return (
    <ModalContext.Provider
      value={{
        isOpen: isOpenState,
        body: BodyState,
        header: HeaderState,
        setIsOpen,
        setBody,
        setHeader,
      }}
    >
      <Modal />
      {children}
    </ModalContext.Provider>
  );
};
