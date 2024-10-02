/* eslint-disable @typescript-eslint/no-explicit-any */

import { X } from "@phosphor-icons/react";


interface addProducerSerialNumberProps {
  show: boolean;
  closeModal: () => void;
}

const AddProducerSerialNumber = ({
  show,
  closeModal,
}: addProducerSerialNumberProps) =>
  {

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
              
              <p className="text-black font-bold text-xs capitalize">
              Add New Producer Serial Number
              </p>
            </div>
            <div>
              <span className="flex justify-center items-center  w-[22px] min-w-[22px] h-[22px] rounded-full hover:bg-gray-100 ">
                <X
                  size={16}
                  weight="bold"
                  className="cursor-pointer"
                  onClick={closeModal}
                />
              </span>
            </div>
          </div>
          <div className="border-b border-gray-300"></div>
          <form action="" className="py-4 px-4">
            <h4 className=" text-primary font-normal xm leading-7 form-Header">
            MM SERIAL NUMBER INFORMATION
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
                  placeholder="enter user name"
                  className="w-full  h-[38px]  mt-3 border border-[#D9D9D9] rounded outline-primary transition-all p-2"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="UserName" className="font-bold text-black p-2">
                Last Serial Used
                </label>
                <br />
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="enter user name"
                  className="w-full  h-[38px]  mt-3 border border-[#D9D9D9] rounded outline-primary transition-all p-2"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="UserName" className="font-bold text-black p-2">
                Last MM Date Used
                </label>
                <br />
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="enter user name"
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
                  className="border border-[#D9D9D9] rounded mt-3 outline-primary transition-all p-2 w-[200px]"
                />
              </div>
              
              

              {/* <div className="select">
              <label htmlFor="UserName" className="font-bold text-black p-2">
                Role
              </label>
              <div className="relative">
                <select className=" w-full border border-primary text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                  <option className="w-">
                    <input
                      type="checkbox"
                      className=" accent-primary "
                    />
                    <p>hhhhhh</p>
                  </option>
                  <option>
                    <input
                      type="checkbox"
                      className="w-[14px] h-[14px] accent-primary "
                    />
                    hhhhhh
                  </option>
                  <option>
                    <input
                      type="checkbox"
                      className="w-[14px] h-[14px] accent-primary "
                    />
                    hhhhhh
                  </option>
                  <option>
                    <input
                      type="checkbox"
                      className="w-[14px] h-[14px] accent-primary "
                    />
                    hhhhhh
                  </option>
                  <option>
                    <input
                      type="checkbox"
                      className="w-[14px] h-[14px] accent-primary "
                    />
                    hhhhhh
                  </option>
                  <option>
                    <input type="checkbox" className="w-[14px] h-[14px] accent-primary" />
                  </option>
                  <option>
                    <input type="checkbox" className="w-[14px] h-[14px] accent-primary" />
                  </option>
                </select>
              </div>
            </div> */}
            </div>
            <div>
              <button className="addUser xs p-2">add</button>
            </div>
          </form>
        </div>
        {/* form end */}
      </div>


    </>
  )
}

export default AddProducerSerialNumber;