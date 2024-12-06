import React, { useState, useEffect } from "react";
import "./App.css"
import { projectURL } from "./constant";

const App = () => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const fetchData = () => {
    fetch(projectURL)
      .then((response) => response.json())
      .then((data) => {
        const processedData = data.map((project, index) => ({
          id: index,
          percentageFunded: project["percentage.funded"],
          amountPledged: project["amt.pledged"],
        }));
        setProjects(processedData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }

  useEffect(() => {
    if(!projects.length) {
      fetchData();
    }
  }, []);

  const totalPages = Math.ceil(projects.length / recordsPerPage);

  const handlePagination = (page) => {
    setCurrentPage(page);
  };

  const currentData = projects.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  return (
    <div className="app">
      <h1>Kickstarter Projects</h1>
      <table>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Percentage Funded</th>
            <th>Amount Pledged</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((project) => (
            <tr key={project?.id}>
              <td>{project?.id + 1}</td>
              <td>{project?.percentageFunded}%</td>
              <td>${project?.amountPledged?.toString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePagination(page)}
            className={page === currentPage ? "active" : ""}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;
