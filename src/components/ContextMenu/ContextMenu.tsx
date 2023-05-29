import styles from "./ContextMenu.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import { IconContext } from "react-icons/lib";
import cn from "classnames";
import { ContextMenuPosition, ContextMenuProps } from "./ContexMenu.props";

export const ContextMenu = ({ values, position, selectedId }: ContextMenuProps): JSX.Element => {
  //const { showContext, position, values, selectedElementId, setCloseContext } = useContext(ContextMenuContext);
  const [isClosed, setIsClosed] = useState<boolean>(false);

  const getPosition = (e: MouseEvent | undefined) => {
    if (e === undefined) return;
    var posx = 0;
    var posy = 0;

    if (e.pageX || e.pageY) {
      posx = e.pageX;
      posy = e.pageY;
    } else if (e.clientX || e.clientY) {
      posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

    return {
      x: posx,
      y: posy,
    };
  };

  useEffect(() => {
    setIsClosed(false);
  }, [position]);

  useEffect(() => {
    document.addEventListener("click", (e) => setIsClosed(true));
    document.addEventListener("scroll", (e) => setIsClosed(true));
    setIsClosed(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <IconContext.Provider value={{ color: "var(--black)", size: "17" }}>
      <div
        style={(function () {
          const res = getPosition(position);
          return { top: res?.y, left: res?.x };
        })()}
        className={cn(styles.customContextMenu, { [styles.hide]: isClosed })}
      >
        {values?.map((x) => (
          <div
            key={nanoid()}
            className={styles.optionDiv}
            onClick={() => {
              x.func(selectedId);
            }}
          >
            <span className={styles.icon}>{x.icon}</span>
            <span className={styles.border}>{"ㅤ"}</span>
            <span className={styles.option}>{x.label}</span>
          </div>
        ))}
      </div>
    </IconContext.Provider>
  );
};
