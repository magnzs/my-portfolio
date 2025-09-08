import { create } from "zustand";

interface OSState {
    navbarHeight: number,
}

export const useOSStore = create<OSState>(set => ({
    navbarHeight: 32,
}));
