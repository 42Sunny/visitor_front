import { createContext, useState } from 'react';
import makeVisitor from 'tools/makeVisitor';

const ReserveContext = createContext({});

const ReserveProvider = ({ children }) => {
  const [date, setDate] = useState(new Date());
  const [place, setPlace] = useState('개포');
  const [purpose, setPurpose] = useState('');
  const [targetStaffName, setTargetStaffName] = useState('');
  const [visitor, setVisitor] = useState([makeVisitor()]);
  const [isChecked, setIsChecked] = useState(false);

  const [dateError, setDateError] = useState(false);
  const [placeError, setPlaceError] = useState(false);
  const [purposeError, setPurposeError] = useState(false);
  const [targetStaffNameError, setTargetStaffNameError] = useState(false);
  const [invalidTargetStaffName, setInvalidTargetStaffName] = useState(false);
  const [visitorError, setVisitorError] = useState(false);

  return (
    <ReserveContext.Provider
      value={{
        date,
        setDate,
        place,
        setPlace,
        purpose,
        setPurpose,
        targetStaffName,
        setTargetStaffName,
        visitor,
        setVisitor,
        dateError,
        setDateError,
        placeError,
        setPlaceError,
        purposeError,
        setPurposeError,
        targetStaffNameError,
        setTargetStaffNameError,
        visitorError,
        setVisitorError,
        isChecked,
        setIsChecked,
        invalidTargetStaffName,
        setInvalidTargetStaffName,
      }}
    >
      {children}
    </ReserveContext.Provider>
  );
};

export { ReserveContext, ReserveProvider };
