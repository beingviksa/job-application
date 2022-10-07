import SubHeader from "./SubHeader";

const Header = ({
  iconSymbol,
  iconBgColor,
  headerContent,
  showSubHeader = false,
}) => {
  return (
    <header>
      <div className="job-title">
        <p className="form-title-icon" style={{ backgroundColor: iconBgColor }}>
          {iconSymbol}
        </p>
        <h1>{headerContent}</h1>
      </div>

      {showSubHeader && <SubHeader />}
    </header>
  );
};

export default Header;
