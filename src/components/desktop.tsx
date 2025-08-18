"use client"

import {useState} from "react";

import Window, {WindowProps} from "@/components/window";

export default function Desktop() {
    const [windows, setWindows] = useState<{id: number, win: WindowProps}[]>([]);

    const bringToFront = (id: number) => {
        setWindows(prev =>
            prev.map(w => ({
                ...w,
                win: {
                    ...w.win,
                    zindex: w.id === id ? 10 : 0,
                },
            }))
        );
    };

    const addWindow = () => {
        const id = windows.length > 0 ? windows[windows.length - 1].id + 1 : 0;
        const newWindow: WindowProps = {
            title: "Minha janela de id" + id,
            zindex: 0,
            children: <h1>oi</h1>,
            onPointerDown: () => bringToFront(id)
        };
        setWindows([...windows, {id: id, win: newWindow}]);
    };

    return (
        <div className="w-full h-screen">
            <button className="absolute left-0 top-0 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition"
                onClick={addWindow}
            >
                Adicionar janela
            </button>
            {windows.map(info => (
                <Window
                    key={info.id}
                    {...info.win}
                >
                    <h1>Site aqui</h1>
                </Window>
            ))}
        </div>
    );   
}