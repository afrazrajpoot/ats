import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context/useGlobal";
import { Button, InputLabel, MenuItem, Select } from "@mui/material";

const SkillsForm = () => {
  const skillData = ["C++", "React", "JavaScript", "Angular"];
  const { resumeData, setResumeData } = useGlobalContext();
  const [selectedSkill, setSelectedSkill] = useState(skillData[0]); // Set the default value to the first skill

  const handleChange = (e) => {
    setSelectedSkill(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setResumeData({ ...resumeData, skills: [...resumeData.skills, selectedSkill] });
    setSelectedSkill(skillData[0]); // Reset to default value after submission
  };

  useEffect(() => {
    if (resumeData.skills && resumeData.skills.length > 0) {
      setSelectedSkill(resumeData.skills[0]); // Set the default value to the first skill in resumeData
    }
  }, [resumeData]);

  return (
    <>
      <h1 className="text-3xl">Skills</h1>
      <form className="w-full" onSubmit={handleSubmit}>
        <InputLabel id="demo-simple-select-label">Select a skill</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="skills"
          value={selectedSkill}
          onChange={handleChange}
          className="w-full"
        >
          {skillData.map((skill, index) => (
            <MenuItem key={index} value={skill}>
              {skill}
            </MenuItem>
          ))}
        </Select>
        <Button
          type="submit"
          variant="contained"
          style={{ marginTop: "1vw", width: "100%" }}
          sx={{ backgroundColor: "#4CAF50", color: "white" }}
        >
          Save
        </Button>
      </form>
    </>
  );
};

export default SkillsForm;
