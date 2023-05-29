import { InputProps } from "./Input.props";
import { ForwardedRef, forwardRef } from "react";
import styles from "./Input.module.css";
import cn from "classnames";
export const Input = forwardRef(
	({ className, value, onChange, ...props }: InputProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element => {
		return (
			<input
				className={cn(className, styles.input)}
				onChange={(e) => {
					onChange && onChange(e);
				}}
				value={value}
				ref={ref}
				{...props}
			/>
		);
	}
);
