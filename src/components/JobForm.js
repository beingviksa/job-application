import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "./UI/Button";
import Checkbox from "./UI/Checkbox";
import { educationLevels } from "../utills/educationLevels";
import Header from "./Header";
import { useJobContext } from "./jobContext";
import ErrorText from "./UI/Error";

const JobForm = () => {
  const navigate = useNavigate();
  const { setFormData, formData, formErrors, setFormErrors } = useJobContext();

  const initialData = {
    experience: formData.experience || null,
    minWorkingHours: formData.workingHours?.min,
    maxWorkingHours: formData.workingHours?.max,
    educationData: formData.educationData,
  };

  const [experience, setExperience] = useState(initialData.experience);
  const [educationData, setEducationData] = useState(
    initialData.educationData || educationLevels
  );
  const [workingHours, setWorkingHours] = useState({
    min: initialData.minWorkingHours || 20,
    max: initialData.maxWorkingHours || 50,
  });

  const handleChangeQualification = (id) => {
    setEducationData((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          return { ...item, checked: !item.checked };
        } else {
          return { ...item };
        }
      });
    });
  };

  const handleChangeExperience = (e) => {
    setExperience(e.target.value);
  };

  const handleWorkingHourChange = (e) => {
    setWorkingHours({
      ...workingHours,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = (values) => {
    const errors = {};
    if (!values?.experience) {
      errors.experience = "The field is required";
    }

    if (values.educationData.every((i) => !i.checked)) {
      errors.educationData = "Please select the qualification";
    }

    if (!values?.workingHours?.min || !values?.workingHours?.max) {
      errors.workingHours = "Please add working hours";
    }

    setFormErrors(errors);

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      experience,
      educationData,
      workingHours,
    };

    setFormData({ ...data });
    const errors = validateForm({ ...data });

    if (Object.keys(errors).length === 0) {
      navigate("/overview");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="job-form">
        <Header
          iconSymbol="1"
          iconBgColor="violet"
          headerContent="Job criteria"
          showSubHeader
        />
        <div className="input-field number-input">
          <label className="field-title">
            A minimum No. years of experience
          </label>
          <input
            type="number"
            value={experience}
            onChange={handleChangeExperience}
            placeholder="e.g 5+"
            min="1"
            max="40"
          />
          {formErrors?.experience && (
            <ErrorText error={formErrors.experience} />
          )}
        </div>
        <div className="input-field">
          <label className="field-title">Level of education</label>
          {educationData.map(({ id, name, value }, index) => {
            return (
              <Checkbox
                index={index}
                name={name}
                value={value}
                id={id}
                checkedState={educationData}
                handleOnChange={() => handleChangeQualification(id)}
                key={index}
              />
            );
          })}
          {formErrors?.educationData && (
            <ErrorText error={formErrors.educationData} />
          )}
        </div>
        <div className="input-field">
          <p className="field-title">No. of working hours (per week)</p>
          <div className="working-hours-field number-input">
            <label>
              Min.{" "}
              <input
                type="number"
                name="min"
                value={workingHours.min}
                min="20"
                max="80"
                onChange={handleWorkingHourChange}
              />
            </label>
            <label>
              Max.{" "}
              <input
                type="number"
                name="max"
                value={workingHours.max}
                min="40"
                max="80"
                onChange={handleWorkingHourChange}
              />
            </label>
          </div>
          {formErrors?.workingHours && (
            <ErrorText error={formErrors.workingHours} />
          )}
        </div>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};

export default JobForm;
