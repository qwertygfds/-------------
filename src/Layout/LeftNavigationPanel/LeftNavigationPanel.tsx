import { LeftNavItemProps, SidebarProps } from "./LeftNavigationPanel.props";
import styles from "./LeftNavigationPanel.module.css";
import cn from "classnames";
import { Link } from "react-router-dom";
import { FaBook, FaHome, FaPowerOff, FaAlignLeft } from "react-icons/fa";
import React, { ReactNode, useEffect, useState } from "react";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";
import { AiOutlineLink, AiOutlineSchedule } from "react-icons/ai";
import { IoIosPeople, IoMdSchool } from "react-icons/io";
import { IconContext } from "react-icons/lib";
import { useDispatch } from "react-redux";
import { userSlice } from "../../store/reducers/UserSlice";
import { nanoid } from "nanoid";

interface Field {
  to: string;
  text: string;
  icon: ReactNode;
  isActive: boolean;
}
export const LeftNavigationPanel = ({ className, ...props }: SidebarProps): JSX.Element => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(
    "/" + window.location.href.split("/")[window.location.href.split("/").length - 1]
  );
  const [allLinks, setAllLinks] = useState<Field[]>([
    { to: "/", text: "Главная", icon: <FaHome size={25} />, isActive: false },
    { to: "/schedule", text: "Расписание", icon: <AiOutlineSchedule size={25} />, isActive: false },
    { to: "/methodpackages", text: "Методпакеты", icon: <FaBook size={25} />, isActive: false },
    { to: "/students", text: "Студенты", icon: <IoIosPeople size={25} />, isActive: false },
    { to: "/homeworks", text: "Домашняя работа", icon: <IoMdSchool size={25} />, isActive: false },
    { to: "/resources", text: "Ресурсы", icon: <AiOutlineLink size={25} />, isActive: false },
    { to: "/directories", text: "Справочники", icon: <FaAlignLeft size={25} />, isActive: false },
  ]);

  useEffect(() => {
    allLinks.map((x) => (x.to === selected ? (x.isActive = true) : (x.isActive = false)));
    setAllLinks(allLinks.map((x) => x));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const LeftNavItem = ({ to, text, icon, isActive }: LeftNavItemProps): JSX.Element => {
    return (
      <li className={styles.link} onClick={() => setSelected(to)}>
        <Link to={to} className={isActive ? styles["selected"] : styles[""]}>
          {icon}
          <span className={cn(styles.text, { [styles.textCollapse]: isOpen === false })}>{text}</span>
        </Link>
      </li>
    );
  };

  return (
    <>
      <IconContext.Provider value={{ color: "var(--navigationPanelText)" }}>
        <React.StrictMode>
          <nav
            className={cn(styles.sidebar, {
              [styles.active]: isOpen === true,
            })}
          >
            <li
              onClick={() => setIsOpen(!isOpen)}
              className={cn(styles.link, styles.arrow)}
              style={{ paddingLeft: "12.5px" }}
            >
              {isOpen ? <SlArrowLeft size={30} /> : <SlArrowRight size={30} />}
            </li>
            <div className={styles.scroll}>
              {allLinks.map((x) => (
                <LeftNavItem key={nanoid()} to={x.to} text={x.text} icon={x.icon} isActive={x.isActive} />
              ))}
              <li
                className={styles.exit}
                style={{ marginTop: "auto", marginBottom: "10px" }}
                onClick={() => dispatch(userSlice.actions.userLogout())}
              >
                <FaPowerOff size={25} />
                <span className={cn(styles.text, { [styles.textCollapse]: isOpen === false })}>Выход</span>
              </li>
            </div>
          </nav>
        </React.StrictMode>
      </IconContext.Provider>
    </>
  );
};
