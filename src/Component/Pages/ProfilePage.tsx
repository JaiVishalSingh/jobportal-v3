import { Divider } from "@mantine/core"

import UserProfile from "../Profile/UserProfile"
import { profile } from "../../assets/Data/TalentData"
import { useEffect, useState } from "react"
import { getAllProfiles } from "../../Services/ProfileServices"
import SmallCardRecommend from "../Talent-Profile/SmallCardRecommend"
import RightSidebar from "../Profile/RightSidebar"

const ProfilePage = () => {
  const [talents, setTalents] = useState<any>([])
 useEffect(() => {
  getAllProfiles().then((res) => {
    setTalents(res);
  }).catch((err) => {
    console.error(err);
  });
}, [])
  return (
    <div className="min-h-[90vh] bg-cape-cod-950 font-['poppins']">
        <Divider mx="md" mb="xl"/>
        <div className='flex gap-5'>
        <UserProfile {...profile}/>
        {/* <SmallCardRecommend {...talents} /> */}
        <RightSidebar />
        </div>
    </div>
  )
}

export default ProfilePage