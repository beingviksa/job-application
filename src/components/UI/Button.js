const Button = ({ children, handleClick, type = "button" }) => {
  return (
    <button type={type} onClick={handleClick} data-testid={`${type}-button`}>
      {children}
    </button>
  );
};

export default Button;
