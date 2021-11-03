import useDate from 'hooks/useDate';
import usePlace from 'hooks/usePlace';
import usePurpose from 'hooks/usePurpose';
import useTargetStaffName from 'hooks/useTargetStaffName';
import useVisitors from 'hooks/useVisitors';
import { ReactNode, createContext, useEffect, useState } from 'react';
import makeVisitor from 'tools/makeVisitor';

type PropTypes = {
  children: ReactNode;
};

export type ReserveContextTypes = {
  date?: Date;
  setDate?: React.Dispatch<React.SetStateAction<Date>>;
  errorDateMessage?: string;
  setErrorDateMessage?: React.Dispatch<React.SetStateAction<string>>;

  place?: string;
  setPlace?: React.Dispatch<React.SetStateAction<string>>;
  errorPlaceMessage?: string;
  setErrorPlaceMessage?: React.Dispatch<React.SetStateAction<string>>;

  purpose?: string;
  setPurpose?: React.Dispatch<React.SetStateAction<string>>;
  errorPurposeMessage?: string;
  setErrorPurposeMessage?: React.Dispatch<React.SetStateAction<string>>;

  targetStaffName?: string;
  setTargetStaffName?: React.Dispatch<React.SetStateAction<string>>;
  errorTargetStaffNameMessage?: string;
  setErrorTargetStaffNameMessage?: React.Dispatch<React.SetStateAction<string>>;

  visitors?: visitor[];
  setVisitors?: React.Dispatch<React.SetStateAction<visitor[]>>;
  errorVisitorMessage?: string;
  setErrorVisitorMessage?: React.Dispatch<React.SetStateAction<string>>;

  isPolicyChecked?: boolean;
  setIsPolicyChecked?: React.Dispatch<React.SetStateAction<boolean>>;

  isSubmitButtonAcitve?: boolean;
  setIsSubmitButtonAcitve?: React.Dispatch<React.SetStateAction<boolean>>;
};

const ReserveContext = createContext<ReserveContextTypes>({});

const isAvailableSubmit = (
  isPolicyChecked: boolean,
  errorDateMessage: string,
  errorPlaceMessage: string,
  errorPurposeMessage: string,
  errorTargetStaffNameMessage: string,
  errorVisitorMessage: string,
) =>
  isPolicyChecked === true &&
  errorDateMessage === '' &&
  errorPlaceMessage === '' &&
  errorPurposeMessage === '' &&
  errorTargetStaffNameMessage === '' &&
  errorVisitorMessage === '';

const ReserveProvider = ({ children }: PropTypes) => {
  const [date, setDate, errorDateMessage, setErrorDateMessage] = useDate(new Date());
  const [place, setPlace, errorPlaceMessage, setErrorPlaceMessage] = usePlace('개포');
  const [purpose, setPurpose, errorPurposeMessage, setErrorPurposeMessage] = usePurpose('');
  const [
    targetStaffName,
    setTargetStaffName,
    errorTargetStaffNameMessage,
    setErrorTargetStaffNameMessage,
  ] = useTargetStaffName('');
  const [visitors, setVisitors, errorVisitorMessage, setErrorVisitorMessage] = useVisitors(
    makeVisitor(),
  );
  const [isPolicyChecked, setIsPolicyChecked] = useState(false);
  const [isSubmitButtonAcitve, setIsSubmitButtonAcitve] = useState(false);

  useEffect(() => {
    setIsSubmitButtonAcitve(
      isAvailableSubmit(
        isPolicyChecked,
        errorDateMessage as string,
        errorPlaceMessage as string,
        errorPurposeMessage as string,
        errorTargetStaffNameMessage as string,
        errorVisitorMessage as string,
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

        visitors,
        setVisitors,
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
