import Image from "next/image";

import { IconProps } from "@/features/program/types";

export default function Icon({
    programData: programItem,
    openWindow: onClick,
}: IconProps) {
    return (
        <div className="bg-white rounded">
            <Image src={programItem.iconPath} alt={programItem.name + " icon"} />
            <p>{programItem.name}</p>
        </div>
    );
}