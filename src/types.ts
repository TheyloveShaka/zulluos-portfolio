import { WindowKey } from './contexts/WindowsContext'

export type WindowProps = {
    xpIcon: string;
    caption: string;
    elementId: WindowKey;
    close: () => void;
    openOrFocus: () => void;
    visibility: boolean;
    zIndex: number;
    gridColumnStart: number;
    gridRowStart: number;
  }
  
  