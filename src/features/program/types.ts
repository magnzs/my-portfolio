export interface ProgramData {
    name: string,
    iconPath: string,
    content: React.ReactNode
};

export type IconProps = {
    programData: ProgramData
    openWindow: (programData: ProgramData) => void
};