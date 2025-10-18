import { useEffect, useState } from "react";

interface EducationItem {
  degree: string;
  university: string;
  faculty: string;
  module: string;
  years: string;
}

interface Skills {
  [category: string]: string[];
}

interface AboutData {
  intro: string;
  education: EducationItem[];
  workExperience: any[];
  skills: Skills;
}

export default function About() {
  const [data, setData] = useState<AboutData | null>(null);

  useEffect(() => {
    fetch("/content/about.json")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  if (!data) return null;

  return (
    <div className="bodyContainer">
      <p>{data.intro}</p>

      <h3 className="subtitle">Education</h3>
      <div className="aboutCategoryContainer">
        {data.education.map((item, index) => (
          <pre className="aboutCard" key={index}>
            <span className="aboutCardTitle">{item.degree}</span>
            <br />
            {item.university}
            <br />
            {item.faculty}
            <br />
            Module: {item.module}
            <br />
            <span className="aboutCardYears">{item.years}</span>
          </pre>
        ))}
      </div>

      <h3 className="subtitle">Work experience</h3>
      <div className="aboutCategoryContainer">
        {data.workExperience.length === 0 ? (
          <p>No work experience yet.</p>
        ) : (
          data.workExperience.map((job, i) => (
            <pre key={i} className="aboutCard">
              <span className="aboutCardTitle">{job.company}</span>
              <br />
              {job.position}
              <br />
              {job.type}
              <br />
              <span className="aboutCardYears">{job.timePeriod}</span>
            </pre>
          ))
        )}
      </div>

      <h3 className="subtitle">Skills</h3>
      <div className="aboutCategoryContainer skillsContainer">
        {Object.entries(data.skills).map(([category, skillList], index) => (
          <div key={index} className="aboutCard">
            <span className="aboutCardTitle">{category}</span>
            <ul>
              {skillList.map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
