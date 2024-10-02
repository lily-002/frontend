import loaderIcon from "../../assets/svg/loader.svg";
// Style
import "./Loader.css";

const Loader = ({ message }: { message?: string} ) => {

    return (
        <div className="w-full h-screen bg-white z-[60] fixed top-0 left-0 flex justify-center items-center">
            
            <div>
                <div className="w-[130px] h-[130px] rounded overflow-hidden mb-4">
                    <img src={loaderIcon} alt="Logo" className="w-full h-full" />
                </div>

                <p className="text-center text-secondary">{message ? message: "Loading..."}</p>
            </div>
        </div>
    );
}

export default Loader;