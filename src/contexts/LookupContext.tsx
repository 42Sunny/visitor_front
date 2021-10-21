import { createContext, ReactNode, useState } from 'react';

interface PropsType {
  children: ReactNode;
}

const LookupContext = createContext({});

const LookupProvider = ({ children }: PropsType) => {
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
