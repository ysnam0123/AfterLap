import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Preference {
  step: number;
  setStep: (step: number) => void;
  resetStep: () => void;

  selectedTeams: string[];
  selectedDrivers: string[];

  toggleTeam: (team: string) => void;
  toggleDriver: (driver: string) => void;

  reset: () => void;
}

export const usePreferenceStore = create<Preference>()(
  persist(
    (set, get) => ({
      step: 1,
      setStep: (step) => set({ step }),
      resetStep: () =>
        set({
          step: 1,
        }),

      selectedTeams: [],
      selectedDrivers: [],

      toggleTeam: (team) => {
        const prev = get().selectedTeams;

        if (prev.includes(team)) {
          set({
            selectedTeams: prev.filter((t) => t !== team),
          });
          return;
        }

        if (prev.length >= 2) return;

        set({
          selectedTeams: [...prev, team],
        });
      },

      toggleDriver: (driver) => {
        const prev = get().selectedDrivers;

        if (prev.includes(driver)) {
          set({
            selectedDrivers: prev.filter((d) => d !== driver),
          });
          return;
        }

        if (prev.length >= 6) return;

        set({
          selectedDrivers: [...prev, driver],
        });
      },

      reset: () => {
        set({
          step: 1,
          selectedTeams: [],
          selectedDrivers: [],
        });
      },
    }),
    {
      name: 'preference-storage',
    },
  ),
);
