import { Divider } from '@mantine/core'
import PostedJobs from '../PostedJob/PostedJobs'
import PostedJobDesc from '../PostedJob/PostedJobDesc'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getJobPostedBy } from '../../Services/JobService';

const PostedJob = () => {
  const {id}=useParams();
  const navigate =useNavigate()
  const user =useSelector((state:any)=>state.user)
  const [jobList, setJobList] = useState<any[]>([])
  const [job, setJob] = useState<any>({});
  useEffect(() => {
    window.scrollTo(0, 0);
    getJobPostedBy(user.id).then((res) => {
      setJobList(res);
      if(res && res.length>0&& Number(id)===0)navigate(`/posted-job/${res[0].id}`);
      setJob(res.find((item:any)=>item.id==id));
    }).catch((error) => {
      console.log(error);
    })
  }, [id])
  return (
    <div className="min-h-[100vh] bg-cape-cod-950 font-['poppins'] px-4">
      <Divider size="xs" />
      
      <div className="flex gap-5">
       <PostedJobs job={job} jobList={jobList}/>
       <PostedJobDesc {...job}/>
      </div>
    </div>
  )
}

export default PostedJob