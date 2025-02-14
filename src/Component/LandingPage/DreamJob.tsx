import { Avatar, Button, TextInput } from '@mantine/core';
import landingImage from '../../assets/Connecting.png';
const DreamJob = () => {
  return (
    <div className="flex items-center px-20">
      <div className="flex flex-col w-[45%] gap-3">
        <div className="text-6xl font-bold leading-tight text-white [&>span]:text-blue-400">Get your <span>dream job </span> ready</div>
        <div className="text-cape-cod-200">Discover thousands of opportunities tailored to your skills and ambitions. Whether you're a fresher or a seasoned professional, we’ve got the perfect role for you.</div>
        <div className='flex gap-3 mt-4'>
          <TextInput
            className='rounded-lg p-1 px-2 text-cape-cod-100 [&_input]:!text-cape-cod-100'
            size="sm"
            radius="xl"
            label="Job Title"
            placeholder="Software Engineer"
          />
          <TextInput
            className='rounded-lg p-1 px-2 text-cape-cod-100 [&_input]:!text-cape-cod-100'
            size="sm"
            radius="xl"
            label="Job Type"
            placeholder="Fulltime"
          />
          <Button className='flex mt-7 !rounded-full' >Search.</Button>

        </div>
      </div>

      {/* will look afterwards */}
      <div className="w-[55%] flex items-center justify-center">
        <div className="w-[35rem] relative">
          <img src={landingImage} alt="" />
          <div className='absolute -right-10 w-fit top-[40%] border-blue-400 border rounded-lg p-2 backdrop-blur-md'>
            <div className='text-center mb-1 text-sm text-cape-cod-100'>10k+ got job</div>
            <Avatar.Group>
              <Avatar src="image.png" />
              <Avatar src="image.png" />
              <Avatar src="image.png" />
              <Avatar>+10k</Avatar>
            </Avatar.Group>
          </div>
          <div className='absolute -left-10 w-fit top-[60%] border-blue-400 border rounded-lg p-2 backdrop-blur-md'>
            <div className='flex gap-3 items-center'>
              <div className='w-10 h-10 p-1 bg-cape-cod-900 rounded-lg'>
                <img src="https://pngimg.com/d/google_PNG19635.png" alt="" />
              </div>
              <div className='text-sm text-cape-cod-100'>
                <div>Software Engineer</div>
                <div className='text-cape-cod-200 text-sm'>India</div>
              </div>
            </div>
            <div className='flex gap-2 justify-around text-cape-cod-200 text-xs'>
              <span>Explore big giants</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DreamJob