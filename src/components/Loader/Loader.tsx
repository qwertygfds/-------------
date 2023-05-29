import styles from "./Loader.module.css";
import { LoaderProps } from "./Loader.props";
import cn from "classnames";

export const Loader = ({ appearance = "small", style }: LoaderProps): JSX.Element => {
	return (
		<div
			className={cn({ [styles.loader]: appearance === "big", [styles.smallloader]: appearance === "small" })}
			style={style}
		>
			<div className={cn({ [styles.ldsRing]: appearance === "big", [styles.smallldsRing]: appearance === "small" })}>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
};

export const LineLoader = ({ style }: LoaderProps): JSX.Element => {
	return (
		<div className={styles.ldsEllipsis}>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
};
