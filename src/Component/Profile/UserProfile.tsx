import {Avatar, Divider, FileInput, Indicator } from "@mantine/core";
import {  IconPencil } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import Info from "./Info";
import { changeProfile } from "../../Slices/ProfileSlice";
import About from "./About";
import Skills from "./Skills";
import Experience from "./Experience";
import Certificate from "./Certificate";
import { successNotification } from "../../Services/NotificationService";
import { getBase64 } from "../../Services/Utilities";

const UserProfile = (props: any) => {
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profile);
  const handleChange = async (image: any) => {
     let picture:any= await getBase64(image);
      let updatedProfile = { ...profile, picture: picture.split(',')[1] };
      dispatch(changeProfile(updatedProfile));
      successNotification('Profile Picture Updated Successfully', 'Success');
  };


  return (
    <div className="w-4/5 mx-auto">
      <div className="relative">
        <img
          className="rounded-t-2xl w-full h-64 object-cover"
          src={require(`../../assets/bgimg.jpg`)}
          alt=""
        />
        <div className="absolute -bottom-1/3 left-3">
        <Indicator className="[&_.mantine-Indicator-indicator]:!border-4
        [&_.img]:hover:opacity-80" autoContrast inline offset={30} label={<IconPencil className="h-4/5 w-4/5" stroke={1.5} />} size="45" position="bottom-end" color="blue.4" withBorder>
          <Avatar className="!w-48 !h-48 rounded-full -bottom-1/3 absolute left-3 border-cape-cod-950 border-8"
           src={profile.picture ? `data:image/jpeg;base64,${profile.picture}` : require(`../../assets/avatar.png`)}
           alt=""/>
           <FileInput
            onChange={handleChange} 
            className="absolute bottom-2 right-2 z-[201] w-12 [&_div]:text-transparent" variant="unstyled" size="lg" radius="xl" accept="image/png,image/jpeg" />
        </Indicator>
        </div>
      </div>
        <Info/>
      <Divider mx="xs" my="xl" />
     <About/>
      <Divider mx="xs" my="xl" />
      <Skills/>
      <Divider mx="xs" my="xl" />
      <Experience/>
      <Divider mx="xs" my="xl" />
      <Certificate/>
      </div>
  );
};

export default UserProfile;
