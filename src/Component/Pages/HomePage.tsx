import DreamJob from '../LandingPage/DreamJob'
import Companies from '../LandingPage/Companies'
import JobCategory from '../LandingPage/JobCategory'
import Working from '../LandingPage/Working'
import Information from '../LandingPage/Information'

const HomePage = () => {
  return (
    <div className="min-h-[100vh] bg-cape-cod-950 font-['poppins']" >
    <DreamJob/>
    <Companies/>
    <JobCategory/>
    <Information/>
    <Working/>
    </div>
  )
}

export default HomePage