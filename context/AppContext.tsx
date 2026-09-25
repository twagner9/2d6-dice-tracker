import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface AppContextType {
  refreshHistoryData: boolean;
  setRefreshHistoryData: Dispatch<SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [refreshHistoryData, setRefreshHistoryData] = useState<boolean>(false);

  return (
    <AppContext.Provider value={{ refreshHistoryData, setRefreshHistoryData }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === null) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
};
