import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useThemeStore = create(
    persist(
        (set) => ({
            mode: "light",
            toggleTheme: () =>
                set((state) => ({
                    mode: state.mode === "light" ? "dark" : "light",
                })),
        }),
        {
            name: "moon-theme-mode",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ mode: state.mode }),
        }
    )
);

export default useThemeStore;
