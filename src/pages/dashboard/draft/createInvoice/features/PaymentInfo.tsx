/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks/hooks";
import SelectOptions from "../../../components/SelectOptions";
import { useTranslation } from "react-i18next";
import { getPaymentMethods } from "../../../../../store/features/PaymentMethod";

interface ReceiverInfoProps {
    register: any;
    formValues: any;
    setValue: any;
}

const PaymentInfo = ({register, formValues, setValue}: ReceiverInfoProps) => {
    const {paymentMethods, loading, message} = useAppSelector(state => state.paymentMethods);
    const dispatch = useAppDispatch();
    const { t } = useTranslation();

    useEffect(() => {

        if(!paymentMethods.length){ dispatch(getPaymentMethods())}

    }, [dispatch, paymentMethods.length]);


    return (
        <>
            <div className="w-full p-4 mb-3 md:w-1/2 text-xs shadow-lg">
                <div className="border-b-2 border-primary text-tertiary pb-1 mb-3 font-bold">{t("description.dashboard.PAYMENT_INFORMATION")}</div>
                <div className="flex flex-wrap items-center mb-2 gap-1">
                    <div className="w-1/3 font-bold">{t("description.dashboard.payment_date")}</div>
                    <div>
                        <input type="date" id="payment_date"
                            className="border-2 py-1 px-2 outline-none"
                            {...register("payment_date")}
                        />
                    </div>
                </div>
            
                <div className="flex flex-wrap items-center mb-2 gap-1">
                    <div className="w-1/3 font-bold">{t("description.dashboard.payment_method")}</div>
                    <div>
                        {loading ? <span className="inline-block w-[18px] min-w-[18px] h-[18px] rounded-full border-2 border-b-transparent border-primary animate-spin"></span> : null}
                        {!loading && message ? (<p className="text-[#F16021] bg-[#f15f213c] text-center mx-auto mt-12 p-2 rounded">{message}</p>) : null}
                        {!loading && !message ? (
                            <div>
                                {/* <label className="block font-semibold mb-1" htmlFor="payment_means">{t("description.dashboard.payment_method")}</label> */}
                                {/* <input type="text" readOnly className="-z-10 absolute top-0 left-0" {...register("payment_means", {required: true})} /> */}
                                <SelectOptions
                                    title="Select payment method"
                                    selectedOption={formValues.payment_means as string}
                                    setSelectedOption={(userSelection) => setValue("payment_means", userSelection)}
                                    options={paymentMethods.map(py => py.name)}
                                    className="border border-[#D9D9D9] rounded outline-primary transition-all p-2"
                                    top="top-8"
                                />
                                {/* {!formValues.payment_means && errors.payment_means ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null} */}
                            </div>
                        ) : null }


                        {/* <input type="text" readOnly className="-z-10 absolute top-0 left-0" {...register("payment_means")} />
                        <SelectOptions
                        title="Choose payment method"
                        selectedOption={formValues.payment_means}
                        setSelectedOption={(userSelection) => setValue("payment_means", userSelection)}
                        options={["Paypal", "iyzico"]}
                        className="w-full border border-[#D9D9D9] outline-primary transition-all py-1 px-2"
                        top="top-8"
                        /> */}
                    </div>
                </div>

                <div className="flex flex-wrap items-center mb-2 gap-1">
                    <div className="w-1/3 font-bold">{t("description.dashboard.payment_channel_code")}</div>
                    <div>
                        <input type="text" id="payment_channel_code" placeholder="Enter payment channel" 
                            className="border-2 py-1 px-2 outline-none"
                            {...register("payment_channel_code")}
                        />
                    </div>
                </div>

                <div className="flex flex-wrap items-center mb-4 gap-1">
                    <div className="w-1/3 font-bold">{t("description.dashboard.payee_financial_account")}</div>
                    <div>
                        <input type="text" id="payee_financial_account" placeholder="Enter payee financial account" 
                            className="border-2 py-1 px-2 outline-none"
                            {...register("payee_financial_account")}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentInfo