import { useState } from "react";
import styles from "./Expander.module.css";
import { ExpanderProps } from "./Expander.props";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { IconContext } from "react-icons/lib";
import cn from "classnames";

export function Expander({ title, children, className, isOpen, setOpen, onClick, accestor }: ExpanderProps) {
	const [expanded, setExpanded] = useState(isOpen ?? false);
	const handleHeaderClick = () => {
		setOpen && setOpen(accestor ?? "", !expanded);
		setExpanded((expanded) => !expanded);
	};
	return (
		<div className={cn(styles.expanderStyle, className)} onClick={onClick}>
			<div className={styles.headerStyle} onClick={handleHeaderClick}>
				<div className={styles.titleStyle}>{title}</div>
				<div className={styles.spacerStyle} />
				<IconContext.Provider value={{ color: "black", size: "25" }}>
					<div className={styles.iconStyle}>{expanded ? <SlArrowUp /> : <SlArrowDown />}</div>
				</IconContext.Provider>
			</div>
			<div className={cn({ [styles.contentExpandedStyle]: expanded, [styles.contentCollapsedStyle]: !expanded })}>
				{children}
			</div>
		</div>
	);
}
