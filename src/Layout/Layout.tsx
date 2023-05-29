import { LayoutProps } from "./Layout.props";
import styles from "./Layout.module.css";
import { FunctionComponent } from "react";
import { LeftNavigationPanel } from "./LeftNavigationPanel/LeftNavigationPanel";
import { useAppSelector } from "../store/hooks/redux";
import { ModalContextProvider } from "../context/Modal.context";
import { ToastContainer } from "react-toastify";
import { ContextMenu } from "../components/ContextMenu/ContextMenu";

const Layout = ({ children }: LayoutProps): JSX.Element => {
  const { token } = useAppSelector((state) => state.user);
  return (
    <div className={styles.wrapper}>
      {token && <LeftNavigationPanel />}
      <main className={styles.data}>{children}</main>
    </div>
  );
};

export const withLayout = <T extends Record<string, unknown>>(Component: FunctionComponent<T>) => {
  return function withLayoutComponent(props: T): JSX.Element {
    return (
      <ModalContextProvider isOpen={false} body={undefined} header={undefined}>
        <Layout>
          <ContextMenu position={undefined} values={[]} selectedId={undefined} />
          <ToastContainer
            className={styles.tost}
            position="bottom-right"
            hideProgressBar={true}
            theme={"dark"}
            autoClose={3000}
          />
          <Component {...props} />
        </Layout>
      </ModalContextProvider>
    );
  };
};
