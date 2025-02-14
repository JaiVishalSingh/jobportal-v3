import { Divider } from "@mantine/core"
import SearchBar from "../FindJobs/SearchBar"
import Jobs from "../FindJobs/Jobs"
import FilterSidebar from "../FindJobs/FilterSidebar"

const Findjobs = () => {
  return (
    <div className="min-h-[100vh] bg-cape-cod-950 font-['poppins']">
      {/* <Divider mx="md" size="xs" /> */}
      <SearchBar />
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/4 bs-mx:hidden ">
          <div className='text-2xl my-6 mx-4 font-semibold'>Filter Jobs</div>
          <FilterSidebar />
        </div>
        <div className="w-full lg:w-3/4">
          <Jobs />
        </div>
      </div>
    </div>
  )
}

export default Findjobs