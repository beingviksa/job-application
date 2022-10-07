const Checkbox = ({ index, name, checkedState, handleOnChange, value }) => {
  return (
    <div className="checkbox">
      <input
        type="checkbox"
        id={`custom-checkbox-${index}`}
        name={name}
        value={value}
        checked={checkedState[index].checked}
        onChange={handleOnChange}
      />
      <label htmlFor={`custom-checkbox-${index}`}>{value}</label>
    </div>
  );
};

export default Checkbox;
