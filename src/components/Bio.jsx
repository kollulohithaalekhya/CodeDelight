import React from "react";
import { useProfile } from "../context/ProfileContext";
import "../styles/Bio.css";

const Bio = () => {
  const { profile } = useProfile();
  const bio = profile?.bio?.trim();

  return (
    <div className="extra-heading">
      <h1>Bio</h1>
      <p>
        {bio || "You haven't added a bio yet. Head to Settings to tell others about yourself."}
      </p>
    </div>
  );
};

export default Bio;
