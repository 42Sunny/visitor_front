import { createContext, ReactNode, useState } from 'react';

type PropTypes = {
  children: ReactNode;
};

type LookUpContextTypes = {
  reserves: Reserve[];
  setReserves: React.Dispatch<React.SetStateAction<Reserve[]>>;
};

const LookupContext = createContext<LookUpContextTypes>({
  reserves: [],
  setReserves: () => {},
});

const LookupProvider = ({ children }: PropTypes) => {
  const [reserves, setReserves] = useState<Reserve[]>([]);

  return (
    <LookupContext.Provider
      value={{
        reserves,
        setReserves,
      }}
    >
      {children}
    </LookupContext.Provider>
  );
};

export { LookupContext, LookupProvider };
