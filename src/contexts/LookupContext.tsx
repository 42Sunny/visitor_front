import { createContext, ReactNode, useState } from 'react';

type PropTypes = {
  children: ReactNode;
};

type LookUpContextTypes = {
  reserves: reserve[];
  setReserves?: React.Dispatch<React.SetStateAction<reserve[]>>;
};

const LookupContext = createContext<LookUpContextTypes>({
  reserves: [],
});

const LookupProvider = ({ children }: PropTypes) => {
  const [reserves, setReserves] = useState<reserve[]>([]);

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
