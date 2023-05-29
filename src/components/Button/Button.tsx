import { ButtonProps } from "./Button.props";
import cn from "classnames";
import styles from "./Button.module.css";

export const Button = ({ appearance = "gray", className, children, ...props }: ButtonProps): JSX.Element => {
	return (
		<button
			className={cn(styles.button, className, {
				[styles.gray]: appearance === "gray",
				[styles.green]: appearance === "green",
				[styles.red]: appearance === "red",
			})}
			{...props}
		>
			{children}
		</button>
	);
};
