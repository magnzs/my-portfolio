import Image from "next/image";
import { motion, useDragControls, useMotionValue } from "motion/react";

import styles from "./Window.module.css";
import { WindowItem } from "./types";
import { OS_CONSTS } from "@/features/desktop/config";

const WIDTH: number = 400;
const HEIGHT: number = WIDTH * .75;
const HEADER_HEIGHT: number = 32;

export default function Window({
    title,
    isMaximized,
    onFocus,
    onClose,
    onChangeSize,
    content
}: WindowItem) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const dragControls = useDragControls();
    const constraints = {
        left: 0,
        top: 0,
        right: window.innerWidth - WIDTH,
        bottom: window.innerHeight - OS_CONSTS.TASKBAR_HEIGHT - HEADER_HEIGHT,
    };
    
    const handleDragStart = (e: React.PointerEvent) => {
        e.preventDefault(); // Previne seleção de texto ao arrastar janela
        dragControls.start(e);
    };

    return (
        <motion.section
            className={styles.window}
            style={{ 
                x: isMaximized ? 0 : x,
                y: isMaximized ? 0 : y,
                width: isMaximized ? "100%" : WIDTH, 
                height: isMaximized ? "100%" : HEIGHT, 
            }}
            
            drag={!isMaximized}
            dragConstraints={isMaximized ? undefined : constraints}
            dragMomentum={false}
            dragControls={dragControls}
            dragListener={false}

            onPointerDown={onFocus}
        >
            <header className={styles.header}
                style={{ height: HEADER_HEIGHT }}
                onPointerDown={handleDragStart}
            >
                <div className={styles.headerLeft}>
                    <Image src={"/globe.svg"} alt="icon" width={16} height={16} />
                    <h2 className={styles.windowTitle}>{title}</h2>
                </div>
                <div className={styles.windowButtons}>
                    <WindowButton imgPath="/file.svg" alt="maximizar" onClick={onChangeSize} />
                    <WindowButton imgPath="/globe.svg" alt="fechar" onClick={onClose} />
                    <div>C</div>
                </div>
            </header>
            <section className={styles.contentArea}>
                {content}
            </section> 
        </motion.section>
    );
}

type WindowButtonParams = {
    imgPath: string,
    alt: string,
    onClick: () => void,
}

function WindowButton({imgPath, alt, onClick}: WindowButtonParams) {
    return (
        <button className={styles.windowButton}
            onClick={onClick}
            onPointerDown={e => e.stopPropagation()} // Previne que a janela seja arrastada
        >
            <Image src={imgPath} alt={alt} width={16} height={16} />
        </button>
    );
}