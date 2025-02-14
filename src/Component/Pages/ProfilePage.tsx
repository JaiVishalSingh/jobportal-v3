import { Divider } from "@mantine/core"

import UserProfile from "../Profile/UserProfile"
import { profile } from "../../assets/Data/TalentData"

const ProfilePage = () => {
  return (
    <div className="min-h-[90vh] bg-cape-cod-950 font-['poppins']">
        <Divider mx="md" mb="xl"/>
        <UserProfile {...profile}/>
        </div>
  )
}

export default ProfilePage