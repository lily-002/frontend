/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Eye, X } from "@phosphor-icons/react";
import { ELedgerProps } from "../../../types/types";
import { useTranslation } from "react-i18next";
import useRoles from "../../../authentication/useRoles";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/hooks";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { getCurrencies } from "../../../store/features/Currencies";
import { getPaymentMethods } from "../../../store/features/PaymentMethod";
import { getELedgerCategories } from "../../../store/features/ELedgerCategories";
import { getELedgerStatuses } from "../../../store/features/ELedgerStatus";
import { getELedgerTaxInfos } from "../../../store/features/ELedgerTaxInfo";
import { getELedgerTransactionTypes } from "../../../store/features/ELedgerTransactionTypes";
import { getCompanies } from "../../../store/features/Companies";
import { useNavigate } from "react-router";
import SelectOptions from "../components/SelectOptions";
import { axiosInstance } from "../../../api/api";
import { getToken } from "../../../services/auth";
import { toast } from "react-toastify";
import { getELedgers } from "../../../store/features/ELedgers";
import { getCategoryValue, getCompanyValue, getCurrencyUnitValue, getPaymentMethodValue, getStatusValue, getTaxInfoValue, getTransactionTypeValue } from "../../../utils/utils";



interface EditEledgerProps {
    eLedger: any;
    showEdit: boolean;
    handleClose: () => void;
}

const EditEledger = ({ showEdit, eLedger, handleClose }: EditEledgerProps) => {
    const {currencies, loading: currencyLoader, message: currencyMessage} = useAppSelector(state => state.currencies);
    
    const {paymentMethods, loading: paymentMethodsLoader, message: paymentMethodsMessage} = useAppSelector(state => state.paymentMethods);
    const {eLedgerCategories, loading: eLedgerCategoriesLoader, message: eLedgerCategoriesMessage} = useAppSelector(state => state.eLedgerCategories);
    const {eLedgerStatuses, loading: eLedgerStatusesLoader, message: eLedgerStatusesMessage} = useAppSelector(state => state.eLedgerStatuses);
    const {eLedgerTaxInfos, loading: eLedgerTaxInfosLoader, message: eLedgerTaxInfosMessage} = useAppSelector(state => state.eLedgerTaxInfos);
    const {eLedgerTransactionTypes, loading: eLedgerTransactionTypesLoader, message: eLedgerTransactionTypesMessage} = useAppSelector(state => state.eLedgerTransactionTypes);
    const {companies, loading: companyLoader, message: companyMessage} = useAppSelector(state => state.companies);

    const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<ELedgerProps>({
        defaultValues: {
            account_name: eLedger.account_name,
            amount: eLedger.amount,
            transaction_date: eLedger.transaction_date,
            reference_number: eLedger.reference_number,
            description: eLedger.description,
            tax_amount: eLedger.tax_amount,
            payer_name: eLedger.payer_name,
            payer_id_number: eLedger.payer_id_number,
        }
    });
    const roles = useRoles();
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const formValues = watch();
    const { t } = useTranslation();

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


    // // Get ID's value
    // const getTransactionTypeValue = (id: number | string) => {
    //     const transactionType = eLedgerTransactionTypes.find(tt => tt.id == id);
    //     return transactionType ? transactionType.name : "";
    // }

    // const getCurrencyUnitValue = (id: number | string) => {
    //     const currency = currencies.find(c => c.id == id);
    //     return currency ? currency.code : "";
    // }

    // const getCategoryValue = (id: number | string) => {
    //     const category = eLedgerCategories.find(ct => ct.id == id);
    //     return category ? category.name : "";
    // }

    // const getTaxInfoValue = (id: number | string) => {
    //     const taxInfo = eLedgerTaxInfos.find(tf => tf.id == id);
    //     return taxInfo ? taxInfo.name : "";
    // }

    // const getPaymentMethodValue = (id: number | string) => {
    //     const paymentMethod = paymentMethods.find(pm => pm.id == id);
    //     return paymentMethod ? paymentMethod.name : "";
    // }

    // const getStatusValue = (id: number | string) => {
    //     const statusInfo = eLedgerStatuses.find(st => st.id == id);
    //     return statusInfo ? statusInfo.name : "";
    // }

    // const getCompanyValue = (id: number | string) => {
    //     const company = companies.find(comp => comp.id == id);
    //     return company ? company.company_name : "";
    // }


    useEffect(() => {

        if(eLedgerTransactionTypes.length){ setValue("transaction_type_id", getTransactionTypeValue(eLedgerTransactionTypes, eLedger.transaction_type_id)); }
        if(currencies.length){ setValue("currency_id", getCurrencyUnitValue(currencies, eLedger.currency_id)); }
        if(eLedgerCategories.length){ setValue("category_id", getCategoryValue(eLedgerCategories, eLedger.category_id)); }
        if(eLedgerTaxInfos.length){ setValue("tax_info_id", getTaxInfoValue(eLedgerTaxInfos, eLedger.tax_info_id)); }
        if(paymentMethods.length){ setValue("payment_method_id", getPaymentMethodValue(paymentMethods, eLedger.payment_method_id)); }
        if(eLedgerStatuses.length){ setValue("status_id", getStatusValue(eLedgerStatuses, eLedger.status_id)); }
        if(companies.length){ setValue("company_id", getCompanyValue(companies, eLedger.company_id)); }

    }, [
        eLedgerTransactionTypes.length, currencies.length, eLedgerCategories.length, eLedgerTaxInfos.length,
        paymentMethods.length, eLedgerStatuses.length, companies.length
    ]);


    const handleModalClose = (ev: any) => {
        const target = ev.target as HTMLDivElement;
        if (target.tagName === "DIV" && target.className.includes("parent")) {
            handleClose();
        }
    };

    const handleFormSubmit: SubmitHandler<ELedgerProps> = async (formData) => {
        
        if(loading){ return; }

        const formDataPayload = {
            ...formData
        }

        const transactionType = eLedgerTransactionTypes.find(tt => tt.name === formData.transaction_type_id);
        formDataPayload.transaction_type_id = transactionType?.id as number | string;
        const currency = currencies.find(c => c.code === formData.currency_id);
        formDataPayload.currency_id = currency?.id as number | string;
        const category = eLedgerCategories.find(cg => cg.name === formData.category_id);
        formDataPayload.category_id = category?.id as number | string;
        const taxInfo = eLedgerTaxInfos.find(tf => tf.name === formData.tax_info_id);
        formDataPayload.tax_info_id = taxInfo?.id as number | string;
        const paymentMethod = paymentMethods.find(payment => payment.name === formData.payment_method_id);
        formDataPayload.payment_method_id = paymentMethod?.id as number | string;
        const status = eLedgerStatuses.find(st => st.name === formData.status_id);
        formDataPayload.status_id = status?.id as number | string;
        const company = companies.find(cp => cp.company_name === formData.company_id);
        formDataPayload.company_id = company?.id as number | string;

        setLoading(true);
        try {
          
          const { data } = await axiosInstance.put(`/user/eledger/${eLedger.id}`, formDataPayload, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken()}`
            }
          });
    
          if(data.status){
            toast.success(data.message, {autoClose: 4000, pauseOnHover: false});
            return setTimeout(() => {
              setLoading(false);
              dispatch(getELedgers());
              handleClose();
              return navigate("/dashboard/e-ledgers");
            }, 2000);
          }
          
          setLoading(false);
          return toast.error(data.message, {autoClose: 4000, pauseOnHover: false});
          
        } catch (error: any) {
          setLoading(false);
          return toast.error(error.response ? error.response.data?.error || error.response?.data?.message : t("description.errors.something_went_wrong_try_again_later"));
        }
    }


    return (
        <>
            <div
                onClick={handleModalClose}
                className={`parent w-full h-screen  md:bg-[#00000080] transition-all ${showEdit ? "fixed" : "hidden"}  top-0 left-0 z-50`}
            >
                <div className="w-full md:w-[30%] h-screen overflow-y-scroll transition-all bg-white text-[#333333] text-xs absolute top-0 right-0 p-4">
                    <div className="flex justify-between staty top-0 left-0 items-center pb-2 border-b mb-4">
                        <span className="flex items-center gap-2">
                            <Eye color="red" size={20} />
                            <h1 className="text-md font-semibold text-sm">{t("description.dashboard.eledger_information")}</h1>
                        </span>

                        <X size={20} onClick={handleClose} className="cursor-pointer" />
                    </div>

                    {/*  */}
                    <h1 className="text-sm font-bold uppercase mb-4">{t("description.dashboard.edit_e_ledger")}</h1>

                    <form onSubmit={handleSubmit(handleFormSubmit)}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 text-xs mb-4">
                            <div>
                                <label className="block font-semibold mb-1" htmlFor="account_name">{t("description.dashboard.account_name")}</label>
                                <input type="text" id="account_name" 
                                    className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                                    placeholder="John Doe"
                                    defaultValue={formValues.account_name}
                                    {...register("account_name", {required: true})}
                                    required
                                />
                                {errors.account_name ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                            </div>

                            <div>
                                {eLedgerTransactionTypesLoader ? <span className="inline-block w-[18px] min-w-[18px] h-[18px] rounded-full border-2 border-b-transparent border-primary animate-spin"></span> : null}
                                {!eLedgerTransactionTypesLoader && eLedgerTransactionTypesMessage ? (<p className="text-[#F16021] bg-[#f15f213c] text-center mx-auto mt-12 p-2 rounded">{eLedgerTransactionTypesMessage}</p>) : null}
                                {!eLedgerTransactionTypesLoader && !eLedgerTransactionTypesMessage ? (
                                    <div>
                                        <label className="block font-semibold mb-1" htmlFor="transaction_type_id">{t("description.dashboard.transaction_type")}</label>
                                        <input type="text" readOnly className="-z-10 absolute top-0 left-0" {...register("transaction_type_id", {required: true})} />
                                        <SelectOptions
                                            title="Select transaction type"
                                            selectedOption={formValues.transaction_type_id as string}
                                            setSelectedOption={(userSelection) => setValue("transaction_type_id", userSelection)}
                                            options={eLedgerTransactionTypes.map(tt => tt.name)}
                                            className="border border-[#D9D9D9] rounded outline-primary transition-all p-2"
                                            top="top-8"
                                        />
                                        {!formValues.transaction_type_id && errors.transaction_type_id ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                                    </div>
                                ) : null }
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 text-xs mb-4">
                            <div>
                                <label className="block font-semibold mb-1" htmlFor="amount">{t("description.dashboard.amount")}</label>
                                <input type="number" id="amount" 
                                    className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                                    placeholder="00.00"
                                    {...register("amount", {required: true})}
                                    required
                                />
                                {errors.amount ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                            </div>

                            <div>
                                {currencyLoader ? <span className="inline-block w-[18px] min-w-[18px] h-[18px] rounded-full border-2 border-b-transparent border-primary animate-spin"></span> : null}
                                {!currencyLoader && currencyMessage ? (<p className="text-[#F16021] bg-[#f15f213c] text-center mx-auto mt-12 p-2 rounded">{currencyMessage}</p>) : null}
                                {!currencyLoader && !currencyMessage ? (
                                <div>
                                    <label className="block font-semibold mb-1" htmlFor="currency_id">{t("description.dashboard.currency")}</label>
                                    <input type="text" readOnly className="-z-10 absolute top-0 left-0" {...register("currency_id", {required: true})} />
                                    <SelectOptions
                                        title="Currency unit"
                                        selectedOption={formValues.currency_id as string}
                                        setSelectedOption={(userSelection) => setValue("currency_id", userSelection)}
                                        options={currencies.map(currency => currency.code)}
                                        className="border border-[#D9D9D9] rounded outline-primary transition-all py-2 px-4 whitespace-nowrap"
                                        top="top-8"
                                    />
                                    {!formValues.currency_id && errors.currency_id ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                                </div>
                                ) : null}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 text-xs mb-4">
                            <div>
                                <label className="block font-semibold mb-1" htmlFor="transaction_date">{t("description.dashboard.transaction_date")}</label>
                                <input type="date" id="transaction_date" 
                                    className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                                    {...register("transaction_date", {required: true})}
                                    required
                                />
                                {errors.transaction_date ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                            </div>

                            <div>
                                <label className="block font-semibold mb-1" htmlFor="reference_number">{t("description.dashboard.reference_number")}</label>
                                <input type="number" id="reference_number" 
                                    className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                                    placeholder="Enter reference number"
                                    {...register("reference_number", {required: true})}
                                    required
                                />
                                {errors.reference_number ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 text-xs mb-4">
                            <div>
                                {eLedgerCategoriesLoader ? <span className="inline-block w-[18px] min-w-[18px] h-[18px] rounded-full border-2 border-b-transparent border-primary animate-spin"></span> : null}
                                {!eLedgerCategoriesLoader && eLedgerCategoriesMessage ? (<p className="text-[#F16021] bg-[#f15f213c] text-center mx-auto mt-12 p-2 rounded">{eLedgerCategoriesMessage}</p>) : null}
                                {!eLedgerCategoriesLoader && !eLedgerCategoriesMessage ? (
                                <div>
                                    <label className="block font-semibold mb-1" htmlFor="category_id">{t("description.dashboard.category")}</label>
                                    <input type="text" readOnly className="-z-10 absolute top-0 left-0" {...register("category_id", {required: true})} />
                                    <SelectOptions
                                        title="Category ID"
                                        selectedOption={formValues.category_id as string}
                                        setSelectedOption={(userSelection) => setValue("category_id", userSelection)}
                                        options={eLedgerCategories.map(cg => cg.name)}
                                        className="border border-[#D9D9D9] rounded outline-primary transition-all py-2 px-4 whitespace-nowrap"
                                        top="top-8"
                                    />
                                    {!formValues.category_id && errors.category_id ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                                </div>
                                ) : null}
                            </div>

                            <div>
                                {eLedgerTaxInfosLoader ? <span className="inline-block w-[18px] min-w-[18px] h-[18px] rounded-full border-2 border-b-transparent border-primary animate-spin"></span> : null}
                                {!eLedgerTaxInfosLoader && eLedgerTaxInfosMessage ? (<p className="text-[#F16021] bg-[#f15f213c] text-center mx-auto mt-12 p-2 rounded">{eLedgerTaxInfosMessage}</p>) : null}
                                {!eLedgerTaxInfosLoader && !eLedgerTaxInfosMessage ? (
                                <div>
                                    <label className="block font-semibold mb-1" htmlFor="tax_info_id">{t("description.dashboard.tax_info")}</label>
                                    <input type="text" readOnly className="-z-10 absolute top-0 left-0" {...register("tax_info_id", {required: true})} />
                                    <SelectOptions
                                        title="Tax info"
                                        selectedOption={formValues.tax_info_id as string}
                                        setSelectedOption={(userSelection) => setValue("tax_info_id", userSelection)}
                                        options={eLedgerTaxInfos.map(tif => tif.name)}
                                        className="border border-[#D9D9D9] rounded outline-primary transition-all py-2 px-4 whitespace-nowrap"
                                        top="top-8"
                                    />
                                    {!formValues.tax_info_id && errors.tax_info_id ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                                </div>
                                ) : null}
                            </div>
                        </div>

                        <div className="text-xs mb-4">
                            <label className="block font-semibold mb-1" htmlFor="description">{t("description.dashboard.description")}</label>
                            <textarea 
                                className="w-full h-[100px] border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all resize-none"
                                placeholder="Enter your description"
                                {...register("description", {required: true})}
                                required
                            ></textarea>
                            {errors.description ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 text-xs mb-4">
                            <div>
                                <label className="block font-semibold mb-1" htmlFor="tax_amount">{t("description.dashboard.tax_amount")}</label>
                                <input type="number" id="tax_amount" 
                                    className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                                    placeholder="00.00"
                                    {...register("tax_amount", {required: true})}
                                    required
                                />
                                {errors.tax_amount ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                            </div>

                            <div>
                                {paymentMethodsLoader ? <span className="inline-block w-[18px] min-w-[18px] h-[18px] rounded-full border-2 border-b-transparent border-primary animate-spin"></span> : null}
                                {!paymentMethodsLoader && paymentMethodsMessage ? (<p className="text-[#F16021] bg-[#f15f213c] text-center mx-auto mt-12 p-2 rounded">{paymentMethodsMessage}</p>) : null}
                                {!paymentMethodsLoader && !paymentMethodsMessage ? (
                                    <div>
                                        <label className="block font-semibold mb-1" htmlFor="payment_method_id">{t("description.dashboard.payment_method")}</label>
                                        <input type="text" readOnly className="-z-10 absolute top-0 left-0" {...register("payment_method_id", {required: true})} />
                                        <SelectOptions
                                            title="Select payment method"
                                            selectedOption={formValues.payment_method_id as string}
                                            setSelectedOption={(userSelection) => setValue("payment_method_id", userSelection)}
                                            options={paymentMethods.map(py => py.name)}
                                            className="border border-[#D9D9D9] rounded outline-primary transition-all p-2"
                                            top="top-8"
                                        />
                                        {!formValues.payment_method_id && errors.payment_method_id ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                                    </div>
                                ) : null }
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 text-xs mb-4">
                            <div>
                                <label className="block font-semibold mb-1" htmlFor="payer_name">{t("description.dashboard.payer_name")}</label>
                                <input type="text" id="payer_name"
                                    className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                                    placeholder="Peter Paul"
                                    {...register("payer_name", {required: true})}
                                    required
                                />
                                {errors.payer_name ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                            </div>

                            <div>
                                <label className="block font-semibold mb-1" htmlFor="payer_id_number">{t("description.dashboard.payer_id_number")}</label>
                                <input type="text" id="payer_id_number" 
                                    className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                                    placeholder="123e-s456-ewe23"
                                    {...register("payer_id_number", {required: true})}
                                    required
                                />
                                {errors.payer_id_number ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 text-xs mb-4">
                            <div>
                                {eLedgerStatusesLoader ? <span className="inline-block w-[18px] min-w-[18px] h-[18px] rounded-full border-2 border-b-transparent border-primary animate-spin"></span> : null}
                                {!eLedgerStatusesLoader && eLedgerStatusesMessage ? (<p className="text-[#F16021] bg-[#f15f213c] text-center mx-auto mt-12 p-2 rounded">{eLedgerStatusesMessage}</p>) : null}
                                {!eLedgerStatusesLoader && !eLedgerStatusesMessage ? (
                                    <div>
                                        <label className="block font-semibold mb-1" htmlFor="status_id">{t("description.dashboard.status_id")}</label>
                                        <input type="text" readOnly className="-z-10 absolute top-0 left-0" {...register("status_id", {required: true})} />
                                        <SelectOptions
                                            title="Status"
                                            selectedOption={formValues.status_id as string}
                                            setSelectedOption={(userSelection) => setValue("status_id", userSelection)}
                                            options={eLedgerStatuses.map(el => el.name)}
                                            className="border border-[#D9D9D9] rounded outline-primary transition-all p-2"
                                            top="top-8"
                                        />
                                        {!formValues.status_id && errors.status_id ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                                    </div>
                                ) : null }
                            </div>
                            
                            {
                                roles && roles.includes("admin") ? (
                                    <div>
                                        {companyLoader ? <span className="inline-block w-[18px] min-w-[18px] h-[18px] rounded-full border-2 border-b-transparent border-primary animate-spin"></span> : null}
                                        {!companyLoader && companyMessage ? (<p className="text-[#F16021] bg-[#f15f213c] text-center mx-auto mt-12 p-2 rounded">{companyMessage}</p>) : null}
                                        {!companyLoader && !companyMessage ? (
                                            <div>
                                                <label className="block font-semibold mb-1" htmlFor="company_id">{t("description.dashboard.company_name")}</label>
                                                <input type="text" readOnly className="-z-10 absolute top-0 left-0" {...register("company_id", {required: true})} />
                                                <SelectOptions
                                                    title="Company"
                                                    selectedOption={formValues.company_id as string}
                                                    setSelectedOption={(userSelection) => setValue("company_id", userSelection)}
                                                    options={companies.map(company => company.company_name)}
                                                    className="border border-[#D9D9D9] rounded outline-primary transition-all p-2"
                                                    top="top-8"
                                                />
                                                {!formValues.company_id && errors.company_id ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                                            </div>
                                        ) : null }
                                    </div>
                                ) : null
                            }
                        </div>

                        <div className="flex justify-center items-center md:justify-start text-xs gap-2">
                            <button className="rounded-md py-2 px-8 bg-primary text-white flex justify-center items-center gap-1">
                                {loading ? <span className="inline-block w-[14px] min-w-[14px] h-[14px] rounded-full border-2 border-b-transparent border-white animate-spin"></span> : null}
                                <span>{t("description.dashboard.update")}</span>
                            </button>

                            <span onClick={handleClose} className="inline-block rounded-md py-2 px-8 bg-secondary text-white cursor-pointer">
                                {t("description.dashboard.cancel")}
                            </span>
                        </div>

                    </form>

                </div>
            </div>
        </>
    );
};

export default EditEledger;
