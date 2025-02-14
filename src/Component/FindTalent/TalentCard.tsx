import { Avatar, Button, Divider, Modal, Text } from "@mantine/core";
import { IconCalendarMonth, IconHeart, IconMapPin } from "@tabler/icons-react";
import { useState, useEffect, useRef } from "react";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { getProfile } from "../../Services/ProfileServices";
import { DateInput, TimeInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { ChangeAppStatus } from "../../Services/JobService";
import { errorNotification, successNotification } from "../../Services/NotificationService";
import { foramtInterviewTime, openBase64 } from "../../Services/Utilities";

const TalentCard = (props: any) => {
  const {id}=useParams();
  const ref= useRef<HTMLInputElement>(null);
  const [opened, {open,close}] = useDisclosure(false);
  const [app, {open:openApp,close:closeApp}] = useDisclosure(false);
  const [profile, setProfile] = useState<any>({});
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<any>(null);
  useEffect(() => {
    if (props.applicantId)getProfile(props.applicantId).then((res) => {
      setProfile(res);
    }).catch((err) => {
      console.error(err);
    });
    else setProfile(props);
  }, [props])
  const handleOffer = (status: string) => {
    let interview:any={id,applicantId:profile?.id,applicationStatus:status};
    if(status==="INTERVIEWING"){
      const [hours, minutes] = time.split(":").map(Number);
      date?.setHours(hours, minutes);
      interview={...interview,interviewTime:date};
    }
    ChangeAppStatus(interview).then((res) => {
      if(status==="INTERVIEWING")successNotification("Success","Interview Scheduled");
      else if(status==="OFFERED")successNotification("Success","Offer Sent");
      else successNotification("Success","Application Rejected");
     window.location.reload();
     
    }).catch((err) => {
      console.error(err);
      errorNotification(err.response.data.errorMessage,"Error scheduling interview");
    });
  }

  return (
    <div>
      <div className="flex flex-col gap-3 rounded-xl bg-cape-cod-900 p-4 w-96 hover:shadow-[0_0_5px_1px_blue] !shadow-blue-300 ">
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <div className="p-2 bg-cape-cod-800 rounded-full">
            <Avatar src={profile?.picture ? `data:image/jpeg;base64,${profile?.picture}` : require(`../../assets/avatar.png`)}alt="" />
               
            </div>
            <div className="flex flex-col gap-1">
              <div className="font-semibold text-lg">{props.name}</div>
              <div className="text-sm text-cape-cod-300">
                {profile?.jobTitle} &bull; {profile?.company}
              </div>
            </div>
          </div>
          <IconHeart className="cursor-pointer text-cape-cod-300" />
        </div>
        <div className="flex gap-2 [&>div]:py-1 [&>div]:px-2 [&>div]:bg-cape-cod-800 [&>div]:text-blue-400 [&>div]:rounded-lg text-xs">
          {
            profile?.skills?.map((skill: any, index: any) =>index<4&& 
              <div key={index}>{skill}</div>
            )
          }

        </div>
        <div>
        <Text className="!text-xs text-justify !text-cape-cod-300" lineClamp={3}>
          {profile?.about}
        </Text>
        </div>
        <Divider size="xs" color="cape-cod.6" />
{
  props.invited ? <div className=" flex gap-1text-sm items-center text-cape-cod-200"><IconCalendarMonth stroke={1.5}/> Interview: {foramtInterviewTime(props.interviewTime)} </div> : 

        <div className="flex justify-between">
          <div className=" text-cape-cod-300">
            Experince {props.totalExp?props.totalExp:1} Years
          </div>
          <div className="flex gap-1 text-xs text-cape-cod-400 items-center">
            <IconMapPin className="h-5 w-5" stroke={1.5} />{" "}
            {props?.location}
          </div>
          </div>
}
        
        <Divider size="xs" color="cape-cod.6" />
        <div className="flex [&>*]:w-1/2 [&>*]:p-1">
        {!props.invited && <>
          <Link to={`/talent-profile/${profile?.id}`}>
            <Button color="blue.4" variant="outline" fullWidth>Profile</Button>
          </Link>
          <div>
            {props.posted?<Button leftSection={<IconCalendarMonth className="w-5 h-5 rounded-md"/>} color="yellow.4" variant="light" onClick={open} fullWidth>Schedule</Button>:<Button color="blue.4" variant="light" fullWidth>Message</Button>}
          </div>
          </>}
          {
            props.invited && <>
            <div>
              <Button onClick={()=>handleOffer("OFFERED")} color="blue.4" variant="light" fullWidth>Accept</Button>
            </div>
            <div>
              <Button onClick={()=>handleOffer("REJECTED")} color="red.4" variant="light" fullWidth>Reject</Button>
            </div>
            </>
          }
        </div>
        {(props.invited || props.posted) &&
          <Button color="blue.4" variant="filled" fullWidth autoContrast onClick={openApp}>View Application</Button>
            
        }
        <Modal opened={opened} onClose={close} radius="lg" title="Schedule Interview" centered>
          <div className="flex flex-col gap-5">
            <DateInput value={date} onChange={setDate} minDate={new Date()} placeholder="Select date" />
            <TimeInput value={time} onChange={(event)=>setTime(event.currentTarget.value)} placeholder="Select time" ref={ref} onClick={() => ref.current?.showPicker()} />
            <Button onClick={()=>handleOffer("INTERVIEWING")} color="blue.4" fullWidth>Schedule</Button>
          </div>
          </Modal>
          <Modal opened={app} onClose={closeApp} radius="lg" title="Application" centered>
          <div className="flex flex-col gap-5">
            <div>
              Email: &emsp; <a className="text-blue-400" href={`mailto:${profile?.email}`}>{profile?.email}</a>
            </div>
            <div>
              Phone: &emsp; <a className="text-blue-400" href={`tel:${props.phone}`}>{props.phone}</a>
            </div>
            <div >
              website: &emsp; <a target="_blank" className="text-blue-400" href={props.website}>{props.website}</a>
            </div>
            <div>
              Resume: &emsp; <span className="text-blue-400 cursor-pointer"  onClick={()=>openBase64(props.resume)}>Resume</span>
            </div>
            <div>
              Cover Letter: &emsp; <div className="text-blue-400 cursor-pointer" >{props.coverLetter}</div>
            </div>
            </div>
          </Modal>
      </div>
      </div>

  
  );
};

export default TalentCard;