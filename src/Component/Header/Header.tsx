import { Burger, Button, Drawer } from "@mantine/core";
import NavLinks from "./NavLinks";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProfile } from "../../Services/ProfileServices";
import { setProfile } from "../../Slices/ProfileSlice";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { setUser } from "../../Slices/UserSlices";
import { setupResponseInterceptors } from "../../Interceptor/AxiosInterceptor";
import { useDisclosure } from "@mantine/hooks";
import { IconX } from "@tabler/icons-react";

interface CustomJwtPayload extends JwtPayload {
  sub?: string;
  profileId?: string;
}

const Header = () => {
  const user = useSelector((state: any) => state.user);
  const token = useSelector((state: any) => state.jwt);
  const [opened, { open, close }] = useDisclosure(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const links = [
    { name: "Find jobs", url: "find-jobs" },
    { name: "Hackathon", url: "find-hackathon" },
    { name: "Post jobs", url: "post-job/0" },
    { name: "About us", url: "about" },
    { name: "Gallery", url: "job-gallery" },
  ];

  useEffect(() => {
    setupResponseInterceptors(navigate);
  }, [navigate]);

  useEffect(() => {
    if (!token || token.trim() === "") {
      dispatch(setUser(null));
      return;
    }

    try {
      const decoded: CustomJwtPayload = jwtDecode<CustomJwtPayload>(token);
      dispatch(setUser({ ...decoded, email: decoded.sub }));

      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        console.warn("Token expired. Logging out.");
        dispatch(setUser(null));
        return;
      }

      if (decoded.profileId) {
        getProfile(decoded.profileId)
          .then((res) => dispatch(setProfile(res)))
          .catch((error: any) => console.error("Error fetching profile:", error));
      }
    } catch (error) {
      console.error("Invalid token:", error);
      dispatch(setUser(null));
    }
  }, [token, user?.profileId, dispatch]);

  if (location.pathname === "/signup" || location.pathname === "/login") {
    return null;
  }

  return (
    <div className="w-full bg-cape-cod-950 px-6 text-white h-20 flex justify-between items-center font-['poppins']">
      <div className="flex gap-3 items-center text-blue-400">
        <img src={require("../../assets/logo.png")} alt="Stemlen Logo" className="h-10 w-11 " />
        <Link to="">
          <div className="text-3xl font-semibold xs-mx:hidden"><span className="text-cape-cod-100">Stem</span>len</div>
        </Link>
      </div>
      {NavLinks()}
      <div className="flex gap-3 items-center">
        {user ? <ProfileMenu /> : <>
          <Link to="/login" className="text-blue-400">
            <Button color="blue.4" variant="outline">Login</Button>
          </Link>
          <Link to="/signup" className="text-blue-400">
            <Button color="blue.4" variant="filled">SignUp</Button>
          </Link>
        </>}
        {

        }
        <Burger className="bs:hidden" opened={opened} onClick={open} aria-label="Toggle navigation" />
        <Drawer size="xs" overlayProps={{ backgroundOpacity: 0.5, blur: 4 }} opened={opened} onClose={close} position="right" closeButtonProps={{ icon: <IconX size={30} /> }}>
        <div className="flex flex-col gap-5 p-5">
          {

            links.map((link, index) => (
              <Link
                key={index}
                to={`/${link.url}`}
                className={`transition-colors duration-300 flex text-lg ${location.pathname === `/${link.url}` ? "text-blue-400" : "hover:text-blue-500"
                  }`}
              >
                {link.name}
              </Link>
            ))
          }
          </div>
        </Drawer>
      </div>
    </div>
  );
};

export default Header;
