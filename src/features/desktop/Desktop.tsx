"use client"

import useWindowsManager from "@/features/window/useManager";
import Window from "@/features/window/Window";
import styles from "./Desktop.module.css";
import { OS_CONSTS } from "./config";

export default function Desktop() {
    const [windows, openWindow] = useWindowsManager();

    return (
        <div className="h-screen flex flex-col">

            {/* Área do desktop */}
            <section className="relative flex-1 overflow-hidden">
                <h1>Grid de ícones aqui</h1>
                <button onClick={() => alert("teste")}>Botão de teste</button>

                {/* Janelas */}       
                <div className="absolute inset-0 pointer-events-none">
                    {windows.map(item =>
                        <Window key={item.id} {...item} />
                    )}
                </div>
            </section>

            <button className="absolute left-8 top-8 bg-blue-400 px-4 py-2 rounded-full shadow-sm text-white"
                onClick={() => openWindow("Minha Janela", <p>Conteúdo da janela</p>)}
            >
                Adicionar Janela Teste
            </button>

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