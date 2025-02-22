import DreamJob from '../LandingPage/DreamJob'
import Companies from '../LandingPage/Companies'
import Working from '../LandingPage/Working'
import Information from '../LandingPage/Information'
import QuickSection from '../LandingPage/QuickSection'

const HomePage = () => {
  return (
    <div className="min-h-[100vh] bg-cape-cod-950 font-['poppins']" >
    <DreamJob/>
    <Companies/>
    <QuickSection/>
    <Information/>
    <Working/>
    </div>
  )
}

export default HomePage