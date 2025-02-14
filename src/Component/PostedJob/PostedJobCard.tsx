import { Link, useParams } from "react-router-dom"
import { timeAgo } from "../../Services/Utilities";

const PostedJobCard = (props: any) => {
  const { id } = useParams();
  
  return (
    <Link to={`/posted-job/${props.id}`}
      className={`bg-cape-cod-900 rounded-xl p-2 border-b-2 border-l-2 border-blue-400 
        ${props.id === Number(id) ? "border-2 border-blue-400 text-cape-cod-100" : "bg-cape-cod-900 text-cape-cod-300"}`}> 

      <div className="text-sm font-semibold">{props.jobTitle}</div>
      <div className="text-xs">{props.location}</div>
      <div className="text-xs">{props.jobStatus=="DRAFT"?"Drafted":props.jobStatus=="CLOSED"?"Closed":"Posted"} {timeAgo(props.postTime)}</div>
    </Link>
  );
}

export default PostedJobCard;
