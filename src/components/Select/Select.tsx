import { BigSelectProps, SelectProps } from "./Select.props";
import { ForwardedRef, forwardRef, useEffect, useState } from "react";
import styles from "./Select.module.css";
import cn from "classnames";
import { nanoid } from "nanoid";
import { Loader } from "../Loader/Loader";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import { FaAngleDoubleRight, FaAngleDoubleLeft } from "react-icons/fa";
import { SelectInterface } from "../../interface/Select.interface";

export const Select = forwardRef(
  ({ className, ...props }: SelectProps, ref: ForwardedRef<HTMLSelectElement>): JSX.Element => {
    return <select className={cn(className, styles.input)} ref={ref} {...props} />;
  }
);
