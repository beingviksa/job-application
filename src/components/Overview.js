import { useNavigate } from "react-router-dom";

import Header from "./Header";
import { useJobContext } from "./jobContext";
import Button from "./UI/Button";
import Tag from "./UI/Tag";

const Overview = () => {
  const navigate = useNavigate();
  const {
    formData: { experience, workingHours, educationData },
  } = useJobContext();
  const { min, max } = workingHours;

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className="job-form overview-page">
      <div className="overview-header">
        <Header
          iconSymbol="&#10003;"
          iconBgColor="green"
          headerContent="Job criteria"
        />
        <Button handleClick={handleClick}>Edit</Button>
      </div>

      <div className="overview-content">
        <p className="overview-content__title">
          A minimum No. years of experience:{" "}
          <span className="overview-content__response">{experience}</span>
        </p>
        <p className="overview-content__title">
          No. of working hours (per week):
          <span className="overview-content__response">
            &nbsp;{`${min}-${max} hours`}
          </span>
        </p>
        <div className="overview-content__education">
          <h3>Level of education</h3>
          <div className="tags">
            {educationData
              .filter((ed) => ed.checked)
              .map((data) => {
                return <Tag content={data.value} key={data.index} />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
