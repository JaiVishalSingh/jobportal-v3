import { Divider} from "@mantine/core"

import  ApplyForm  from "./ApplyForm";
import { timeAgo } from "../../Services/Utilities";

const ApplyJobComp = (props: any) => {
  return (
    <div className="w-2/3 mx-auto bs-mx:w-[92%]">
      <div className="flex justify-between sm-mx:flex-wrap sm-mx:items-center">
        <div className="flex gap-2 items-center sm-mx:flex-wrap sm-mx:gap-1">
          <div className="p-3 bg-cape-cod-800 rounded-xl sm-mx:p-2">
            {props.company && (
              <img
                className="h-14 sm-mx:h-12 xs-mx:h-10"
                src={require(`../../assets/Icons/${props.company}.png`)}
                alt=""
              />
            )}
          </div>
          <div>
            <div className="font-semibold text-2xl sm-mx:text-xl xs-mx:text-lg">{props.title}</div>
            <div className="text-lg text-cape-cod-300 sm-mx:text-base xs-mx:text-sm">
              {props.company} &bull; {timeAgo(props.postTime)} &bull; {props.applicants ? props.applicants.length : 0} Applicants
            </div>
          </div>
        </div>
      </div>
      <Divider my="xl" />
      <ApplyForm />
    </div>
  );
};

export default ApplyJobComp;
