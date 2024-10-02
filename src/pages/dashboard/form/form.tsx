import { CalendarBlank, Lock, User } from "@phosphor-icons/react";

// Image/icon
import masterCardIcon from "../../../assets/icons/master_card.png";

const Form = () => {
  return (
    <div className="w-full min-h-[80vh] border shadow-lg py-8 px-6 text-xs">
      <h2 className="text-sm text-center mb-6">
        Current Credit Balance: <span className="text-primary">45667897</span>
      </h2>

      <div className="w-full md:max-w-[400px] border border-primary rounded mx-auto py-10 px-8">
        {/* Email Field */}
        <div className="w-full mb-8 relative">
          <label htmlFor="email" className="block text-[#00010280] mb-2">Email</label>
          <input
            type="email"
            id="email"
            className="w-full border-b border-[#D9D9D9] outline-none focus:border-primary pb-2 pl-0 pr-8 transition-all placeholder:text-[#000102]"
            placeholder="example@example.com"
          />
          <span className="w-[20px] h-[20px] bg-white absolute top-6 right-2 flex justify-center items-center z-10">
            <User size={16} color="#238DC1" weight="regular" />
          </span>
        </div>

        {/* Invoice ID Field */}
        <div className="w-full mb-8 relative">
          <label htmlFor="invoiceId" className="block text-[#00010280] mb-2">Invoice ID</label>
          <input
            type="text"
            id="invoiceId"
            className="w-full border-b border-[#D9D9D9] outline-none focus:border-primary pb-2 pl-0 pr-8 transition-all placeholder:text-[#000102]"
            placeholder="INV-123456"
          />
          <span className="w-[20px] h-[20px] bg-white absolute top-6 right-2 flex justify-center items-center z-10">
            <User size={16} color="#238DC1" weight="regular" />
          </span>
        </div>

        {/* User ID Field */}
        <div className="w-full mb-8 relative">
          <label htmlFor="userId" className="block text-[#00010280] mb-2">User ID</label>
          <input
            type="text"
            id="userId"
            className="w-full border-b border-[#D9D9D9] outline-none focus:border-primary pb-2 pl-0 pr-8 transition-all placeholder:text-[#000102]"
            placeholder="User-123456"
          />
          <span className="w-[20px] h-[20px] bg-white absolute top-6 right-2 flex justify-center items-center z-10">
            <User size={16} color="#238DC1" weight="regular" />
          </span>
        </div>

        <button className="w-full bg-primary text-white rounded-full p-2">
          Submit
        </button>
      </div>
    </div>
  );
};

export default Form;
