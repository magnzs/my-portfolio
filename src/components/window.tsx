import Image from "next/image";
import {motion, useDragControls} from "framer-motion";

export interface WindowProps {
    title: string,
    zindex: number,
    width?: number,
    height?: number,
    children: React.ReactNode,
    onPointerDown: () => void
}

export default function Window({title, zindex, width=600, height=300, children, onPointerDown}: WindowProps) {
    const dragControls = useDragControls();

    const headerHeight: number = 30;

    const constraints = {
        left: 0,
        top: 0,
        right: window.innerWidth - width,
        bottom: window.innerHeight - headerHeight,
    };

    const images = [
        {src: "/globe.svg", alt: "Tecla Cheia"},
        {src: "/window.svg", alt: "Sair"}
    ];

    return (
        <motion.div className="absolute h-auto flex flex-col bg-blue-200"
            style={{zIndex: zindex, width: width}}
            onPointerDown={onPointerDown}
            drag
            dragMomentum={false}
            dragControls={dragControls}
            dragListener={false}
            dragConstraints={constraints}
        >
            {/* Barra superior da janela */}
            <div className="flex justify-between items-center w-full p-1 border select-none"
                style={{height: headerHeight}}
                onPointerDown={e => dragControls.start(e)}
            >
                <span>{title}</span>
                <ul className="flex gap-2">
                    {images.map((img, i) =>
                        <Image key={i} src={img.src} alt={img.alt} width={16} height={16} />
                    )}
                </ul>
            </div>

            {/* Conteúdo da janela */}
            <div className="border"
                style={{height: height}}
            >
                {children}
            </div>
        </motion.div>
    );
}