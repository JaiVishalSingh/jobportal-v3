import { useParams } from "react-router-dom";
import JobCard from "../FindJobs/JobCard";
import { useEffect, useState } from "react";
import { getAllJobs } from "../../Services/JobService";

const Recommendedjob = () => {
  const { id } = useParams();
  const [jobList, setJobList] = useState<any>(null);

  useEffect(() => {
    getAllJobs().then((res) => {
      setJobList(res);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  return (
    <div className="w-full lg:w-1/4">
      <div className="text-xl font-semibold mb-5">Recommended Jobs</div>
      <div className="flex flex-wrap lg:flex-col gap-5">
        {jobList?.map((job: any, index: number) => index < 5 && id !== job.id && <JobCard key={index} {...job} />)}
      </div>
    </div>
  );
};

export default Recommendedjob;