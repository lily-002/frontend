/* eslint-disable @typescript-eslint/no-explicit-any */
import { Eye, X } from "@phosphor-icons/react";

interface ViewProducerNumberProps {
  show: boolean;
  closeModal: () => void;
}

const ViewProducerSerialNumber = ({
  show,
  closeModal,
}: ViewProducerNumberProps) => {
  const handleClose = (ev: any) => {
    const target = ev.target as HTMLDivElement;
    if (target.className.includes("parent")) {
      closeModal();
    }
  };
  return (
    <>
      <div
        onClick={handleClose}
        className={`parent w-full h-screen bg-[#00000080] ${
          show ? "fixed" : "hidden"
        } top-0 left-0 z-50 transition-all`}
      >
        {/* form modal */}
        <div className="bg-white text-xs max-w-sm  shadow-xl w-[500px] h-screen  overflow-y-scroll absolute top-0 right-0 ">
          <div className="Header flex justify-between items-center gap-3 py-4 px-4">
            <div className="flex justify-start items-center gap-2 ">
              <Eye size={16} color="orange" className="cursor-pointer" />
              <p className="text-black font-bold text-xs capitalize">
                View Producer Serial Number
              </p>
            </div>
            <div>
              <span className="flex justify-center items-center  w-[22px] min-w-[22px] h-[22px] rounded-full hover:bg-gray-100 ">
                <X
                  size={16}
                  weight="bold"
                  className="cursor-pointer "
                  onClick={closeModal}
                />
              </span>
            </div>
          </div>
          <div className="border-b border-gray-300"></div>
          <form action="" className="py-4 px-4">
            <h4 className=" text-primary font-normal xm leading-7 form-Header">
              MM SERIAL NUMBER
            </h4>
            <div className="border-b border-primary my-4"></div>
            <div className="form body p-2">
              <div className="mb-3">
                <label htmlFor="UserName" className="font-bold text-black pb-2">
                  COMPANY NUMBER<span className="text-red-500">*</span>
                </label>
                <br />
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="ALIYU BARDE NIG LIMITED"
                  className="w-full  h-[38px]  mt-3 border border-[#D9D9D9] rounded outline-primary transition-all p-2"
                />
              </div>
              <div className="flex justify-between items-center gap-2 capitalize">
                <div className="mb-3">
                  <label htmlFor="years" className="font-bold text-black p-2">
                    Year
                    <span className="text-red-500 font-light sm whitespace-normal ">
                      *
                    </span>
                  </label>
                  <br />
                  <select
                    name=""
                    id=""
                    className="border border-[#D9D9D9] rounded mt-3 outline-primary transition-all p-2 w-[200px]"
                  >
                    <option value=""></option>
                  </select>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="UserName" className="font-bold text-black p-2">
                  MM Serial Code<span className="text-red-500">*</span>
                </label>
                <br />
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="xxx"
                  className="w-full  h-[38px]  mt-3 border border-[#D9D9D9] rounded outline-primary transition-all p-2"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="UserName" className="font-bold text-black p-2">
                  Last Serial Used <span className="text-red-500">*</span>
                </label>
                <br />
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="29"
                  className="w-full  h-[38px]  mt-3 border border-[#D9D9D9] rounded outline-primary transition-all p-2"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="UserName" className="font-bold text-black p-2">
                  Last MM Date Used<span className="text-red-500">*</span>
                </label>
                <br />
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="30/12/2023"
                  className="w-full  h-[38px]  mt-3 border border-[#D9D9D9] rounded outline-primary transition-all p-2"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="UserName" className="font-bold text-black p-2">
                  Priority Rank
                </label>
                <br />
                <input
                  type="number"
                  name="phone number"
                  placeholder="0"
                  className="border border-[#D9D9D9] rounded mt-3 outline-primary transition-all p-2 w-[200px]"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="UserName" className="font-bold text-black p-2">
                  Last MM Date Used
                </label>
                <br />
                <input
                  type="number"
                  name="phone number"
                  placeholder="0"
                  className="border border-[#D9D9D9] rounded mt-3 outline-primary transition-all p-2 w-[200px]"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="UserName" className="font-bold text-black p-2">
                  Last Update Date<span className="text-red-500">*</span>
                </label>
                <br />
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="30/12/2023"
                  className="w-full  h-[38px]  mt-3 border border-[#D9D9D9] rounded outline-primary transition-all p-2"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="UserName" className="font-bold text-black p-2">
                  Last Update User<span className="text-red-500">*</span>
                </label>
                <br />
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="musa wakili"
                  className="w-full  h-[38px]  mt-3 border border-[#D9D9D9] rounded outline-primary transition-all p-2"
                />
              </div>
            </div>
            <div>
              <button className="bg-[#F16623] text-xs text-white rounded-lg text-center py-2 px-4">
                close
              </button>
            </div>
          </form>
        </div>
        {/* form end */}
      </div>
    </>
  );
};

export default ViewProducerSerialNumber;
