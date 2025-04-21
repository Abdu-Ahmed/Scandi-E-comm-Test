import React from 'react';
import PropTypes from 'prop-types';

interface ActionBtnProps {
  text: string;
  onClick: () => void;
  data?: string;
  className?: string;
}

const ActionBtn: React.FC<ActionBtnProps> = ({ text, onClick, data, className }) => {
  return (
    <button
      onClick={onClick}
      data-testid={data}
      className={`w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors ${className}`}
    >
      {text}
    </button>
  );
};

ActionBtn.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  data: PropTypes.string,
  className: PropTypes.string,
};

export default ActionBtn;