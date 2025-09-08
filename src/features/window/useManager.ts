import { useState, useRef } from "react";

import { UseWindowsManagerReturn, WindowItem } from "./types";

// Hook para gerenciar as janelas
export default function useWindowsManager(): UseWindowsManagerReturn {
    const [windows, setWindows] = useState<WindowItem[]>([]);

    // id único passado para cada janela, persistente entre renders
    const _currId = useRef(0);

    const focusWindow = (id: number) => {
        setWindows(prev => {
            const windowToFocus = prev.find(window => window.id === id);
            if (!windowToFocus) return prev;

            const otherWindows = prev.filter(window => window.id !== id);
            return [...otherWindows, windowToFocus];
        });
    };

    // fecha a janela com o id correspondente
    const closeWindow = (id: number) => {
        setWindows(prev =>
            prev.filter(window => window.id !== id)
        );
    };

    const changeWindowSize = (id: number) => {
        focusWindow(id);
        setWindows(prev =>
            prev.map(window =>
                window.id === id
                    ? {...window, isMaximized: !window.isMaximized}
                    : window
            )
        );
    };

    // adiciona uma nova janela
    const openWindow = (title: string, content: React.ReactNode) => {
        _currId.current++;
        const id = _currId.current;

        const newItem: WindowItem = {
            id: id,
            title: title,
            isMaximized: false,
            onFocus: () => focusWindow(id),
            onClose: () => closeWindow(id),
            onChangeSize: () => changeWindowSize(id),
            content: content
        };

        setWindows(prev => 
            [...prev, newItem]
        );
    };

    return [windows, openWindow];
}