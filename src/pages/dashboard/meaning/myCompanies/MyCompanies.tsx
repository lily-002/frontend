/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { FilePdf, MicrosoftExcelLogo, PencilSimple , Eye, Trash} from "@phosphor-icons/react";
// import Pagination from "../../components/Pagination";
import ViewCompany from "./ViewCompany";
import { useEffect, useState } from "react";
import EditCompany from "./EditCompany";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks/hooks";
import { getCompanies, removeCompany } from "../../../../store/features/Companies";
import { Link } from "react-router-dom";
import { CompanyProps } from "../../../../types/types";
import ConfirmationModal from "../../components/ConfirmationModal";
import { toast } from "react-toastify";
import { axiosInstance } from "../../../../api/api";
import { getToken } from "../../../../services/auth";
import { useTranslation } from "react-i18next";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";


const MyCompanies = () => {
  const { companies, message, loading } = useAppSelector(state => state.companies);
  const dispatch = useAppDispatch();
  const [viewInfo, setViewInfo] = useState<any>({ show: false, company: {} });
  const [editInfo, setEditInfo] = useState<any>({ show: false, company: {} });
  const [deleteInfo, setDeleteInfo] = useState<any>({ show: false, loading: false, id: "" });
  const { t } = useTranslation();


  useEffect(() => {

    if(!companies.length){ dispatch(getCompanies())}

  }, [dispatch]);


  const handleView = (company: CompanyProps) => setViewInfo({...viewInfo, company, show: true});

  const handleEdit = (company: CompanyProps) => setEditInfo({...editInfo, company, show: true});

  const handleDeleteCompanyInfo = (id: number | string) => setDeleteInfo({...deleteInfo, show: true, id});
  
  const handleDeleteCompany = async () => {
    if(deleteInfo.loading){ return; }
    
    setDeleteInfo({...deleteInfo, loading: true });
    try {
      
      const { data } = await axiosInstance.delete(`/admin/companies/${deleteInfo.id}`, {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getToken()}`
        }
      });

      if(data.status){
        toast.success(data.message, {autoClose: 4000, pauseOnHover: false});
        
        dispatch(removeCompany({ id: deleteInfo.id}));
        return setTimeout(() => {
          return setDeleteInfo({...deleteInfo, show: false, loading: false, id: ""});
        }, 4000);
      }
      
      setDeleteInfo({...deleteInfo, show: false, loading: false, id: ""});
      return toast.error(data.message, {autoClose: 4000, pauseOnHover: false});
      
    } catch (error: any) {
      setDeleteInfo({...deleteInfo, show: false, loading: false, id: ""});
      return toast.error(error.response ? error.response.data?.error || error.response?.data?.message : t("description.errors.something_went_wrong_try_again_later"));
    }

  }
  
  const generateExcel = () => {
    const ws = XLSX.utils.json_to_sheet(companies.map(company => (
      {
        [t("description.dashboard.company_name")]: company.company_name,
        [t("description.dashboard.country")]: company.country,
        [t("description.dashboard.city")]: company.city,
        [t("description.dashboard.tax_number")]: company.tax_number,
        [t("description.dashboard.tax_office")]: company.tax_office,
        [t("description.auth.email")]: company.email,
        [t("description.auth.phone_number")]: company.phone_number,
        [t("description.dashboard.website")]: company.website,
        [t("description.dashboard.operating_center")]: company.operating_center,
        [t("description.dashboard.mersis_number")]: company.mersis_number,
        [t("description.dashboard.e_signature")]: company["e-signature_method"]
      }
    )));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "EConiaSoft producer receipt.xlsx");
  };

  const exportJsonToPdf = () => {
    const doc = new jsPDF() as any;

    doc.autoTable({
      head: [[
        t("description.dashboard.company_name"),
        t("description.dashboard.country"),
        t("description.dashboard.city"),
        t("description.dashboard.tax_number"),
        t("description.dashboard.tax_office"),
        t("description.auth.email"),
        t("description.auth.phone_number"),
        t("description.dashboard.website"),
        t("description.dashboard.operating_center"),
        t("description.dashboard.mersis_number"),
        t("description.dashboard.e_signature")
      ]],
      body: companies.map(company => [
        company.company_name,
        company.country,
        company.city,
        company.tax_number,
        company.tax_office,
        company.email,
        company.phone_number,
        company.website,
        company.operating_center,
        company.mersis_number,
        company["e-signature_method"]
      ]),
      headStyles: {
        fillColor: "#238DC1",
        lineWidth: 0.1,
        lineColor:  "#238DC1",
        fontSize: 5
      },
      bodyStyles: {
        lineWidth: 0.1,
        fontSize: 5
      }
    });

    doc.save('EConiaSoft producer receipt.pdf');
  };


  return (
    <>
      <ViewCompany
        showView={viewInfo.show}
        company={viewInfo.company}
        handleClose={() => setViewInfo({...viewInfo, show: false})}
      />

      <EditCompany
        showEdit={editInfo.show}
        company={editInfo.company}
        handleClose={() => setEditInfo({...editInfo, show: false})}
      />

      {/* Delete Company Modal */}
      <ConfirmationModal
        show={deleteInfo.show}
        message={t("description.dashboard.did_you_want_to_delete_this_company?")}
        loading={deleteInfo.loading}
        handleProceed={handleDeleteCompany}
        handleCancel={() => setDeleteInfo({...deleteInfo, show: false, id: ""})}
      />


      <h1 className="text-sm mb-2 font-bold">{t("description.dashboard.MY_COMPANIES")}</h1>
      <div className="flex justify-between items-center gap-4 mb-4">
        <p className="text-xs">{t("description.dashboard.meaning")}</p>

        <Link to="create" className="bg-secondary text-white text-xs py-1 px-4 rounded">{t("description.dashboard.create_company")}</Link>
      </div>

      {loading ? <div className="w-[50px] h-[50px] rounded-full border-[6px] border-primary border-b-transparent animate-spin mt-6 mx-auto"></div> : null}
      {!loading && message ? (<p className="text-[#F16021] bg-[#f15f213c] text-center mx-auto mt-12 p-2 rounded">{message}</p>) : null}
      {!loading && !message ? (
        companies.length ? (
            <>
              <div className="flex justify-start items-center gap-2 text-xs mb-5">
                <span className="inline-block mr-4">{t("description.dashboard.save_file_as")}</span>

                <span title="Excel" onClick={generateExcel}>
                  <MicrosoftExcelLogo size={20} color="green" weight="regular" className="cursor-pointer" />
                </span>

                <span title="PDF" onClick={exportJsonToPdf}>
                  <FilePdf size={20} color="red" weight="regular" className="cursor-pointer" />
                </span>
              </div>

              <div className="w-full overflow-x-scroll mb-4">
                <table className="w-full table-auto text-center whitespace-nowrap text-xs mb-3">
                  <thead className="whitespace-nowrap">
                    <tr className="bg-[#F3FAFF]">
                      <th className="p-3 text-start border border-primary">{t("description.dashboard.company_name")}</th>
                      <th className="p-3 text-start border border-primary">{t("description.dashboard.country")}</th>
                      <th className="p-3 text-start border border-primary">{t("description.dashboard.city")}</th>
                      <th className="p-3 text-start border border-primary">{t("description.dashboard.tax_number")}</th>
                      <th className="p-3 text-start border border-primary">{t("description.dashboard.tax_office")}</th>
                      {/* <th className="p-3 text-start border border-primary">GIB Registration Date</th> */}
                      {/* <th className="p-3 text-start border border-primary">GIB Sender Alias</th> */}
                      {/* <th className="p-3 text-start border border-primary">GIB Receiver Alias</th> */}
                      {/* <th className="p-3 text-start border border-primary">Address</th> */}
                      <th className="p-3 text-start border border-primary">{t("description.auth.email")}</th>
                      <th className="p-3 text-start border border-primary">{t("description.auth.phone_number")}</th>
                      <th className="p-3 text-start border border-primary">{t("description.dashboard.website")}</th>
                      <th className="p-3 text-start border border-primary">{t("description.dashboard.operating_center")}</th>
                      <th className="p-3 text-start border border-primary">{t("description.dashboard.mersis_number")}</th>
                      <th className="p-3 text-start border border-primary">{t("description.dashboard.e_signature")}</th>
                      <th className="p-3 text-start border border-primary">{t("description.dashboard.action")}</th>
                    </tr>
                  </thead>

                  <tbody>
                      {
                        companies.map((company, index) => (
                          <tr key={index + 1} className='border'>
                            <td className='p-3 border'>{company.company_name}</td>
                            <td className='p-3 border'>{company.country}</td>
                            <td className='p-3 border'>{company.city}</td>
                            <td className='p-3 border'>{company.tax_number}</td>
                            <td className='p-3 border'>{company.tax_office}</td>
                            {/* <td className='p-3 border'>{company.gib_registration_data}</td> */}
                            {/* <td className='p-3 border'>{company.gib_sender_alias}</td> */}
                            {/* <td className='p-3 border'>{company.gib_receiver_alias}</td> */}
                            {/* <td className='p-3 border'>{company.address}</td> */}
                            <td className='p-3 border'>{company.email}</td>
                            <td className='p-3 border'>{company.phone_number}</td>
                            <td className='p-3 border'>{company.website}</td>
                            <td className='p-3 border'>{company.operating_center}</td>
                            <td className='p-3 border'>{company.mersis_number}</td>
                            <td className='p-3 border'>{company["e-signature_method"]}</td>
                            <td className='p-3 border'>
                              <div className="flex justify-center items-center gap-2">
                                <PencilSimple size={16} onClick={() => handleEdit(company)} color="#62c69b" className="cursor-pointer" /> 
                                <Eye size={16} color="red" onClick={() => handleView(company)} className="cursor-pointer" />
                                <Trash size={16} color="red" onClick={() => handleDeleteCompanyInfo(company.id)} className="cursor-pointer" />
                              </div>
                            </td>
                          </tr>
                        ))
                      }
                  </tbody>
                </table>
              </div>

              {/* <Pagination/> */}
            </>
        ) : (
          <p className="text-center text-xs text-secondary mt-8">{t("description.messages.no_record_found")}</p>
        )
      ) : null}

    </>
  )
}

export default MyCompanies;