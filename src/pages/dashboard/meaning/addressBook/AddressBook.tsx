import { PencilSimple, Eye, Trash, File, MicrosoftExcelLogo, FunnelSimple } from "@phosphor-icons/react";
import Pagination from "../../components/Pagination";
import AddRecord from "./AddRecord";
import { useState } from "react";
import CustomerUpload from "./CustomerUpload";

interface DataProps {
  id: number | string;
  show: boolean;
}

const TABLE_HEAD = ["Supplier/Customer Name", "Tax Number", "City", "Tax Office", "Mobile Number", "GIB Registration", "Activation", "GIVE transmitter alias", " "];
const TABLE_ROW = [
  {
    first_name: 'CUKUROVA HOLDING',
    last_name: 'Istanbul',
    tr_id_number: 3230512384,
    mobile_phone: 'İlyasbey',
    email: 'urn:mail:defaultgb@edmbilisim.com.tr',
    application: <p className="text-balance">1 Failed br Application</p>,
    activation: <p className="text-balance">Failed <br /> Application</p>
  },
];

const AddressBook = () => {
  const [viewRecord, setViewRecord] = useState<DataProps>({ show: false, id: "" });
  const [upload, setUpload] = useState<DataProps>({ show: false, id: "" });

  const handleRecord = (id: number | string) => {
    setViewRecord({ ...viewRecord, id, show: true });
  }

  const handleUpload = (id: number | string) => {
    setUpload({ ...upload, id, show: true });
  }

  return (
    <>
      <AddRecord
        id={viewRecord.id}
        showRecord={viewRecord.show}
        handleCloseRecord={() => setViewRecord({ ...viewRecord, id: '', show: false })}
      />

      <CustomerUpload
        id={upload.id}
        showUpload={upload.show}
        handleCloseUpload={() => setUpload({ ...upload, id: '', show: false })}
      />

      <div>
        <div className="flex justify-between items-center">
          <div className="justify-start items-center gap-2 text-xs mb-5">
            <h1 className="text-sm mb-2 font-bold">ADDRESS BOOK</h1>
            <p className="text-xs mb-4">Meaning</p>
            <span className="inline-block mr-4">Save file as</span>

            <span title="Excel">
              <MicrosoftExcelLogo size={20} color="green" weight="regular" className="cursor-pointer" />
            </span>
            <h1>2018 & EDM BILISIM SISTEMLERI VE DANISMANLIK HIZMETLERI</h1>
          </div>
          <div className="md:flex md:flex-col p-2 space-y-2">
            <span className="md:flex space-x-1 justify-end">
              <input className="border rounded-lg" type="search" name="" id="" />
              <span className="border p-2 rounded-lg bg-primary text-white py-1 px-3 flex justify-center items-center"><FunnelSimple size={32} weight="bold" />filter</span>
            </span>
            <select className="w-[100px] float-left" name="" id="">
              <option value="">Sms notification active for sent e-archive invoice</option>
              <option value="">All</option>
              <option value="">Sms notification passive for sent e-archive invoice</option>
            </select>
            <span className="md:flex gap-2">
              <button className="border p-2 rounded-lg bg-primary text-white py-1 px-3 flex justify-center items-center">Excel present Download</button>
              <button className="border p-2 rounded-lg bg-primary text-white py-1 px-3 flex justify-center items-center">Operations</button>
            </span>
          </div>
        </div>
        <div className="w-full overflow-x-scroll mb-4">
          <table className="w-full table-auto text-center whitespace-nowrap text-xs mb-3">
            <thead>
              <tr className="border bg-[#F3FAFF]">
                {TABLE_HEAD.map((head) => (<th className="border p-3 text-center" key={head}>{head}</th>))}
              </tr>
            </thead>

            <tbody>
              {TABLE_ROW.map(({ first_name, last_name, tr_id_number, mobile_phone, email, application, activation }, index) => {
                return (
                  <tr key={index} className='border'>
                    <td className='p-3 border'>{first_name}</td>
                    <td className='p-3 border'>{last_name}</td>
                    <td className='p-3 border'>{tr_id_number}</td>
                    <td className='p-3 border'>{mobile_phone}</td>
                    <td className='p-3 m-auto border'>{email}</td>
                    <td className='p-3 border text-red-500'>{application}</td>
                    <td className='p-3 border text-red-500'>{activation}</td>
                    <td className='p-3 border'>
                      <div className="flex justify-center items-center gap-2">
                        <PencilSimple size={16} color="#62c69b" className="cursor-pointer" />
                        <Trash size={16} color="red" className="cursor-pointer" />
                        <File size={16} onClick={() => handleUpload(index)} className="cursor-pointer text-primary" />
                        <Eye size={16} onClick={() => handleRecord(index)} color="red" className="cursor-pointer" />
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

      </div>

      <Pagination />
    </>
  )
}

export default AddressBook;
