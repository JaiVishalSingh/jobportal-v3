import { IconBrandFacebook, IconBrandInstagram, IconBrandX } from "@tabler/icons-react"
import { footerLinks } from "../../assets/Data/Data"
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();

  // Only render the footer if the current path is not '/signup'
  if (location.pathname === "/signup" || location.pathname === "/login") {
    return null;
  }

  return (
    <div className="pt-20  pb-5 flex gap-5 justify-around bg-cape-cod-950 font-['poppins'] sm-mx:flex-wrap">
      <div className="w-1/4 sm-mx:w-1/3 ml-6 sm-mx:-ml-5 flex flex-col gap-4">{/*ml-*/}
        <div className="flex gap-3 items-center text-blue-400">
          <img src={require("../../assets/logo.png")} alt="Stemlen Logo" className="h-10 w-11 " />
          <Link to="">
            <div className="text-3xl font-semibold"><span className="text-cape-cod-100">Stem</span>len</div>
          </Link>
        </div>
        <p className="text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
        <div className="flex gap-3 text-blue-400">
          <div className="bg-cape-cod-900 p-2 rounded-full cursor-pointer hover:bg-cape-cod-700">
            <IconBrandFacebook />
          </div>
          <div className="bg-cape-cod-900 p-2 rounded-full cursor-pointer hover:bg-cape-cod-700">
            <IconBrandInstagram />
          </div>
          <div className="bg-cape-cod-900 p-2 rounded-full cursor-pointer hover:bg-cape-cod-700">
            <IconBrandX />
          </div>
        </div>
      </div>

      <div className="flex gap-10 w-3/4 justify-around">
        {footerLinks.map((item, index) => (
          <div key={index} className="flex flex-col">
            <div className="text-lg font-semibold mb-4 text-blue-400">{item.title}</div>
            {item.links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                className="hover:text-blue-400 mb-1 text-sm transition duration-300 ease-in-out"
              >
                {link.name}
              </a>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Footer;
