import { Avatar, Menu, rem, Switch } from '@mantine/core'
import {  IconBrandAppgallery, IconLogout, IconMessageCircle, IconMoon, IconMoonStars, IconSettings, IconSun, IconUserCircle } from '@tabler/icons-react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeUser } from '../../Slices/UserSlices';

const ProfileMenu = () => {
  const dispatch = useDispatch();
  const profile=useSelector((state:any)=>state.profile);
  const user=useSelector((state:any)=>state.user);
    const [checked, setChecked] = useState(false);
    const [opened, setOpened] = useState(false);
    const handleLogout = () => {
      localStorage.removeItem("token");
      dispatch(removeUser());
      window.location.reload();
    }

  return (
    <Menu shadow="md" width={200} opened={opened} onChange={setOpened}>
      <Menu.Target>
       <div className="flex gap-2 items-center cursor-pointer">
                 <div className='xs-mx:hidden'>{user.name}</div>
                 <Avatar src={profile.picture ? `data:image/jpeg;base64,${profile.picture}` : require(`../../assets/avatar.png`)}alt="" />
               </div>
      </Menu.Target>

      <Menu.Dropdown onChange={() => setOpened(true)}>
      <Link to ="/profile">
      <Menu.Item leftSection={<IconUserCircle size={14} />}>
          Profile
        </Menu.Item>
      </Link>
       
        <Menu.Item leftSection={<IconMessageCircle size={14} />}>
          Messages
        </Menu.Item>
        <Link to="/job-gallery">
        <Menu.Item leftSection={<IconBrandAppgallery size={14} />}>
          Gallery
        </Menu.Item>
        </Link>
        <Menu.Item leftSection={<IconSettings size={14} />}>
          Settings
        </Menu.Item>
        <Menu.Item
          leftSection={<IconMoon size={14} />}
          rightSection={
           <Switch checked={checked}
           onChange={(event) => setChecked(event.currentTarget.checked)}
            size="md" color="dark.4" 
           onLabel={<IconSun 
            style={{width:rem(16),height:rem(16)}}
            stroke={2.5}
            color="var(--mantine-color-yellow-4)"
            />}
            offLabel={<IconMoonStars size={16} stroke={2.5} color="var(--mantine-color-blue-6)" />}
             />
          }
        >
          Dark Mode
        </Menu.Item>

        <Menu.Divider />
        <Menu.Item onClick={handleLogout}
          color="red"
          leftSection={<IconLogout size={14} />}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}

export default ProfileMenu