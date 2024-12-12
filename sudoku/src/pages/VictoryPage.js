import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { toast } from "react-toastify";
import "./VictoryPage.css";

function VictoryPage() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [teams, setTeams] = useState([]);
  const [selectedTeamID, setSelectedTeamID] = useState(null);
  const [selectedTeamName, setSelectedTeamName] = useState("Select a team");
  const badgeId = "1"; // Badge ID
  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
  });
  // Fetch team data from backend
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(`${apiUrl}/teams`);
        const data = await response.json();
        setTeams(data);
      } catch (error) {
        console.log("Failed to fetch teams:", error);
      }
    };

    fetchTeams();
  }, [apiUrl]);

  const handleSubmit = async () => {
    if (selectedTeamID !== null) {
      try {
        const response = await fetch(
          `${apiUrl}/teams/${selectedTeamID}/badges/${badgeId}/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          // Handle successful submission
          toast.success("Badge ID submitted successfully!");
        } else {
          // Handle error
          toast.error("Error submitting Badge ID.");
        }
      } catch (error) {
        // Handle fetch error
        toast.error("Failed to fetch:", error);
      }
    } else {
      toast.error("Please select a team");
    }
  };

  return (
    <div className="victory-page">
      <h1>Congratulations!</h1>
      <p>You have successfully solved the Sudoku puzzle!</p>
      <img
        src={`${process.env.PUBLIC_URL}/Numeration Badge.png`}
        alt="Badge"
        className="badge-image"
      />
      <Link to="/">
        <button className="btn btn-outline-primary btn-lg">Go Home</button>
      </Link>
      <DropdownButton
        id="dropdown-basic-button"
        title={selectedTeamName}
        className="mt-3"
      >
        {teams.length > 0 ? (
          teams.map((team) => (
            <Dropdown.Item
              key={team.id}
              onClick={() => {
                setSelectedTeamID(team.id);
                setSelectedTeamName(team.name);
              }}
            >
              {team.name}
            </Dropdown.Item>
          ))
        ) : (
          <Dropdown.Item disabled>No teams available</Dropdown.Item>
        )}
        <Dropdown.Divider />
      </DropdownButton>
      <button
        onClick={handleSubmit}
        className="btn btn-outline-primary btn-lg mt-3"
      >
        Submit Badge
      </button>
    </div>
  );
}

export default VictoryPage;
