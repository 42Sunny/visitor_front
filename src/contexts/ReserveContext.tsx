import useDate from 'hooks/useDate';
import usePlace from 'hooks/usePlace';
import usePurpose from 'hooks/usePurpose';
import useTargetStaffName from 'hooks/useTargetStaffName';
import useVisitors from 'hooks/useVisitors';
import { ReactNode, createContext, useEffect, useState, useCallback } from 'react';
import makeVisitor from 'tools/makeVisitor';

type PropTypes = {
  children: ReactNode;
};

export type ReserveContextTypes = {
  handleClickPlace: React.MouseEventHandler<HTMLButtonElement>;
  date: Date | null;
  setDate: React.Dispatch<React.SetStateAction<Date | null>>;
  errorDateMessage: string;
  setErrorDateMessage: React.Dispatch<React.SetStateAction<string>>;
  checkDate: (date: Date) => void;

  place: string;
  setPlace: React.Dispatch<React.SetStateAction<string>>;
  errorPlaceMessage: string;
  setErrorPlaceMessage: React.Dispatch<React.SetStateAction<string>>;

  purpose: string;
  setPurpose: React.Dispatch<React.SetStateAction<string>>;
  errorPurposeMessage: string;
  setErrorPurposeMessage: React.Dispatch<React.SetStateAction<string>>;
  checkPurpose: (purpose: string) => void;

  targetStaffName: string;
  setTargetStaffName: React.Dispatch<React.SetStateAction<string>>;
  errorTargetStaffNameMessage: string;
  setErrorTargetStaffNameMessage: React.Dispatch<React.SetStateAction<string>>;
  checkTargetStaffName: (targetStaffName: string) => void;

  visitors: Visitor[];
  setVisitors: React.Dispatch<React.SetStateAction<Visitor[]>>;
  errorVisitorsMessage: string;
  setErrorVisitorsMessage: React.Dispatch<React.SetStateAction<string>>;
  checkVisitors: (visitors: Visitor[]) => void;

  isPolicyChecked: boolean;
  setIsPolicyChecked: React.Dispatch<React.SetStateAction<boolean>>;

  isSubmitButtonAcitve: boolean;
  setIsSubmitButtonAcitve: React.Dispatch<React.SetStateAction<boolean>>;

  isUpdatePage: boolean;
  setIsUpdatePage: React.Dispatch<React.SetStateAction<boolean>>;
};

const initialContext = {
  handleClickPlace: () => {},
  date: new Date(),
  setDate: () => {},
  errorDateMessage: '',
  setErrorDateMessage: () => {},
  checkDate: () => {},

  place: '',
  setPlace: () => {},
  errorPlaceMessage: '',
  setErrorPlaceMessage: () => {},

  purpose: '',
  setPurpose: () => {},
  errorPurposeMessage: '',
  setErrorPurposeMessage: () => {},
  checkPurpose: () => {},

  targetStaffName: '',
  setTargetStaffName: () => {},
  errorTargetStaffNameMessage: '',
  setErrorTargetStaffNameMessage: () => {},
  checkTargetStaffName: () => {},

  visitors: [],
  setVisitors: () => {},
  errorVisitorsMessage: '',
  setErrorVisitorsMessage: () => {},
  checkVisitors: () => {},

  isPolicyChecked: false,
  setIsPolicyChecked: () => {},

  isSubmitButtonAcitve: false,
  setIsSubmitButtonAcitve: () => {},

  isUpdatePage: false,
  setIsUpdatePage: () => {},
};

const ReserveContext = createContext<ReserveContextTypes>(initialContext);

const isAvailableSubmit = (
  isPolicyChecked: boolean,
  errorDateMessage: string,
  errorPlaceMessage: string,
  errorPurposeMessage: string,
  errorTargetStaffNameMessage: string,
  errorVisitorsMessage: string,
) =>
  isPolicyChecked === true &&
  errorDateMessage === '' &&
  errorPlaceMessage === '' &&
  errorPurposeMessage === '' &&
  errorTargetStaffNameMessage === '' &&
  errorVisitorsMessage === '';

const ReserveProvider = ({ children }: PropTypes) => {
  const { date, setDate, errorDateMessage, setErrorDateMessage, checkDate } = useDate(null);
  const { place, setPlace, errorPlaceMessage, setErrorPlaceMessage } = usePlace('개포');
  const { purpose, setPurpose, errorPurposeMessage, setErrorPurposeMessage, checkPurpose } =
    usePurpose('');
  const {
    targetStaffName,
    setTargetStaffName,
    errorTargetStaffNameMessage,
    setErrorTargetStaffNameMessage,
    checkTargetStaffName,
  } = useTargetStaffName('');
  const { visitors, setVisitors, errorVisitorsMessage, setErrorVisitorsMessage, checkVisitors } =
    useVisitors(makeVisitor());
  const [isPolicyChecked, setIsPolicyChecked] = useState(false);
  const [isUpdatePage, setIsUpdatePage] = useState(false);
  const [isSubmitButtonAcitve, setIsSubmitButtonAcitve] = useState(false);

  useEffect(() => {
    setIsSubmitButtonAcitve(
      isAvailableSubmit(
        isPolicyChecked,
        errorDateMessage as string,
        errorPlaceMessage as string,
        errorPurposeMessage as string,
        errorTargetStaffNameMessage as string,
        errorVisitorsMessage as string,
      ),
    );
  }, [
    isPolicyChecked,
    errorDateMessage,
    errorPlaceMessage,
    errorPurposeMessage,
    errorTargetStaffNameMessage,
    errorVisitorsMessage,
  ]);

  const handleClickPlace = useCallback(
    (event) => {
      const {
        target: { value, innerText },
      } = event;
      if (value) setPlace(value);
      else setPlace(innerText);
    },
    [setPlace],
  );

  return (
    <ReserveContext.Provider
      value={{
        handleClickPlace,
        date,
        setDate,
        errorDateMessage,
        setErrorDateMessage,
        checkDate,

        place,
        setPlace,
        errorPlaceMessage,
        setErrorPlaceMessage,

        purpose,
        setPurpose,
        errorPurposeMessage,
        setErrorPurposeMessage,
        checkPurpose,

        targetStaffName,
        setTargetStaffName,
        errorTargetStaffNameMessage,
        setErrorTargetStaffNameMessage,
        checkTargetStaffName,

        visitors,
        setVisitors,
        errorVisitorsMessage,
        setErrorVisitorsMessage,
        checkVisitors,

        isPolicyChecked,
        setIsPolicyChecked,

        isSubmitButtonAcitve,
        setIsSubmitButtonAcitve,

        isUpdatePage,
        setIsUpdatePage,
      }}
    >
      {children}
    </ReserveContext.Provider>
  );
};

export { ReserveContext, ReserveProvider };
