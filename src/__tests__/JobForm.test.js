import { fireEvent, render, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import JobForm from "../components/JobForm";
import { JobContext } from "../components/jobContext";

describe("<Job Form/>", () => {
  const contextData = {
    formData: {
      experience: "4",
      educationData: [
        {
          id: 1,
          name: "bachelor",
          value: "Bachelor / Graduate",
          checked: true,
        },
        {
          id: 2,
          name: "highschool",
          value: "GCSE / A-Level / Highschool / GED",
          checked: false,
        },
        {
          id: 3,
          name: "master",
          value: "Master / Post-Graduate /PhD",
          checked: false,
        },
        {
          id: 4,
          name: "diploma",
          value: "Vocational / Diploma / Associates degree",
          checked: false,
        },
      ],
      workingHours: {
        min: 20,
        max: 50,
      },
    },
    setFormData: jest.fn(),
    setFormErrors: jest.fn(),
    formErrors: {},
  };

  it("render the JobForm Component", async () => {
    const { container } = render(
      <JobContext.Provider value={contextData}>
        <Router>
          <JobForm />
        </Router>
      </JobContext.Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it("set formData on submit button click", async () => {
    const { getByTestId } = render(
      <JobContext.Provider value={contextData}>
        <Router>
          <JobForm />
        </Router>
      </JobContext.Provider>
    );

    const submitButton = getByTestId("submit-button");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(contextData.setFormData).toBeCalled();
    });
  });

  it("show error message onsubmit for empty field", async () => {
    const contextData = {
      formData: {
        experience: null,
        educationData: [
          {
            id: 1,
            name: "bachelor",
            value: "Bachelor / Graduate",
            checked: false,
          },
          {
            id: 2,
            name: "highschool",
            value: "GCSE / A-Level / Highschool / GED",
            checked: false,
          },
          {
            id: 3,
            name: "master",
            value: "Master / Post-Graduate /PhD",
            checked: false,
          },
          {
            id: 4,
            name: "diploma",
            value: "Vocational / Diploma / Associates degree",
            checked: false,
          },
        ],
        workingHours: {
          min: 20,
          max: 50,
        },
      },
      setFormData: jest.fn(),
      setFormErrors: jest.fn(),
    };

    const { getByTestId } = render(
      <JobContext.Provider value={contextData}>
        <Router>
          <JobForm />
        </Router>
      </JobContext.Provider>
    );

    const submitButton = getByTestId("submit-button");
    fireEvent.click(submitButton);

    expect(contextData.setFormErrors).toBeCalledWith({
      educationData: "Please select the qualification",
      experience: "The field is required",
    });
  });
});
