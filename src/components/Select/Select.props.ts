import { DetailedHTMLProps, HtmlHTMLAttributes, InputHTMLAttributes, SelectHTMLAttributes } from "react";
import { ContextMenuProps } from "../ContextMenu/ContexMenu.props";
import { SelectInterface } from "../../interface/Select.interface";

export interface SelectProps extends DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {}

export interface BigSelectProps extends DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
  selectChange?: (selectedId: SelectInterface[] | undefined) => void;
  isFilterVisible?: boolean;
  options: SelectInterface[] | undefined;
  header?: string | undefined;
  selectedId: string[];
  contextMenuVales?: ContextMenuProps;
}
