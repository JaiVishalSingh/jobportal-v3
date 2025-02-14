import { Divider, Text } from "@mantine/core";
import { IconUsers, IconCalendarEvent, IconMapPin, IconClockHour3 } from "@tabler/icons-react";
import { Link } from "react-router-dom";

const HackathonCard = (props: any) => {
  return (
    <Link to={`/hackathon/${props.id}`} className="relative flex flex-col gap-1 rounded-xl bg-cape-cod-900 p-2 w-72 hover:shadow-[0_0_5px_1px_blue] !shadow-blue-300 transition-all">
      <div className=" w-full h-[120px] rounded-lg overflow-hidden">
        <img
          src={`data:image/jpeg;base64,${props.bannerImage}`}
          alt="Hackathon Banner"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute top-[100px] ml-1  p-2 bg-cape-cod-800 rounded-md shadow-md">
        <img
          src={`data:image/jpeg;base64,${props.iconImage}`}
          alt="Hackathon Logo"
          className="h-10 w-10"
        />
      </div>
      <div className=" px-1 ml-28">
        <div className="font-semibold text-white text-lg">{props.title}</div>
        <div className="text-sm text-cape-cod-400">Hosted by {props.organizer}</div>
      </div>

      <div className="flex gap-2 [&>div]:py-1 [&>div]:px-2 [&>div]:bg-cape-cod-800 [&>div]:text-blue-400 [&>div]:rounded-lg text-xs mt-1">
        <div className="inline-flex items-center">
          <IconCalendarEvent className="w-3 h-3 mr-1" />
          <span>{props.eventDate}</span>
        </div>
        <div className="inline-flex items-center">
          <IconUsers className="w-3 h-3 mr-1" />
          <span>{props.participants} Participants</span>
        </div>
        <div className="inline-flex items-center">
          <IconMapPin className="w-3 h-3 mr-1" />
          <span>{props.location}</span>
        </div>
      </div>
      <Text className="!text-xs text-justify !text-cape-cod-300" lineClamp={3}>
        {props.about}
      </Text>
      <Divider size="xs" color="cape-cod.6" />

      <div className="flex justify-between">
        <div className="font-semibold text-blue-300 p-1 rounded-lg">
          Prize Money : {props.prize}
        </div>
        <div className="flex gap-1 text-xs text-cape-cod-400 items-center">
          <IconClockHour3 className="h-5 w-5" stroke={1.5} />{" "}
          {props.daysLeft} Days Left
        </div>
      </div>
    </Link>
  );
};

export default HackathonCard;
