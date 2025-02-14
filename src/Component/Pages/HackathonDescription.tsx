import { Button, Divider } from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons-react'
import React from 'react'
import { Link } from 'react-router-dom'
import HackathonDesc from '../FindHackathon.tsx/HackathonDesc'
import RecommendedHacka from '../FindHackathon.tsx/RecommendedHacka'

const HackathonDescription = () => {
  return (
    <div className="min-h-[100vh] bg-cape-cod-950 font-['poppins'] p-4">
      <Divider size="xs" />
      <Link className='my-4 inline-block' to="/find-hackathon">
        <Button leftSection={<IconArrowLeft size={20} />} color="blue.4" variant='light'>Back</Button>
      </Link>
      <div className='flex flex-col lg:flex-row gap-5 justify-around'>
        <HackathonDesc />
        <RecommendedHacka />
      </div>
    </div>
  )
}

export default HackathonDescription