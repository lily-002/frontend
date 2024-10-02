/* eslint-disable @typescript-eslint/no-explicit-any */
import { Eye, X } from "@phosphor-icons/react";
import { ELedgerProps } from "../../../types/types";
import { useTranslation } from "react-i18next";
import useRoles from "../../../authentication/useRoles";
import { useAppSelector } from "../../../store/hooks/hooks";
import { getCategoryValue, getCompanyValue, getCurrencyUnitValue, getPaymentMethodValue, getStatusValue, getTaxInfoValue, getTransactionTypeValue } from "../../../utils/utils";

interface ViewEledgerProps {
    eLedger: ELedgerProps;
    showView: boolean;
    handleClose: () => void;
}

const ViewEledger = ({ showView, eLedger, handleClose }: ViewEledgerProps) => {
    const {currencies, loading: currencyLoader, message: currencyMessage} = useAppSelector(state => state.currencies);
    const {paymentMethods, loading: paymentMethodsLoader, message: paymentMethodsMessage} = useAppSelector(state => state.paymentMethods);
    const {eLedgerCategories, loading: eLedgerCategoriesLoader, message: eLedgerCategoriesMessage} = useAppSelector(state => state.eLedgerCategories);
    const {eLedgerStatuses, loading: eLedgerStatusesLoader, message: eLedgerStatusesMessage} = useAppSelector(state => state.eLedgerStatuses);
    const {eLedgerTaxInfos, loading: eLedgerTaxInfosLoader, message: eLedgerTaxInfosMessage} = useAppSelector(state => state.eLedgerTaxInfos);
    const {eLedgerTransactionTypes, loading: eLedgerTransactionTypesLoader, message: eLedgerTransactionTypesMessage} = useAppSelector(state => state.eLedgerTransactionTypes);
    const {companies, loading: companyLoader, message: companyMessage} = useAppSelector(state => state.companies);
    const { t } = useTranslation();
    const roles = useRoles();

    const handleModalClose = (ev: any) => {
        const target = ev.target as HTMLDivElement;
        if (target.tagName === "DIV" && target.className.includes("parent")) {
            handleClose();
        }
    };


    return (
        <>
            <div
                onClick={handleModalClose}
                className={`parent w-full h-screen  md:bg-[#00000080] transition-all ${showView ? "fixed" : "hidden"}  top-0 left-0 z-50`}
            >
                <div className="w-full md:w-[30%] h-screen overflow-y-scroll transition-all bg-white text-[#333333] text-xs absolute top-0 right-0 p-4">
                    <div className="flex justify-between staty top-0 left-0 items-center pb-2 border-b mb-4">
                        <span className="flex items-center gap-2">
                            <Eye color="red" size={20} />
                            <h1 className="text-md font-semibold text-sm">{t("description.dashboard.eledger_information")}</h1>
                        </span>

                        <X size={20} onClick={handleClose} className="cursor-pointer" />
                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 text-xs mb-4">
                        <div>
                            <label className="block font-semibold mb-1" htmlFor="account_name">{t("description.dashboard.account_name")}</label>
                            <input type="text" id="account_name" 
                                className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                                defaultValue={eLedger?.account_name}
                                readOnly
                            />
                        </div>

                        <div>

                            {eLedgerTransactionTypesLoader ? <span className="inline-block w-[18px] min-w-[18px] h-[18px] rounded-full border-2 border-b-transparent border-primary animate-spin"></span> : null}
                            {!eLedgerTransactionTypesLoader && eLedgerTransactionTypesMessage ? (<p className="text-[#F16021] bg-[#f15f213c] text-center mx-auto mt-12 p-2 rounded">{eLedgerTransactionTypesMessage}</p>) : null}
                            {!eLedgerTransactionTypesLoader && !eLedgerTransactionTypesMessage ? (
                                <>
                                    <label className="block font-semibold mb-1" htmlFor="transaction_type_id">{t("description.dashboard.transaction_type")}</label>
                                    <input type="text" id="transaction_type_id" 
                                        className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                                        defaultValue={getTransactionTypeValue(eLedgerTransactionTypes, eLedger?.transaction_type_id)}
                                        readOnly
                                    />
                                </>
                            ) : null }
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 text-xs mb-4">
                        <div>
                            <label className="block font-semibold mb-1" htmlFor="amount">{t("description.dashboard.amount")}</label>
                            <input type="text" id="amount" 
                                className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                                defaultValue={eLedger?.amount}
                                readOnly
                            />
                        </div>

                        <div>
                            {currencyLoader ? <span className="inline-block w-[18px] min-w-[18px] h-[18px] rounded-full border-2 border-b-transparent border-primary animate-spin"></span> : null}
                            {!currencyLoader && currencyMessage ? (<p className="text-[#F16021] bg-[#f15f213c] text-center mx-auto mt-12 p-2 rounded">{currencyMessage}</p>) : null}
                            {!currencyLoader && !currencyMessage ? (
                                <>
                                    <label className="block font-semibold mb-1" htmlFor="currency_id">{t("description.dashboard.currency")}</label>
                                    <input type="text" id="currency_id" 
                                        className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                                        defaultValue={getCurrencyUnitValue(currencies, eLedger?.currency_id)}
                                        readOnly
                                    />
                                </>
                            ) : null }
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 text-xs mb-4">
                        <div>
                            <label className="block font-semibold mb-1" htmlFor="transaction_date">{t("description.dashboard.transaction_date")}</label>
                            <input type="date" id="transaction_date" 
                                className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                                defaultValue={eLedger?.transaction_date}
                                readOnly
                            />
                        </div>

                        <div>
                            <label className="block font-semibold mb-1" htmlFor="reference_number">{t("description.dashboard.reference_number")}</label>
                            <input type="text" id="reference_number" 
                                className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                                defaultValue={eLedger?.reference_number}
                                readOnly
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 text-xs mb-4">
                        <div>
                            {eLedgerCategoriesLoader ? <span className="inline-block w-[18px] min-w-[18px] h-[18px] rounded-full border-2 border-b-transparent border-primary animate-spin"></span> : null}
                            {!eLedgerCategoriesLoader && eLedgerCategoriesMessage ? (<p className="text-[#F16021] bg-[#f15f213c] text-center mx-auto mt-12 p-2 rounded">{eLedgerCategoriesMessage}</p>) : null}
                            {!eLedgerCategoriesLoader && !eLedgerCategoriesMessage ? (
                                <>
                                    <label className="block font-semibold mb-1" htmlFor="category_id">{t("description.dashboard.category")}</label>
                                    <input type="text" id="category_id" 
                                        className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                                        defaultValue={getCategoryValue(eLedgerCategories, eLedger?.category_id)}
                                        readOnly
                                    />
                                </>
                            ) : null }
                        </div>

                        <div>
                            {eLedgerTaxInfosLoader ? <span className="inline-block w-[18px] min-w-[18px] h-[18px] rounded-full border-2 border-b-transparent border-primary animate-spin"></span> : null}
                            {!eLedgerTaxInfosLoader && eLedgerTaxInfosMessage ? (<p className="text-[#F16021] bg-[#f15f213c] text-center mx-auto mt-12 p-2 rounded">{eLedgerTaxInfosMessage}</p>) : null}
                            {!eLedgerTaxInfosLoader && !eLedgerTaxInfosMessage ? (
                                <>
                                    <label className="block font-semibold mb-1" htmlFor="tax_info_id">{t("description.dashboard.tax_info")}</label>
                                    <input type="text" id="tax_info_id" 
                                        className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                                        defaultValue={getTaxInfoValue(eLedgerTaxInfos, eLedger?.tax_info_id)}
                                        readOnly
                                    />
                                </>
                            ) : null }
                        </div>
                    </div>

                    <div className="text-xs mb-4">
                        <label className="block font-semibold mb-1" htmlFor="description">{t("description.dashboard.description")}</label>
                        <textarea 
                            className="w-full h-[100px] border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all resize-none"
                            defaultValue={eLedger?.description}
                            readOnly
                        ></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 text-xs mb-4">
                        <div>
                            <label className="block font-semibold mb-1" htmlFor="tax_amount">{t("description.dashboard.tax_amount")}</label>
                            <input type="text" id="tax_amount" 
                                className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                                defaultValue={eLedger?.tax_amount}
                                readOnly
                            />
                        </div>

                        <div>
                            {paymentMethodsLoader ? <span className="inline-block w-[18px] min-w-[18px] h-[18px] rounded-full border-2 border-b-transparent border-primary animate-spin"></span> : null}
                            {!paymentMethodsLoader && paymentMethodsMessage ? (<p className="text-[#F16021] bg-[#f15f213c] text-center mx-auto mt-12 p-2 rounded">{paymentMethodsMessage}</p>) : null}
                            {!paymentMethodsLoader && !paymentMethodsMessage ? (
                                <>
                                    <label className="block font-semibold mb-1" htmlFor="payment_method_id">{t("description.dashboard.payment_method")}</label>
                                    <input type="text" id="payment_method_id" 
                                        className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                                        defaultValue={getPaymentMethodValue(paymentMethods, eLedger?.payment_method_id)}
                                        readOnly
                                    />
                                </>
                            ) : null }
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 text-xs mb-4">
                        <div>
                            <label className="block font-semibold mb-1" htmlFor="payer_name">{t("description.dashboard.payer_name")}</label>
                            <input type="text" id="payer_name"
                                className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                                defaultValue={eLedger?.payer_name}
                                readOnly
                            />
                        </div>

                        <div>
                            <label className="block font-semibold mb-1" htmlFor="payer_id_number">{t("description.dashboard.payer_id_number")}</label>
                            <input type="text" id="payer_id_number" 
                                className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                                defaultValue={eLedger?.payer_id_number}
                                readOnly
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 text-xs mb-8">
                        <div>
                            {eLedgerStatusesLoader ? <span className="inline-block w-[18px] min-w-[18px] h-[18px] rounded-full border-2 border-b-transparent border-primary animate-spin"></span> : null}
                            {!eLedgerStatusesLoader && eLedgerStatusesMessage ? (<p className="text-[#F16021] bg-[#f15f213c] text-center mx-auto mt-12 p-2 rounded">{eLedgerStatusesMessage}</p>) : null}
                            {!eLedgerStatusesLoader && !eLedgerStatusesMessage ? (
                                <>
                                    <label className="block font-semibold mb-1" htmlFor="status_id">{t("description.dashboard.status_id")}</label>
                                    <input type="text" id="status_id" 
                                        className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                                        defaultValue={getStatusValue(eLedgerStatuses, eLedger?.status_id)}
                                        readOnly
                                    />
                                </>
                            ) : null }
                        </div>
                        
                        {
                            roles && roles.includes("admin") ? (
                                <div>
                                        {companyLoader ? <span className="inline-block w-[18px] min-w-[18px] h-[18px] rounded-full border-2 border-b-transparent border-primary animate-spin"></span> : null}
                                        {!companyLoader && companyMessage ? (<p className="text-[#F16021] bg-[#f15f213c] text-center mx-auto mt-12 p-2 rounded">{companyMessage}</p>) : null}
                                        {!companyLoader && !companyMessage ? (
                                            <>
                                                <label className="block font-semibold mb-1" htmlFor="company_id">{t("description.dashboard.company_name")}</label>
                                                <input type="text" id="company_id" 
                                                    className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                                                    defaultValue={getCompanyValue(companies, eLedger?.company_id)}
                                                    readOnly
                                                />
                                            </>
                                        ) : null }
                                </div>
                            ) : null
                        }
                    </div>

                    {/* Close */}
                    <span onClick={handleClose} className="inline-block bg-secondary text-white font-semibold rounded py-2 px-4 cursor-pointer">
                        {t("description.dashboard.cancel")}
                    </span>
                </div>
            </div>
        </>
    );
};

export default ViewEledger;
