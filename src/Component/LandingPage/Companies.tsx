import Marquee from "react-fast-marquee";
import { companies } from "../../assets/Data/Data";

const Companies = () => {
    return (
        <div className="mt-20 pb-5">
            <div className="text-4xl text-center font-semibold mb-10 text-cape-cod-100-100">
                Trusted By <span className="text-blue-400">1000+</span>
            </div>
            <Marquee pauseOnHover={true}>
                {companies.map((company, index) => (
                    <div key={index} className="mx-8 px-2 py-1 hover:bg-cape-cod-900 rounded-xl cursor-pointer">
                        <img className="h-14" src={require(`../../assets/Companies/${company}.png`)} alt={company} />
                    </div>
                ))}
            </Marquee>

        </div>
    );
}

export default Companies;