import { useEffect, useState } from "react";
import ReactModal from "react-modal";

interface EducationItem {
  degree: string;
  university: string;
  faculty: string;
  module: string;
  years: string;
}

interface DetailedWorkExperienceItem {
  text: string;
}

interface WorkExperienceItem {
  company: string;
  position: string;
  type: string;
  timePeriod: string;
  detailed: DetailedWorkExperienceItem[];
}

interface Skills {
  [category: string]: string[];
}

interface AboutData {
  intro: string;
  education: EducationItem[];
  workExperience: WorkExperienceItem[];
  skills: Skills;
}

export default function About() {
  const [data, setData] = useState<AboutData | null>(null);
  const [selectedJob, setSelectedJob] = useState<WorkExperienceItem | null>(
    null,
  );

  useEffect(() => {
    fetch("/content/about.json")
      .then((res) => res.json())
      .then((json: AboutData) => setData(json))
      .catch((err) => console.error("Failed to load about data:", err));
  }, []);

  if (!data) return null;

  return (
    <>
      <div className="bodyContainer">
        <p>{data.intro}</p>

        <h3 className="subtitle">Education</h3>
        <div className="aboutCategoryContainer">
          {data.education.map((item) => (
            <pre className="aboutCard" key={`${item.degree}-${item.years}`}>
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
            data.workExperience.map((job) => (
              <pre
                key={`${job.company}-${job.timePeriod}`}
                className="aboutCard clickable"
                onClick={() => setSelectedJob(job)}
              >
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
          {Object.entries(data.skills).map(([category, skillList]) => (
            <div key={category} className="aboutCard">
              <span className="aboutCardTitle">{category}</span>
              <ul>
                {skillList.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <ReactModal
        className="bodyContainer"
        isOpen={selectedJob !== null}
        onRequestClose={() => setSelectedJob(null)}
        ariaHideApp={false}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
          content: {
            position: "relative",
            inset: "auto",
            width: "90%",
            maxWidth: "900px",
            maxHeight: "90vh",
            overflowY: "auto",
            padding: "25px",
            borderRadius: "10px",
            backgroundColor: "#0a0a0f",
            outline: "1px solid #1b1b25",
          },
        }}
      >
        {selectedJob && (
          <>
            <div className="modalHeader">
              <h2 className="coloredWord">{selectedJob.company}</h2>
              <button
                className="modalClose"
                onClick={() => setSelectedJob(null)}
              >
                ×
              </button>
            </div>
            <p>{selectedJob.position}</p>
            <p>{selectedJob.type}</p>
            <p className="aboutCardYears">{selectedJob.timePeriod}</p>

            <h3>Details</h3>
            <ul className="jobDetails">
              {selectedJob.detailed.flatMap((detail, index) =>
                detail.text
                  .split(". ")
                  .filter((line) => line.trim() !== "")
                  .map((line, i) => (
                    <li key={`${index}-${i}`}>
                      {line.endsWith(".") ? line : line + "."}
                    </li>
                  )),
              )}
            </ul>
          </>
        )}
      </ReactModal>
    </>
  );
}
