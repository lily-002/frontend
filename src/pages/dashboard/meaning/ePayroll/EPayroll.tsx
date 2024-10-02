import { FilePdf, MicrosoftExcelLogo, PencilSimple , Eye, Trash, File, Plus} from "@phosphor-icons/react";
import Pagination from "../../components/Pagination";
import { useState } from "react";
import ViewPayroll from "./ViewPayroll";
import EditPayroll from "./EditPayroll";
import AddDocumentModal from "./AddDocumentModal";


interface DataProps {
  id: number | string;
  show: boolean;
  }

const TABLE_HEAD = ["First Name", "Last Name","TR number", "Mobile phone", "Email", "Application", "Activation"," " ]
const TABLE_ROW =[
    {
        first_name: 'CUKUROVA HOLDING',
        last_name: 'Istabul',
        tr_id_number: 3230512384,
        mobile_phone: 'İlyasbey',
        email: 'urn:mail:defaultgb@edmbilisim.com.tr',
        application: <p className=" text-balance">1Failed br Application</p>,
        activation: <p className=" text-balance">Failed <br /> Application</p>
       
    },
  
]

const MyCompanies = () => {
  const [viewPayroll, setPayroll] = useState<DataProps>({show: false, id: ""});
  const [editPayroll, setEditPayroll] = useState<DataProps>({show: false, id: ""});
  const [addDocumentModal, setdocumentModal ] = useState<DataProps>({show: false, id: ""})
  

  const handlePayroll = (id: number | string) => {
    setPayroll({...viewPayroll, id, show: true})
  }


  const handleEditPayroll = (id: number | string) => {
    setEditPayroll({...editPayroll, id, show: true})
  }
  const handleDocumentModel = (id: number | string) =>{
    setdocumentModal({...addDocumentModal, id, show: true})
  }

  return (
    <>
    
    <ViewPayroll
    id={viewPayroll.id}
    show={viewPayroll.show}
    handleClosePayroll={()=>setPayroll({...viewPayroll, id: '', show: false})} />

    <EditPayroll
        id={editPayroll.id}
        show={editPayroll.show} 
        handleClosePayroll={()=> setEditPayroll({...editPayroll, id: '', show: false}) }    />

<AddDocumentModal id={addDocumentModal.id} show={addDocumentModal.show} handleCloseDocumentModal={()=> setdocumentModal({...addDocumentModal, id: '', show: false})} />

 

       <div className="flex justify-between items-center p5-10 w-full">
        <div>
        <h1 className="text-sm mb-2 font-bold">E-PAYROLL PERSONNEL LIST</h1>
        <p className="text-xs mb-4">Meaning</p>

        <div className="flex justify-start items-center gap-2 text-xs mb-5">
          <span className="inline-block mr-4">Save file as</span>

          <span title="Excel">
            <MicrosoftExcelLogo size={20} color="green" weight="regular" className="cursor-pointer" />
          </span>

          <span title="PDF">
            <FilePdf size={20} color="red" weight="regular" className="cursor-pointer" />
          </span>
        </div>

        </div>


      


        <div className="flex flex-col  items-end mb-5 gap-2">
          <h1 className="text-md font-bold">Upload Excel</h1>
          <input type="search" name="" id="" className="border border-[#D9D9D9] placeholder:px-2 rounded-xl outline-none" placeholder="Search here" />
          <button className="flex justify-center items-center  bg-primary p-2 rounded-xl text-white"> <Plus /> Upload  </button>
          <a href="" className="text-primary underline">Download the sample personnel document file by clicking here.</a>
        </div>
       </div>



        <div className="w-full overflow-x-scroll mb-4">
          <table className="w-full table-auto text-center whitespace-nowrap text-xs mb-3">
            <thead>
              <tr className="border bg-[#F3FAFF]">
                {TABLE_HEAD.map((head)=>(<th className="border p-3 text-center" key={head}>{head}</th>))}
              </tr>
            </thead>

            <tbody>{TABLE_ROW.map(({first_name,last_name,tr_id_number,mobile_phone,email,application,activation}, index)=>{
              return(
                <tr key={index} className='border'>
                  <td className='p-3 border'>{first_name}</td>
                  <td className='p-3 border'>{last_name}</td>
                  <td className='p-3 border'>{tr_id_number}</td>
                  <td className='p-3 border'>{mobile_phone}</td>
                  <td className='p-3 m-auto border'>{email}</td>
                  <td className='p-3 border  text-red-500'>{application}</td>
                  <td className='p-3 border text-red-500'>{activation}</td>
                  <td className='p-3 border'>
                    <div className="flex justify-center items-center gap-2">
                      <PencilSimple size={16} onClick={()=>handleEditPayroll(index)} color="#62c69b" className="cursor-pointer" /> 
                      <Trash size={16} color="red" className="cursor-pointer" />
                      <File size={16} onClick={()=> handleDocumentModel(index)}  className="cursor-pointer text-primary" />
                      <Eye size={16} onClick={()=>handlePayroll(index)} color="red"className="cursor-pointer" />
                    </div>
                  </td>
              </tr>
              )
            })}
            </tbody>
          </table>
        </div>

        <Pagination/>
    </>
  )
}

export default MyCompanies;