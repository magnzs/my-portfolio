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
    openWindow: (title: string, content: React.ReactNode) => void
];