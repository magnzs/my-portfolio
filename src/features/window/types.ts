import { ProgramData } from "@/features/program/types";

export type WindowItem = {
    id: number,
    title: string,

    isMaximized: boolean,

    onFocus: () => void,
    onClose: () => void,
    onChangeSize: () => void,

    content: React.ReactNode
};

export type UseWindowsManagerReturn = [
    windows: WindowItem[],
    openWindow: (programItem: ProgramData) => void
];