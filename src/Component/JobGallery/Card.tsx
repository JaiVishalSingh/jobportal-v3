import { Button, Divider, Text } from "@mantine/core";
import { IconBookmark, IconBookmarkFilled, IconBriefcase, IconCalendarMonth, IconClockHour3, IconMapPin, IconTie } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { timeAgo } from "../../Services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../../Slices/ProfileSlice";


const Card = (props: any) => {
  const dispatch = useDispatch();
  const profile =useSelector((state:any)=>state.profile)
  const handleSaveJob = (event: React.MouseEvent) => {
    event.preventDefault(); // Prevent navigation
    
    let savedJobs = Array.isArray(profile.savedJobs) ? [...profile.savedJobs] : [];
  
    if (savedJobs.includes(props.id)) {
      savedJobs = savedJobs.filter((id) => id !== props.id);
    } else {
      savedJobs = [...savedJobs, props.id];
    }
  
    const updatedProfile = { ...profile, savedJobs };
    dispatch(changeProfile(updatedProfile));
  };
  
  
  return (
    
      <Link to={`/jobs/${props.id}`} className="flex flex-col gap-3 rounded-xl bg-cape-cod-900 p-4 w-72 hover:shadow-[0_0_5px_1px_blue] !shadow-blue-300 ">
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <div className="p-2 bg-cape-cod-800 rounded-md">
             
                {props.company && <img className="h-7" src={require(`../../assets/Icons/${props.company}.png`)} alt="" />}
              
            </div>
            <div>
              <div className="font-semibold">{props.jobTitle}</div>
              <div className="text-sm text-cape-cod-300">
                {props.company} &#x2022; {props.applicants?props.applicants.length:0} Applicants
              </div>
            </div>
          </div>
          {
            profile.savedJobs?.includes(props.id)?<IconBookmarkFilled onClick={handleSaveJob} className="cursor-pointer text-blue-400" stroke={1.5} />
            :<IconBookmark onClick={handleSaveJob} className="cursor-pointer hover:text-blue-400 text-cape-cod-300" />
            }

        </div>
        <div className="flex gap-2 [&>div]:py-1 [&>div]:px-2 [&>div]:bg-cape-cod-800 [&>div]:text-blue-400 [&>div]:rounded-lg text-xs">
          <div className="inline-flex items-center">
            <IconTie className="w-3 h-3 mr-1" /><span>{props.experience}</span>
          </div>
          <div className="inline-flex items-center">
            <IconBriefcase className="w-3 h-3 mr-1" /><span>{props.jobType}</span>
          </div>
          <div className="inline-flex items-center">
            <IconMapPin className="w-3 h-3 mr-1" /><span>{props.location}</span>
          </div>
        </div>

        <Text className="!text-xs text-justify !text-cape-cod-300" lineClamp={3}>
          {props.about}
        </Text>
        <Divider size="xs" color="cape-cod.6" />

        <div className="flex justify-between">
          <div className="font-semibold text-cape-cod-200">
            &#8377; {props.packageOffered} K
          </div>

          {/* some issue is here will solve it later 
          <div className="flex gap-1 text-xs text-cape-cod-400 items-center">
            <IconClockHour3 className="h-5 w-5" stroke={1.5} />{props.applied || props.interviewing?'Applied' :props.offered?'Interviewed':'Posted'}

            {timeAgo(props.postTime)}
          </div>*/}
          <div className="flex gap-1 text-xs text-cape-cod-400 items-center">
            <IconClockHour3 className="h-5 w-5" stroke={1.5} />
            {props.applied || props.interviewing ? 'Applied' : props.offered ? 'Interviewed' : 'Posted'}
            {!props.applied && !props.interviewing && !props.offered && timeAgo(props.postTime)}
          </div>
        </div>
        {(props.offered || props.interviewing) && <Divider color ="cape-cod.6" size="xs" />}
        {
            props.offered && <div className="flex gap-2">
                <Button color="blue.4"  variant='outline' fullWidth > Accept </Button>
                <Button color="blue.4"  variant='light' fullWidth > Reject </Button>
            </div>
        }
        {
            props.interviewing && <div className="flex gap-1 text-sm items-center">
                <IconCalendarMonth className="w-5 h-5 rounded-md text-blue-400" stroke={1.5}/>
                 Sun , 25 August &bull; <span className="text-cape-cod-400">10:00 AM</span>
          </div>
        }
      </Link>   
  );
};

export default Card;
