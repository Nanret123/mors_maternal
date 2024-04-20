import { FaTwitter } from "react-icons/fa6";
import { RiLinkedinFill } from "react-icons/ri";
import MORS from "../../assets/images/MORS.png";
import { Link } from "react-router-dom";

const socialLinks = [
  {
    path: "https://twitter.com/_nan_ret_",
    icon: <FaTwitter className="group-hover:text-white w-4 h-5" />,
  },
  {
    path: "https://twitter.com/_nan_ret_",
    icon: <RiLinkedinFill className="group-hover:text-white w-4 h-5" />,
  },
  {
    path: "https://twitter.com/_nan_ret_",
    icon: <FaTwitter className="group-hover:text-white w-4 h-5" />,
  },
];

const quickLinks01 = [
  {
    name: "Home",
    path: "/home",
  },

  {
    name: "Services",
    path: "/services",
  },

];

const quickLinks02 = [
  {
    name: "Find a doctor",
    path: "/find-a-doctor",
  },
  {
    name: "Request an appointment",
    path: "/",
  },
  {
    name: "Find a Location",
    path: "/",
  },
  {
    name: "Get an Opinion",
    path: "/",
  },
];

const quickLinks03 = [
  // {
  //   name: "Donate",
  //   path: "/",
  // },
  {
    name: "Contact Us",
    path: "/contact",
  },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="pb-16 pt-10">
      <div className="container-g">
        <div className="flex justify-between flex-col md:flex-row flex-wrap gap-[30px]">
          <div>
            <img src={MORS} alt="" className="w-[100px] h-[20px]" />
            <p>Copyright {year}</p>

            <div className="flex items-center gap-3 mt-4">
              {socialLinks.map((item, index) => (
                <Link
                  to={Link.path}
                  key={index}
                  className="w-9 h-9 border border-solid border-[#181A1E] rounded-full flex items-center justify-center group hover:bg-primaryColor hover:border-none "
                >
                  {item.icon}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-headingColor">
              Quick Links
            </h2>

            <ul>
              {quickLinks01.map((item, index) => (
                <li key={index} className="mb-4">
                  <Link to={item.path} className="text-[16px] leading-7 font-[400] text-textColor">{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

           <div>
           <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-headingColor">
             Support
            </h2>

            <ul>
              {quickLinks03.map((item, index) => (
                <li key={index} className="mb-4">
                  <Link to={item.path} className="text-[16px] leading-7 font-[400] text-textColor">{item.name}</Link>
                </li>
              ))}
            </ul>
            {/* <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-headingColor">
              I want to go to:
            </h2>

            <ul>
              {quickLinks02.map((item, index) => (
                <li key={index} className="mb-4">
                  <Link to={item.path} className="text-[16px] leading-7 font-[400] text-textColor">{item.name}</Link>
                </li>
              ))}
            </ul> */}

          </div> 
          
          <div>
           
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
