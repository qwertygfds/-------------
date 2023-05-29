import { useContext, useEffect, useRef } from "react";
import { GrClose } from "react-icons/gr";
import styles from "./Modal.module.css";
import { ModalContext } from "../../context/Modal.context";

export const Modal = (): JSX.Element => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const { setBody, setHeader, setIsOpen, isOpen, body, header } = useContext(ModalContext);
  const dialogNode = modalRef.current;

  useEffect(() => {
    if (dialogNode) {
      if (isOpen) {
        dialogNode.showModal();
        document.getElementsByTagName("body")[0].style.overflow = "hidden";
      } else {
        document.getElementsByTagName("body")[0].style.overflow = "";
        setBody && setBody(undefined);
        setHeader && setHeader(undefined);
        dialogNode.close();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    const modal = document.querySelector(".modal");
    modal?.addEventListener("mousedown", (e) => {
      if (e.target === modal) {
        setBody && setBody(undefined);
        setHeader && setHeader(undefined);
        closeModal();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.addEventListener("keyup", (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closeModal = () => {
    setIsOpen && setIsOpen(false);
    setBody && setBody(undefined);
    setHeader && setHeader(undefined);
  };

  return (
    <dialog ref={modalRef} className={styles.modal}>
      <div className={styles.modal__inner}>
        <div className={styles.headerModal}>
          {header}
          <GrClose
            size={30}
            className={styles.closeModal}
            color={"var(--black)"}
            onClick={() => setIsOpen && setIsOpen(false)}
          />
        </div>
        <div className={styles.bodyModal}>{body}</div>
      </div>
    </dialog>
  );
};
