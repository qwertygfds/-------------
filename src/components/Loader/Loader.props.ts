import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface LoaderProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	appearance?: "small" | "big";
	type?: "line" | "circule";
}
