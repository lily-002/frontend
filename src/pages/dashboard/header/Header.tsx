/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CaretDown, MagnifyingGlass, List, SignOut, UserCircle } from "@phosphor-icons/react";
import MobileMenu from "../components/MobileMenu";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/hooks";
import { getProfile } from "../../../store/features/Profile";
import { updateLogout } from "../../../store/features/Logout";
import { useTranslation } from "react-i18next";

// images
import coniasoftAILogo from "../../../assets/icons/ConiaSoft AI Icon.png";
import profileImage from "../../../assets/images/profile.png";
import handLeftIcon from "../../../assets/svg/pointer_black_l.svg";
import handRightIcon from "../../../assets/svg/pointer_black_r.svg";
import GlobalSearch from "../components/GlobalSearch";


interface HeaderProps {
  collapse: boolean;
  setCollapse: (val: boolean) => void;
}

const Header = ({collapse,   setCollapse}: HeaderProps) => {
  const { profile, loading, message } = useAppSelector(state => state.profile);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [showNotification, setShowNotification] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {

    if(!profile.id){ dispatch(getProfile()) }

  }, [dispatch]);


  const handleLogout = () => dispatch(updateLogout({logout: true}));

  return (
    <>
      {/* Mobile Menu */}
      <MobileMenu
        showMobileMenu={showMobileMenu}
        handleClose={() => setShowMobileMenu(false)}
      />

      {/* Search Component */}
      <GlobalSearch 
        show={showSearch}
        handleClose={() => setShowSearch(false)}
      />
    
      <div className="w-full px-4">
          <div className="flex justify-between items-center gap-3">
            <div className="flex justify-start items-center gap-3">
              {/* <div className="inline-block w-[24] min-w-[24px] md:hidden" onClick={() => setShowMobileNav(true)}> */}
                <List onClick={() => setShowMobileMenu(true)} size={20} weight="bold" className="inline-block md:hidden cursor-pointer" />
              {/* </div> */}


              <span onClick={() => setCollapse(!collapse)} className="hidden md:inline-block w-[40px] h-[40px] overflow-hidden cursor-pointer transition-all">
                  {collapse ? <img src={handRightIcon} alt="Icon" className="w-full h-full object-cover transition-all" /> : <img src={handLeftIcon} alt="Icon" className="w-full h-full object-cover" /> }
              </span>

              {/* Search */}
              <button onClick={() => setShowSearch(true)} className="border rounded-full flex justify-center items-center gap-2 text-xs py-1 px-4">
                <MagnifyingGlass size={24} weight="bold" className="text-primary" />
                <span className="hidden md:inline-block">{t("description.dashboard.search")}</span>
              </button>
            </div>
            

            <div className="flex justify-start items-center gap-3">
            <div className="flex justify-start items-center gap-3">
              {/* Notification */}
              <div tabIndex={0} onBlur={() => setTimeout(() => setShowNotification(false), 200)} onClick={() => setShowNotification(!showNotification)}
                    className="inline-block w-[20px] h-[20px] md:w-[24px] md:h-[24px] mr-4 relative cursor-pointer">
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#004181" viewBox="0 0 256 256">
                        <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"></path>
                    </svg> */}

                    <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" width="24px" height="24px" version="1.1" 
                        viewBox="0 0 6841.06 6841.06"
                        xmlnsXlink="http://www.w3.org/1999/xlink">
                        <g id="Layer_x0020_1">
                            <metadata id="CorelCorpID_0Corel-Layer"/>
                            <path fill="#238DC1" d="M3029.03 5390.77l778.29 -2.23c18.12,209.03 -178.51,389.32 -381.69,392.94 -210.62,3.75 -416.41,-181.01 -396.6,-390.71zm-1142.44 -789.53l3063.24 0.17c37.08,125.58 112.78,265.38 -12.76,354.92 -83.91,59.84 -358.98,39.32 -484.99,39.66 -340.62,0.89 -686.47,3.47 -1026.64,-1.68 -335.79,-5.08 -691.1,-5.71 -1026.65,0.6 -125.26,2.35 -401.03,23.95 -489.31,-34.13 -143.27,-94.25 -58.52,-239.5 -22.89,-359.54zm151.43 -393.62c61.9,-325.53 123.74,-442.34 150.07,-835.79 22.96,-342.91 -7.74,-571.29 108.7,-882.47 423.23,-1131.16 1854.65,-1089.82 2246.56,10.57 115.26,323.66 80.39,537.38 105.77,885.12 28.57,391.44 88.01,502.36 149.26,822.57 -158.65,14.47 -2444.53,2.57 -2760.36,0zm1190.09 -2936.81c3.73,-268.88 375.81,-272.79 380.16,-4.42l-380.16 4.42zm-394.27 106.13c-129.05,90.31 -344.93,177.97 -477.76,333.4 -76.89,89.97 -60.98,43.02 -190.29,214.52 -481.47,638.59 -288.94,1017.8 -392.53,1675.2 -36.16,229.32 -93.97,450.64 -164.99,659.23 -71.39,209.62 -215.28,391.63 -162.22,655.49 43.2,214.85 202.66,374.58 385.94,441.7 147.53,54.01 607.88,31.48 793.05,31.48 43.61,193.02 37.75,357.93 229.59,550.58 398,399.71 1069.46,264.28 1278.59,-224.15 56.96,-132.99 47.31,-191.38 78.14,-326.43 457.91,11.9 1050.98,90.5 1176.22,-461.22 59.05,-260.2 -83.22,-448.51 -155.93,-656.61 -429.39,-1229.04 74.87,-1553.13 -637.71,-2442.49 -69.34,-86.55 -230.6,-228.09 -327.84,-293.47 -78.11,-52.53 -179.78,-99.57 -263.51,-157.23 -3.24,-214.46 -11.93,-376.12 -135.92,-499 -280.9,-278.34 -606.95,-279.01 -889.17,-6.78 -134.3,129.54 -141.4,278.85 -143.66,505.78z"/>
                            <path fill="#238DC1" d="M2056.75 998.51c-411.97,107.6 -740.07,553.88 -794.87,947.43 -26.62,191.25 75.47,358.64 267.09,281.72 201.77,-81.01 35.08,-410.99 419.46,-737.49 54.82,-46.57 99.55,-80.87 182.93,-104.84 363.73,-104.51 176.08,-452.28 -74.61,-386.82z"/>
                            <path fill="#238DC1" d="M4653.02 995.42c-194.29,68.37 -166.76,277.38 -55.62,351.72 72.86,48.75 204.08,26.44 364.55,214.29 293.26,343.3 184.79,488.64 264.81,602.23 35.28,50.1 119.48,95.85 210.87,68.56 322.04,-96.17 24.41,-647.99 -75.92,-796.18 -82.73,-122.18 -162.22,-203.59 -284.19,-293.87 -76.33,-56.5 -294.26,-192.57 -424.5,-146.75z"/>
                        </g>
                    </svg>


                    <span className="flex justify-center items-center w-6 h-6 rounded-full bg-secondary text-white text-[0.5rem] absolute -top-3 -right-4 p-1">0</span>

                    {/* Notification modal */}
                    <div className={`${showNotification ? "block" : "hidden"} w-[220px] max-h-[220px] text-[0.6rem]  rounded border bg-white absolute top-8 -right-28 flex justify-start items-start flex-col gap-4 overflow-y-auto p-2 z-10 cursor-default transition-all`}>
                        {/* <Link to={`/dashboard/notifications/${1}`} className="w-full rounded bg-[#f8d7da] text-secondary p-2 cursor-pointer">
                            Some text content here...
                            <p style={{fontSize: "0.5rem", textAlign: "end"}}>{new Date().toLocaleDateString()}</p>
                        </Link> */}

                        <p>{t("description.dashboard.no_notification")}</p>
                    </div>
                </div>

              {/* Profile */}
              <div tabIndex={0} onBlur={() => setTimeout(() => setShowProfileModal(false), 200)} onClick={() => setShowProfileModal(!showProfileModal)} className="flex justify-start items-center gap-2 relative cursor-pointer">
                
                <span className="inline-block w-[38px] h-[38px] rounded-full border overflow-hidden">
                  <img src={profileImage} alt="Profile_Image" className="w-full h-full object-cover" />
                </span>
         
                <h2 className="font-semibold text-[0.6rem] md:text-xs flex justify-center items-center">
                  {loading ? <span className="inline-block w-[16px] h-[16px] rounded-full border-2 border-primary border-b-transparent animate-spin"></span> : null}
                  {!loading && !message && profile.username ? profile.username : null}
                </h2>

                <CaretDown color="#333333" size={15} weight="bold" className={`${showProfileModal ? "rotate-180" : ""} transition-all`} />

                {/* Profile Info */}
                {
                  showProfileModal ? (
                    <div className="inline-block w-full min-w-max border bg-white rounded absolute top-10 right-0 z-20 p-1">
                      
                      <Link to="/dashboard/profile-setting" className="w-full flex justify-start items-center gap-2 text-xs hover:bg-sky-50 py-1 px-2 mb-3">
                        <UserCircle size={20} color="#333333" weight="regular" className="min-w-[20px]" />
                        <span>Profile Setting</span>
                      </Link>
                      
                      <button onClick={handleLogout} className="w-full flex justify-start items-center gap-2 hover:bg-sky-50 py-1 px-2 text-xs">
                        <SignOut size={18} color="#F16021" weight="regular" className="min-w-[18px]" />
                        <span className="text-secondary">Logout</span>
                      </button>

                    </div>
                  ) : null
                }

              </div>
               
            </div>


              {/* AI Logo */}
              <span className="inline-block w-[46px] min-w-[46px] h-auto">
                  <img src={coniasoftAILogo} alt="Logo" className="w-full h-full object-cover" />
              </span>
            </div>
          </div>
      </div>
    </>
  )
}

export default Header;