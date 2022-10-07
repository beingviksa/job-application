import { Routes, Route } from "react-router-dom";
import "./App.css";
import JobForm from "./components/JobForm";
import Overview from "./components/Overview";

function App() {
  return (
    <Routes>
      <Route path="/" element={<JobForm />} />
      <Route path="overview" element={<Overview />} />
    </Routes>
  );
}

export default App;
