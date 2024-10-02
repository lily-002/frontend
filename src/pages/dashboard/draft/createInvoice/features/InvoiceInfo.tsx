/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import SelectOptions from "../../../components/SelectOptions";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks/hooks";
import { getCurrencies } from "../../../../../store/features/Currencies";
import { getInvoiceTypes } from "../../../../../store/features/InvoiceType";
import { getInvoiceScenarios } from "../../../../../store/features/InvoiceScenarios";
import { useTranslation } from "react-i18next";
import useRoles from "../../../../../authentication/useRoles";

interface InvoiceInfoProps {
    register: any;
    errors: any;
    formValues: any;
    setValue: any;
}

const InvoiceInfo = ({register, errors, formValues, setValue}: InvoiceInfoProps) => {
    const {currencies, loading: currencyLoader, message: currencyMessage} = useAppSelector(state => state.currencies);
    const {invoiceTypes, loading: invoiceTypeLoader, message: invoiceTypeMessage} = useAppSelector(state => state.invoiceTypes);
    const {invoiceScenarios, loading: invoiceScenarioLoader, message: invoiceScenarioMessage} = useAppSelector(state => state.invoiceScenarios);
    const {companies, loading: companyLoader, message: companyMessage} = useAppSelector(state => state.companies);
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const roles = useRoles();


    useEffect(() => {

        if(!invoiceTypes.length){ dispatch(getInvoiceTypes())}
        if(!invoiceScenarios.length){ dispatch(getInvoiceScenarios())}
        if(!currencies.length){ dispatch(getCurrencies())}
    
      }, [dispatch, invoiceTypes.length, invoiceScenarios.length, currencies.length]);
    
 
    return (
        <div>        
            <div className="flex gap-1 mb-2 flex-wrap">
                <div className="w-1/3 font-bold">{t("description.dashboard.invoice_UUID")}</div>
                <span>{formValues.invoice_uuid}</span>
            </div>

            <div className="flex flex-wrap items-center mb-2 gap-1">
                <div className="w-1/3 font-bold">{t("description.dashboard.invoice_date")}<span className="text-red-500">*</span></div>
                <div>
                    <input type="date" id="invoice_date"
                        className="border-2 p-1 outline-none"
                        {...register("invoice_date", {required: true})}
                        required
                    />
                    <input type="time" id="invoice_time"
                        className="border-2 p-1 outline-none"
                        {...register("invoice_time", {required: true})}
                        required
                    />
                    {(errors.invoice_date || errors.invoice_time) ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                </div>
            </div>

            <div className="flex flex-wrap items-center mb-2 gap-1">
                <div className="w-1/3 font-bold">{t("description.dashboard.invoice_ID")}</div>
                <div className="w-1/4">
                    <p className="w-full border border-[#D9D9D9] outline-primary transition-all py-1 px-2">{formValues.invoice_id}</p>
                </div>
            </div>

            {
                roles && roles.includes("admin") ? (
                    <div className="flex flex-wrap items-center mb-2 gap-1">
                        <div className="w-1/3 font-bold">
                            <label className="block mb-1" htmlFor="company_id">{t("description.dashboard.company_name")} <span className="text-red-500">*</span></label>
                        </div>
                        <div>
                            {companyLoader ? <span className="inline-block w-[18px] min-w-[18px] h-[18px] rounded-full border-2 border-b-transparent border-primary animate-spin"></span> : null}
                            {!companyLoader && companyMessage ? (<p className="text-[#F16021] bg-[#f15f213c] text-center mx-auto mt-12 p-2 rounded">{companyMessage}</p>) : null}
                            {!companyLoader && !companyMessage ? (
                            <div>
                                <input type="text" readOnly className="-z-10 absolute top-0 left-0 opacity-0" {...register("company_id", {required: true})} />
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

                            ) : null}
                        </div>
                    </div>
                ) : null
            }

            <div className="flex flex-wrap items-center mb-2 gap-1">
                <div className="w-1/3 font-bold">
                    {t("description.dashboard.invoice_type")}
                    <span className="text-red-500">*</span>
                </div>
                <div>
                    {invoiceTypeLoader ? <span className="inline-block w-[18px] min-w-[18px] h-[18px] rounded-full border-2 border-b-transparent border-primary animate-spin"></span> : null}
                    {!invoiceTypeLoader && invoiceTypeMessage ? (<p className="text-[#F16021] bg-[#f15f213c] text-center mx-auto mt-12 p-2 rounded">{invoiceTypeMessage}</p>) : null}
                    {!invoiceTypeLoader && !invoiceTypeMessage ? (
                        <div>
                            <input type="text" readOnly className="-z-10 absolute top-0 left-0 opacity-0" {...register("invoice_type", {required: true})} />
                            <SelectOptions
                                title="Select invoice type"
                                selectedOption={formValues.invoice_type}
                                setSelectedOption={(userSelection) => setValue("invoice_type", userSelection)}
                                options={invoiceTypes.map(invT => invT.name)}
                                className="w-full border border-[#D9D9D9] outline-primary transition-all py-1 px-2"
                                top="top-8"
                            />
                            {!formValues.invoice_type && errors.invoice_type ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                        </div>
                        ) : null
                    }
                </div>
            </div>

            <div className="flex flex-wrap items-center mb-2 gap-1">
                <div className="w-1/3 font-bold">{t("description.dashboard.invoice_scenario")}<span className="text-red-500">*</span></div>
                <div>
                    {invoiceScenarioLoader ? <span className="inline-block w-[18px] min-w-[18px] h-[18px] rounded-full border-2 border-b-transparent border-primary animate-spin"></span> : null}
                    {!invoiceScenarioLoader && invoiceScenarioMessage ? (<p className="text-[#F16021] bg-[#f15f213c] text-center mx-auto mt-12 p-2 rounded">{invoiceScenarioMessage}</p>) : null}
                    {!invoiceScenarioLoader && !invoiceScenarioMessage ? (
                        <div>
                            <input type="text" readOnly className="-z-10 absolute top-0 left-0 opacity-0" {...register("invoice_scenario", {required: true})} />
                            <SelectOptions
                                title="Select invoice scenario"
                                selectedOption={formValues.invoice_scenario}
                                setSelectedOption={(userSelection) => setValue("invoice_scenario", userSelection)}
                                options={invoiceScenarios.map(invS => invS.name)}
                                className="w-full border border-[#D9D9D9] outline-primary transition-all py-1 px-2"
                                top="top-8"
                            />
                            {!formValues.invoice_scenario && errors.invoice_scenario ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                        </div>
                        ) : null
                    }
                </div>
            </div>

            <div className="flex flex-wrap items-center mb-2 gap-1">
                <div className="w-1/3 font-bold">{t("description.dashboard.currency_unit")}<span className="text-red-500">*</span></div><div>
                    {currencyLoader ? <span className="inline-block w-[18px] min-w-[18px] h-[18px] rounded-full border-2 border-b-transparent border-primary animate-spin"></span> : null}
                    {!currencyLoader && currencyMessage ? (<p className="text-[#F16021] bg-[#f15f213c] text-center mx-auto mt-12 p-2 rounded">{currencyMessage}</p>) : null}
                    {!currencyLoader && !currencyMessage ? (
                        <div>
                            <input type="text" readOnly className="-z-10 absolute top-0 left-0 opacity-0" {...register("invoice_currency", {required: true})} />
                            <SelectOptions
                                title="Currency type"
                                selectedOption={formValues.invoice_currency}
                                setSelectedOption={(userSelection) => setValue("invoice_currency", userSelection)}
                                options={currencies.map(c => c.code)}
                                className="w-full border border-[#D9D9D9] outline-primary transition-all py-1 px-2"
                                top="top-8"
                            />
                            {!formValues.invoice_currency && errors.invoice_currency ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                        </div>
                        ) : null
                    }
                </div>
            </div>

            <div className="flex flex-wrap items-center mb-2 gap-1">
                <div className="w-1/3 font-bold">{t("description.dashboard.exchange_rate")}</div>
                <div>
                    <input type="number" id="exchange_rate" 
                        placeholder="(optional)" 
                        className="border-2 py-1 px-2 outline-none"
                        {...register("exchange_rate")}
                    />
                </div>
            </div>

            <div className="flex flex-wrap items-center mb-2 gap-1">
                <div className="w-1/3 font-bold">{t("description.dashboard.remark")}</div>
                <div>
                    <input type="text" id="wildcard_1" 
                        placeholder="Wild Card 1" 
                        className="border-2 py-1 px-2 outline-none"
                        {...register("wildcard_1")}
                    />
                </div>
            </div>

            <div className="flex flex-wrap items-start mb-2 gap-1">
                <div className="w-1/3 font-bold">{t("description.dashboard.YOUR_TAPDK_Number")}</div>
                <div className="w-1/4">
                    <input type="number" id="your_tapdk_number"
                        placeholder="That is the assigned number" 
                        className="border-2 py-1 px-2 outline-none"
                        {...register("your_tapdk_number")}
                    />
                    <span className="text-primary">{t("description.dashboard.your_TAPDK_number_should_only_be_used_on_TAPDK_invoice")}</span>
                </div> 
            </div>

            {/* Display if the invoice type is charge */}
            {
                formValues.invoice_type?.toUpperCase() === "CHARGE" ? (
                    <>
                        <div className="flex flex-wrap items-center mb-2 gap-1">
                            <div className="w-1/3 font-bold">{t("description.dashboard.charge_start_date")}<span className="text-red-500">*</span></div>
                            <div>
                                <input type="date" id="charge_start_date"
                                    className="border-2 p-1 outline-none"
                                    {...register("charge_start_date", {required: true})}
                                    required
                                />
                                <input type="time" id="charge_start_time"
                                    className="border-2 p-1 outline-none"
                                    {...register("charge_start_time", {required: true})}
                                    required
                                />
                                {(errors.charge_start_date || errors.charge_start_time) ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center mb-2 gap-1">
                            <div className="w-1/3 font-bold">{t("description.dashboard.charging_end_date")}<span className="text-red-500">*</span></div>
                            <div>
                                <input type="date" id="charge_end_date"
                                    className="border-2 p-1 outline-none"
                                    {...register("charge_end_date", {required: true})}
                                    required
                                />
                                <input type="time" id="charge_end_time"
                                    className="border-2 p-1 outline-none"
                                    {...register("charge_end_time", {required: true})}
                                    required
                                />
                                {(errors.charge_end_date || errors.charge_end_time) ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center mb-2 gap-1">
                            <div className="w-1/3 font-bold">{t("description.dashboard.plate_number")}</div>
                            <div>
                                <input type="text" id="plate_number" placeholder="Plate number"
                                    className="border-2 p-1 outline-none"
                                    {...register("plate_number")}
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center mb-2 gap-1">
                            <div className="w-1/3 font-bold">{t("description.dashboard.vehicle_identification_number")}</div>
                            <div>
                                <input type="text" id="vehicle_id" placeholder="Vehicle ID number"
                                    className="border-2 p-1 outline-none"
                                    {...register("vehicle_id")}
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center mb-2 gap-1">
                            <div className="w-1/3 font-bold">{t("description.dashboard.ESU_rapor_ID")}</div>
                            <div>
                                <input type="text" id="esu_report_id" placeholder="ESU rapor ID number"
                                    className="border-2 p-1 outline-none"
                                    {...register("esu_report_id")}
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center mb-2 gap-1">
                            <div className="w-1/3 font-bold">{t("description.dashboard.ESU_rapor_tarihi")}<span className="text-red-500">*</span></div>
                            <div>
                                <input type="date" id="esu_report_date"
                                    className="border-2 p-1 outline-none"
                                    {...register("esu_report_date", {required: true})}
                                    
                                />
                                <input type="time" id="esu_report_time"
                                    className="border-2 p-1 outline-none"
                                    {...register("esu_report_time", {required: true})}
                                    
                                />
                            </div>
                        </div>
                    
                    </>
                ) : null
            }

        </div>
    )
}

export default InvoiceInfo;