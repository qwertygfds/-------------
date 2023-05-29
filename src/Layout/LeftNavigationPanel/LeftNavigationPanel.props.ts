import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";
import { IconType } from "react-icons/lib";

export interface SidebarProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export interface LeftNavItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	to: string;
	text: string;
	icon: ReactNode;
	isActive: boolean;
}
