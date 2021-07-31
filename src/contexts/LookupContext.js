import { createContext, useState } from 'react';

const LookupContext = createContext({});

const LookupProvider = ({ children }) => {
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
