import { useState, useEffect } from "react";
import { Button, Textarea, Loader, Progress, Card, FileInput, Title, Text } from "@mantine/core";
import axios from "axios";
import { getJob } from "../../Services/JobService";

const AtsChecker = ({ jobId }: { jobId: string }) => {
  const [jobDescription, setJobDescription] = useState<string>("");
  const [skillsRequired, setSkillsRequired] = useState<string[]>([]);
  const [resume, setResume] = useState<File | null>(null);
  const [atsScore, setAtsScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch Job Description
  useEffect(() => {
    console.log("Job ID from props:", jobId); // Debugging Job ID

    if (jobId) {
      getJob(jobId)
        .then((job) => {
          console.log("Fetched Job Description:", job);
          setJobDescription(job?.description || "No description available");
          setSkillsRequired(job?.skillsRequired || []);
        })
        .catch((error) => console.error("Error fetching job description:", error));
    }
  }, [jobId]);

  // Handle Resume Upload
  const handleResumeUpload = (file: File | null) => {
    if (file) {
      console.log("Selected Resume:", file);
      setResume(file);
    } else {
      console.error("No file selected");
    }
  };

  // Handle ATS Check
  const handleAtsCheck = async () => {
    if (!resume) {
      console.error("No resume uploaded!");
      return;
    }

    setLoading(true);

    console.log("Sending Job Description:", jobDescription);
    console.log("Sending Skills Required:", skillsRequired);

    const formData = new FormData();
    formData.append("file", resume, resume.name);
    formData.append("job_description", jobDescription);
    formData.append("skills_required", JSON.stringify(skillsRequired));

    console.log("Form Data being sent:", {
      resumeName: resume.name,
      jobDescription,
      skillsRequired,
    });

    try {
      const response = await axios.post("https://ats-api-m949.onrender.com/analyze-resume", formData);

      console.log("API Response:", response.data);

      if (response.data && response.data.analysis) {
        const parsedAnalysis = JSON.parse(response.data.analysis);
        console.log("Parsed Analysis:", parsedAnalysis);

        if (parsedAnalysis.overall_match_percentage) {
          const matchPercentage = parsedAnalysis.overall_match_percentage;
          const score = parseInt(matchPercentage.match(/\d+/)?.[0] || "0", 10);

          setAtsScore(score);
          console.log("ATS Score:", score);
        } else {
          console.warn("ATS Score not found in parsed analysis:", parsedAnalysis);
        }
      } else {
        console.warn("Analysis key not found in response:", response.data);
      }
    } catch (error) {
      console.error("Error checking ATS score:", error);
    } finally {
      setLoading(false);
    }
  };

  // Debugging UI Updates
  useEffect(() => {
    console.log("Job Description updated:", jobDescription);
  }, [jobDescription]);

  useEffect(() => {
    console.log("ATS Score updated:", atsScore);
  }, [atsScore]);

  return (
    <Card  padding="lg" radius="md" className="w-[92%] max-w-lg  !bg-cape-cod-900 ">
      <Title order={3} className="mb-3 text-blue-400">ATS Resume Checker</Title>
    <Text size="sm" >
      Upload your resume and compare it against the job description to check your ATS score.
    </Text>

    <img src={require(`../../assets/images/atsimg1.png`)} alt="" style={{ width: '100%', height: 'auto' }} />

    <FileInput
      placeholder="Upload your resume (PDF/DOC)"
      accept=".pdf,.doc,.docx"
      onChange={handleResumeUpload}
      className="mb-4 mt-3"
    />

      <Button fullWidth onClick={handleAtsCheck} loading={loading}>
        {loading ? <Loader size="sm" color="white" /> : "Check ATS Score"}
      </Button>

      {atsScore !== null && (
        <div className="mt-5">
          <Text className="font-semibold text-lg">ATS Score: {atsScore}%</Text>
          <Progress value={atsScore || 0} color={atsScore > 60 ? "green" : "red"} size="md" mt="sm" />
        </div>
      )}
    </Card>
  );
};

export default AtsChecker;
