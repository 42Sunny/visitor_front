import { createContext, ReactNode, useState } from 'react';

type PropTypes = {
  children: ReactNode;
};

const LookupContext = createContext({});

const LookupProvider = ({ children }: PropTypes) => {
  const [reserve, setReserve] = useState(null);

  return (
    <LookupContext.Provider
      value={{
        reserve,
        setReserve,
      }}
    >
      {children}
    </LookupContext.Provider>
  );
};

export { LookupContext, LookupProvider };
