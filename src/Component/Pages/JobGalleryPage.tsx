import { Divider } from "@mantine/core"
import JobGallery from "../JobGallery/JobGallery"

const JobGalleryPage = () => {
    return (
        <div className="min-h-[100vh] bg-cape-cod-950 font-['poppins'] px-4">
          <Divider size="xs" />
          
          <div className=" my-5">
           <JobGallery/>
          </div>
        </div>
      )
}

export default JobGalleryPage