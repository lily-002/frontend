import { CalendarBlank, Lock, User } from "@phosphor-icons/react";

// Image/icon
import masterCardIcon from "../../../assets/icons/master_card.png";

const BuyCredit = () => {

  return (
    <div className="w-full min-h-[80vh] border shadow-lg py-8 px-6 text-xs">
      <h2 className="text-sm text-center mb-6">Current Credit Balance: <span className="text-primary">45667897</span> </h2>

      <div className="w-full md:max-w-[400px] border border-primary rounded mx-auto py-10 px-8">
        <div className="w-full mb-8">
          <label htmlFor="cardName" className="block text-[#00010280] mb-2">Card Name</label>
          <input type="text" id="cardName"
            className="w-full border-b border-[#D9D9D9] outline-none focus:border-primary pb-2 pl-0 pr-8 transition-all placeholder:text-[#000102]"
            placeholder="John Doe"
          />
          <span className="w-[20px] h-[20px] bg-white absolute top-6 right-2 flex justify-center items-center z-10">
            <User size={16} color="#238DC1" weight="regular" />
          </span>
        </div>

        <div className="w-full mb-8">
          <label htmlFor="cardNnumber" className="block text-[#00010280] mb-2">Card Number</label>
          <input type="text" id="cardNnumber"
            className="w-full border-b border-[#D9D9D9] outline-none focus:border-primary pb-2 pl-0 pr-8 transition-all placeholder:text-[#000102]"
            placeholder="0987 2345 0986 2345"
          />
          <span className="w-[20px] h-[20px] bg-white absolute top-6 right-2 flex justify-center items-center z-10" style={{backgroundImage: `url(${masterCardIcon})`, backgroundPosition: "center", backgroundSize: "100%", backgroundRepeat: "no-repeat"}}>
            {/* <img src={masterCardIcon} alt="Card" className="w-full h-screen object-contain selection:select-none" /> */}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="w-full mb-4">
            <label htmlFor="expirationDate" className="block text-[#00010280] mb-2">Expiration Date</label>
            <input type="text" id="expirationDate"
              className="w-full border-b border-[#D9D9D9] outline-none focus:border-primary pb-2 pl-0 pr-8 transition-all placeholder:text-[#000102]"
              placeholder="05/25"
            />
            <span className="w-[20px] h-[20px] bg-white absolute top-6 right-2 flex justify-center items-center z-10">
              <CalendarBlank size={16} color="#238DC1" weight="regular" />
            </span>
          </div>

          <div className="w-full mb-8">
            <label htmlFor="cvv" className="block text-[#00010280] mb-2">CVV</label>
            <input type="password" id="cvv"
              className="w-full border-b border-[#D9D9D9] outline-none focus:border-primary pb-2 pl-0 pr-8 transition-all placeholder:text-[#000102]"
              placeholder="********"
            />
            <span className="w-[20px] h-[20px] bg-white absolute top-6 right-2 flex justify-center items-center z-10">
              <Lock size={16} color="#238DC1" weight="regular" />
            </span>
          </div>
        </div>

        <button className="w-full bg-primary text-white rounded-full p-2">
          Buy Credit
        </button>
      </div>
    </div>
  )
}

export default BuyCredit;