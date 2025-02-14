import { Divider } from '@mantine/core'
import PostJobs from '../PostJobs/PostJobs'

const PostPage = () => {
  return (
    <div className="min-h-[100vh] bg-cape-cod-950 font-['poppins'] p-4" >
    <Divider size="xs"/>
    <PostJobs/>
    </div>
  )
}

export default PostPage