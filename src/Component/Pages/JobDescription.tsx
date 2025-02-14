import { Button, Divider } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { Link, useParams } from 'react-router-dom';
import JobDesc from '../JobDesc/JobDesc';
import Recommendedjob from '../JobDesc/Recommendedjob';
import { useEffect, useState } from 'react';
import { getJob } from '../../Services/JobService';

const JobDescription = () => {
  const { id } = useParams();
  const [job, setJob] = useState<any>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    getJob(id).then((res) => {
      setJob(res);
    }).catch((error) => {
      console.log(error);
    });
  }, [id]);

  return (
    <div className="min-h-[100vh] bg-cape-cod-950 font-['poppins'] p-4">
      <Divider size="xs" />
      <Link className="my-4 inline-block" to="/find-jobs">
        <Button leftSection={<IconArrowLeft size={20} />} color="blue.4" variant="light">Back</Button>
      </Link>
      <div className="flex flex-col lg:flex-row gap-5 justify-around">
        <JobDesc {...job} />
        <Recommendedjob />
      </div>
    </div>
  );
};

export default JobDescription;
