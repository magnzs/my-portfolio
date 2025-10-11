"use client"

import { useEffect, useState } from "react";

import useWindowsManager from "@/features/window/useManager";
import Window from "@/features/window/Window";
import Icon from "@/features/program/Icon";

import { ProgramData } from "@/features/program/types";

import styles from "./Desktop.module.css";
import { OS_CONSTS } from "./config";

export default function Desktop() {
    const [windows, openWindow] = useWindowsManager();
    const [programs, setPrograms] = useState<ProgramData[]>([]);

    useEffect(() => {
        const data: ProgramData = {
            name: "teste",
            iconPath: "teste",
            content: <p>teste</p>
        };
        setPrograms([data]);
    }, []);

    return (
        <div className="h-screen flex flex-col">

            {/* Área de trabalho */}
            <section className="relative flex-1 overflow-hidden">
                <div className="h-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] bg-blue-200">
                    {programs.map((item, index) =>
                        <Icon key={index} programData={item} openWindow={openWindow} />
                    )}
                </div>

                {/* Janelas */}       
                <div className="absolute inset-0 pointer-events-none">
                    {windows.map(item =>
                        <Window key={item.id} {...item} />
                    )}
                </div>
            </section>

            {/* Taskbar */}
            <section className={styles.taskbar}
                style={{ height: OS_CONSTS.TASKBAR_HEIGHT }}
            >
                <div>Iniciar</div>
                <div className="flex gap-4">
                    Coisas do lado direito no navbar
                </div>
            </section>
        </div>
    );
}