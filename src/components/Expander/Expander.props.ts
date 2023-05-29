import { DetailedHTMLProps, HtmlHTMLAttributes } from "react";

export interface ExpanderProps extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	title: string;
	isOpen?: boolean;
	setOpen?: (accestor: string, value: boolean) => void;
	accestor?: string;
}
