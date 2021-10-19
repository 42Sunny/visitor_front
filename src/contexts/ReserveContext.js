import useDate from 'hooks/useDate';
import usePlace from 'hooks/usePlace';
import usePurpose from 'hooks/usePurpose';
import useTargetStaffName from 'hooks/useTargetStaffName';
import useVisitor from 'hooks/useVisitor';
import { createContext, useState } from 'react';
import makeVisitor from 'tools/makeVisitor';

const ReserveContext = createContext({});

const ReserveProvider = ({ children }) => {
  const [date, setDate, errorDateMessage, setErrorDateMessage] = useDate(new Date());
  const [place, setPlace, errorPlaceMessage, setErrorPlaceMessage] = usePlace('개포');
  const [purpose, setPurpose, errorPurposeMessage, setErrorPurposeMessage] = usePurpose('');
  const [
    targetStaffName,
    setTargetStaffName,
    errorTargetStaffNameMessage,
    setErrorTargetStaffNameMessage,
  ] = useTargetStaffName('');
  const [visitor, setVisitor, errorVisitorMessage, setErrorVisitorMessage] = useVisitor([
    makeVisitor(),
  ]);
  const [isPolicyChecked, setIsPolicyChecked] = useState(false);

  return (
    <ReserveContext.Provider
      value={{
        date,
        setDate,
        errorDateMessage,
        setErrorDateMessage,

        place,
        setPlace,
        errorPlaceMessage,
        setErrorPlaceMessage,

        purpose,
        setPurpose,
        errorPurposeMessage,
        setErrorPurposeMessage,

        targetStaffName,
        setTargetStaffName,
        errorTargetStaffNameMessage,
        setErrorTargetStaffNameMessage,

        visitor,
        setVisitor,
        errorVisitorMessage,
        setErrorVisitorMessage,

        isPolicyChecked,
        setIsPolicyChecked,
      }}
    >
      {children}
    </ReserveContext.Provider>
  );
};

export { ReserveContext, ReserveProvider };
