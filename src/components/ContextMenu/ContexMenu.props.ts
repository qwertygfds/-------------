import { ReactNode } from "react";

export interface ContextMenuProps {
  values: ContextMenuItemProps[];
  position: MouseEvent | undefined;
  selectedId: string | undefined;
}

export interface ContextMenuItemProps {
  func: (id: string | undefined) => void;
  label: string;
  icon?: ReactNode;
}

export interface ContextMenuPosition {
  x: number;
  y: number;
}
