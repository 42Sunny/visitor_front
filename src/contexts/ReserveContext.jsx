import useDate from 'hooks/useDate';
import usePlace from 'hooks/usePlace';
import usePurpose from 'hooks/usePurpose';
import useTargetStaffName from 'hooks/useTargetStaffName';
import useVisitor from 'hooks/useVisitor';
import { createContext, useEffect, useState } from 'react';
import makeVisitor from 'tools/makeVisitor';

const ReserveContext = createContext({});

const isAvailableSubmit = (
  isPolicyChecked,
  errorDateMessage,
  errorPlaceMessage,
  errorPurposeMessage,
  errorTargetStaffNameMessage,
  errorVisitorMessage,
) =>
  isPolicyChecked === true &&
  errorDateMessage === '' &&
  errorPlaceMessage === '' &&
  errorPurposeMessage === '' &&
  errorTargetStaffNameMessage === '' &&
  errorVisitorMessage === '';

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
  const [isSubmitButtonAcitve, setIsSubmitButtonAcitve] = useState(false);

  useEffect(() => {
    setIsSubmitButtonAcitve(
      isAvailableSubmit(
        isPolicyChecked,
        errorDateMessage,
        errorPlaceMessage,
        errorPurposeMessage,
        errorTargetStaffNameMessage,
        errorVisitorMessage,
      ),
    );
  }, [
    isPolicyChecked,
    errorDateMessage,
    errorPlaceMessage,
    errorPurposeMessage,
    errorTargetStaffNameMessage,
    errorVisitorMessage,
  ]);

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

        isSubmitButtonAcitve,
        setIsSubmitButtonAcitve,
      }}
    >
      {children}
    </ReserveContext.Provider>
  );
};

export { ReserveContext, ReserveProvider };
