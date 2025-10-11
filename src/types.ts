import React from "react";

export enum ProgramType {
    Portfolio,
}

export interface ProgramData {
    id: number,
    window: WindowHandler,

    name: string,
    content: React.ReactNode
}

export interface WindowHandler {
    id: number,
    program: ProgramData,
    isMaximized: boolean,


}