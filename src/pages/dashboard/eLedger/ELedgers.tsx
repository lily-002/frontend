/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { FilePdf, MicrosoftExcelLogo, PencilSimple , Eye, Trash} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/hooks";
// import { Link } from "react-router-dom";
import ConfirmationModal from "../components/ConfirmationModal";
import { toast } from "react-toastify";
import { axiosInstance } from "../../../api/api";
import { getToken } from "../../../services/auth";
import { useTranslation } from "react-i18next";
import { getELedgers, removeEledger } from "../../../store/features/ELedgers";
// import { ELedgerProps } from "../../../types/types";
import ViewEledger from "./ViewELedger";
import EditEledger from "./EditEledger";
import useRoles from "../../../authentication/useRoles";
import { getCurrencies } from "../../../store/features/Currencies";
import { getPaymentMethods } from "../../../store/features/PaymentMethod";
import { getELedgerCategories } from "../../../store/features/ELedgerCategories";
import { getELedgerStatuses } from "../../../store/features/ELedgerStatus";
import { getELedgerTaxInfos } from "../../../store/features/ELedgerTaxInfo";
import { getELedgerTransactionTypes } from "../../../store/features/ELedgerTransactionTypes";
import { getCompanies } from "../../../store/features/Companies";
import { getCategoryValue, getCurrencyUnitValue, getPaymentMethodValue, getTaxInfoValue, getTransactionTypeValue } from "../../../utils/utils";


const ELedgers = () => {
  const { eLedgers, message, loading } = useAppSelector(state => state.eLedgers);

  const {currencies, loading: currencyLoader, message: currencyMessage} = useAppSelector(state => state.currencies);
    
  const {paymentMethods, loading: paymentMethodsLoader, message: paymentMethodsMessage} = useAppSelector(state => state.paymentMethods);
  const {eLedgerCategories, loading: eLedgerCategoriesLoader, message: eLedgerCategoriesMessage} = useAppSelector(state => state.eLedgerCategories);
  const {eLedgerStatuses} = useAppSelector(state => state.eLedgerStatuses);
  const {eLedgerTaxInfos, loading: eLedgerTaxInfosLoader, message: eLedgerTaxInfosMessage} = useAppSelector(state => state.eLedgerTaxInfos);
  const {eLedgerTransactionTypes, loading: eLedgerTransactionTypesLoader, message: eLedgerTransactionTypesMessage} = useAppSelector(state => state.eLedgerTransactionTypes);
  const {companies} = useAppSelector(state => state.companies);

  const dispatch = useAppDispatch();
  const [deleteInfo, setDeleteInfo] = useState<any>({ show: false, loading: false, id: "" });
  const [viewInfo, setViewInfo] = useState<any>({ show: false, eLedger: {} });
  const [editInfo, setEditInfo] = useState<any>({ show: false, company: {} });
  const { t } = useTranslation();
  const roles = useRoles();


  useEffect(() => {

    if(!eLedgers.length){ dispatch(getELedgers())}

  }, [dispatch]);
  

  useEffect(() => {

    if(!currencies.length){ dispatch(getCurrencies())}
    if(!paymentMethods.length){ dispatch(getPaymentMethods())}
    if(!eLedgerCategories.length){ dispatch(getELedgerCategories())}
    if(!eLedgerStatuses.length){ dispatch(getELedgerStatuses())}
    if(!eLedgerTaxInfos.length){ dispatch(getELedgerTaxInfos())}
    if(!eLedgerTransactionTypes.length){ dispatch(getELedgerTransactionTypes())}
    if(roles && roles.includes("admin")){
        if(!companies.length){ dispatch(getCompanies())}
    }

}, [
    dispatch, currencies.length, 
    paymentMethods.length, eLedgerCategories.length, eLedgerStatuses.length,
    eLedgerTaxInfos.length, eLedgerTransactionTypes.length, companies.length,
]);

  const handleDeleteELedgerInfo = (id: number | string) => setDeleteInfo({...deleteInfo, show: true, id});
  const handleView = (eLedger: any) => setViewInfo({...viewInfo, eLedger, show: true});
  const handleEdit = (eLedger: any) => setEditInfo({...editInfo, eLedger, show: true});
  
  const handleDeleteELedger = async () => {
    if(deleteInfo.loading){ return; }
    
    setDeleteInfo({...deleteInfo, loading: true });
    try {
      
      const { data } = await axiosInstance.delete(`/user/eledger/${deleteInfo.id}`, {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getToken()}`
        }
      });

      if(data.status){
        toast.success(data.message, {autoClose: 4000, pauseOnHover: false});
        
        dispatch(removeEledger({ id: deleteInfo.id}));
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


  return (
    <>

      {/* Delete E-Ledger Modal */}
      <ConfirmationModal
        show={deleteInfo.show}
        message={t("description.dashboard.did_you_want_to_delete_this_eledger?")}
        loading={deleteInfo.loading}
        handleProceed={handleDeleteELedger}
        handleCancel={() => setDeleteInfo({...deleteInfo, show: false, id: ""})}
      />

      {/* View E-Ledger */}
      <ViewEledger
        showView={viewInfo.show}
        eLedger={viewInfo.eLedger}
        handleClose={() => setViewInfo({...viewInfo, show: false, eLedger: {}})}
      />

      {/* Edit E-Ledger */}
      {
        editInfo.show ? (
          <EditEledger
            showEdit={editInfo.show}
            eLedger={editInfo.eLedger}
            handleClose={() => setEditInfo({...editInfo, show: false, eLedger: {}})}
          />
        ) : null
      }



      <h1 className="text-sm mb-2 font-bold">{t("description.dashboard.E_LEDGERS")}</h1>

      {loading ? <div className="w-[50px] h-[50px] rounded-full border-[6px] border-primary border-b-transparent animate-spin mt-6 mx-auto"></div> : null}
      {!loading && message ? (<p className="text-[#F16021] bg-[#f15f213c] text-center mx-auto mt-12 p-2 rounded">{message}</p>) : null}
      {!loading && !message ? (
        eLedgers.length ? (
            <>
              <div className="flex justify-start items-center gap-2 text-xs mb-5">
                <span className="inline-block mr-4">{t("description.dashboard.save_file_as")}</span>

                <span title="Excel">
                  <MicrosoftExcelLogo size={20} color="green" weight="regular" className="cursor-pointer" />
                </span>

                <span title="PDF">
                  <FilePdf size={20} color="red" weight="regular" className="cursor-pointer" />
                </span>
              </div>

              <div className="w-full overflow-x-scroll mb-4">
                <table className="w-full table-auto text-center whitespace-nowrap text-xs mb-3">
                  <thead className="whitespace-nowrap">
                    <tr className="bg-[#F3FAFF]">
                      <th className="p-3 text-start border border-primary">{t("description.dashboard.account_name")}</th>
                      <th className="p-3 text-start border border-primary">{t("description.dashboard.transaction_type")}</th>
                      <th className="p-3 text-start border border-primary">{t("description.dashboard.amount")}</th>
                      <th className="p-3 text-start border border-primary">{t("description.dashboard.currency")}</th>
                      <th className="p-3 text-start border border-primary">{t("description.dashboard.transaction_date")}</th>
                      <th className="p-3 text-start border border-primary">{t("description.dashboard.reference_number")}</th>
                      <th className="p-3 text-start border border-primary">{t("description.dashboard.category")}</th>
                      <th className="p-3 text-start border border-primary">{t("description.dashboard.tax_info")}</th>
                      <th className="p-3 text-start border border-primary">{t("description.dashboard.description")}</th>
                      <th className="p-3 text-start border border-primary">{t("description.dashboard.tax_amount")}</th>
                      <th className="p-3 text-start border border-primary">{t("description.dashboard.payment_method")}</th>
                      <th className="p-3 text-start border border-primary">{t("description.dashboard.action")}</th>
                    </tr>
                  </thead>

                  <tbody>
                      {
                        eLedgers.map((eLedger, index) => (
                          <tr key={index + 1} className='border'>
                            <td className='p-3 border'>{eLedger.account_name}</td>
                            <td className='p-3 border'>
                                {eLedgerTransactionTypesLoader ? <span className="inline-block w-[18px] min-w-[18px] h-[18px] rounded-full border-2 border-b-transparent border-primary animate-spin"></span> : null}
                                {!eLedgerTransactionTypesLoader && eLedgerTransactionTypesMessage ? (<p className="inline-block text-[#F16021] bg-[#f15f213c] text-center mx-auto mt-12 p-2 rounded">{eLedgerTransactionTypesMessage}</p>) : null}
                                {!eLedgerTransactionTypesLoader && !eLedgerTransactionTypesMessage ? (
                                  getTransactionTypeValue(eLedgerTransactionTypes, eLedger?.transaction_type_id)
                                ) : null}
                            </td>
                            <td className='p-3 border'>{eLedger.amount}</td>
                            <td className='p-3 border'>
                              {}
                                {currencyLoader ? <span className="inline-block w-[18px] min-w-[18px] h-[18px] rounded-full border-2 border-b-transparent border-primary animate-spin"></span> : null}
                                {!currencyLoader && currencyMessage ? (<p className="inline-block text-[#F16021] bg-[#f15f213c] text-center mx-auto mt-12 p-2 rounded">{currencyMessage}</p>) : null}
                                {!currencyLoader && !currencyMessage ? (
                                  getCurrencyUnitValue(currencies, eLedger?.currency_id)
                                ) : null }
                            </td>
                            <td className='p-3 border'>{eLedger.transaction_date}</td>
                            <td className='p-3 border'>{eLedger.reference_number}</td>
                            <td className='p-3 border'>
                                {eLedgerCategoriesLoader ? <span className="inline-block w-[18px] min-w-[18px] h-[18px] rounded-full border-2 border-b-transparent border-primary animate-spin"></span> : null}
                                {!eLedgerCategoriesLoader && eLedgerCategoriesMessage ? (<p className="inline-block text-[#F16021] bg-[#f15f213c] text-center mx-auto mt-12 p-2 rounded">{eLedgerCategoriesMessage}</p>) : null}
                                {!eLedgerCategoriesLoader && !eLedgerCategoriesMessage ? (
                                  getCategoryValue(eLedgerCategories, eLedger?.category_id)
                                ) : null }
                            </td>
                            <td className='p-3 border'>
                                {eLedgerTaxInfosLoader ? <span className="inline-block w-[18px] min-w-[18px] h-[18px] rounded-full border-2 border-b-transparent border-primary animate-spin"></span> : null}
                                {!eLedgerTaxInfosLoader && eLedgerTaxInfosMessage ? (<p className="inline-block text-[#F16021] bg-[#f15f213c] text-center mx-auto mt-12 p-2 rounded">{eLedgerTaxInfosMessage}</p>) : null}
                                {!eLedgerTaxInfosLoader && !eLedgerTaxInfosMessage ? (
                                  getTaxInfoValue(eLedgerTaxInfos, eLedger.tax_info_id)
                                ) : null }
                            </td>
                            <td className='p-3 border'>{eLedger.description}</td>
                            <td className='p-3 border'>{eLedger.tax_amount}</td>
                            <td className='p-3 border'>
                                {paymentMethodsLoader ? <span className="inline-block w-[18px] min-w-[18px] h-[18px] rounded-full border-2 border-b-transparent border-primary animate-spin"></span> : null}
                                {!paymentMethodsLoader && paymentMethodsMessage ? (<p className="inline-block text-[#F16021] bg-[#f15f213c] text-center mx-auto mt-12 p-2 rounded">{paymentMethodsMessage}</p>) : null}
                                {!paymentMethodsLoader && !paymentMethodsMessage ? (
                                  getPaymentMethodValue(paymentMethods, eLedger?.payment_method_id)
                                ) : null }
                            </td>
                            <td className='p-3 border'>
                              <div className="flex justify-center items-center gap-2">
                                <PencilSimple size={16} color="#62c69b" onClick={() => handleEdit(eLedger)} className="cursor-pointer" /> 
                                <Eye size={16} color="red" onClick={() => handleView(eLedger)} className="cursor-pointer" />
                                <Trash size={16} color="red" onClick={() => handleDeleteELedgerInfo(eLedger.id)} className="cursor-pointer" />
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

export default ELedgers;