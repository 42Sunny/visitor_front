import React from 'react';
import classes from 'assets/styles/Reserve/ReserveVisitor.module.css';

const VISITOR_ADD_BUTTON_TEXT = '+ 방문자 추가';

type PropTypes = {
  handleClick: React.MouseEventHandler<HTMLButtonElement>;
};

const VisitorAddButton = ({ handleClick }: PropTypes) => {
  return (
    <button className={classes.AddButton} onClick={handleClick}>
      {VISITOR_ADD_BUTTON_TEXT}
    </button>
  );
};

export default React.memo(VisitorAddButton);
