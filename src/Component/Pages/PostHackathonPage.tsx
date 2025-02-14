import { Divider } from '@mantine/core'
import PostHackathon from '../PostHackathon/PostHackathon'

const PostHackathonPage = () => {
  return (
    <div className="min-h-[100vh] bg-cape-cod-950 font-['poppins'] p-4" >
    <Divider size="xs"/>
    <PostHackathon/>
    </div>
  )
}

export default PostHackathonPage