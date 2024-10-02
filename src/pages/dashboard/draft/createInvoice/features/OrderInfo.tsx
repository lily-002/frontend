/* eslint-disable @typescript-eslint/no-explicit-any */

import SelectOptions from "../../../components/SelectOptions";
import { useTranslation } from "react-i18next";


interface OrderInfoProps {
    register: any;
    formValues: any;
    setValue: any;
}

const OrderInfo = ({register, formValues, setValue}: OrderInfoProps) => {
    const { t } = useTranslation();

    return (
        <>
            <div className="shadow-lg h-min p-4">
                <div className="w-full p-1 mb-3 text-xs">
                    <div className="border-b-2 border-primary text-tertiary pb-1 mb-3 font-bold">{t("description.dashboard.ORDER_INFORMATION")}</div>
                    <div className="flex flex-wrap items-center mb-2 gap-1">
                        <div className="w-1/3 font-bold">{t("description.dashboard.order_number")}</div>
                        <div>
                            <input type="text" id="order_number" placeholder="Order number" 
                                className="border-2 py-1 px-2 outline-none"
                                {...register("order_number")}
                            />
                        </div>
                    </div>
                
                    <div className="flex flex-wrap items-center mb-2 gap-1">
                        <div className="w-1/3 font-bold">{t("description.dashboard.order_date")}</div>
                        <div>
                            <input type="date" id="order_date"
                                className="border-2 py-1 px-2 outline-none"
                                {...register("order_date")}
                            />
                        </div>
                    </div>
                </div>

                <div className="w-full p-1 text-xs">
                    <div className="border-b-2 border-primary text-tertiary pb-1 mb-3 font-bold">{t("description.dashboard.DESPATCH_NOTE_INFORMATION")}</div>
                    <div className="flex flex-wrap items-center mb-2 gap-1">
                        <div className="w-1/3 font-bold">{t("description.dashboard.despatch_number")}</div>
                        <div>
                            <input type="text" id="dispatch_number" placeholder="Despatch number" 
                                className="border-2 py-1 px-2 outline-none"
                                {...register("dispatch_number")}
                            />
                        </div>
                    </div>
                
                    <div className="flex flex-wrap items-center mb-2 gap-1">
                        <div className="w-1/3 font-bold">{t("description.dashboard.despatch_date")}</div>
                        <div>
                            <input type="date" id="dispatch_date"
                                className="border-2 py-1 px-2 outline-none"
                                {...register("dispatch_date")}
                            />
                            <input type="time" id="dispatch_time"
                                className="border-2 py-1 px-2 outline-none"
                                {...register("dispatch_time")}
                            />
                        </div>
                    </div>
                </div>


            {/*Display when exceptional invoice type options is selceted */}
            {
                formValues?.invoice_type?.toUpperCase() === "EXCEPTION" ? (
                    <>
                        <div>
                            <div className="w-full p-4 text-xs">
                                <div className="border-b-2 border-primary text-tertiary pb-1 mb-3 font-bold">{t("description.dashboard.SPECIAL_INVOICE_ADDITIONAL_INFORMATION")}</div>
                                <div className="flex flex-wrap items-center mb-2 gap-1">
                                    <div className="w-1/3 font-bold">{t("description.dashboard.mode_code")}</div>
                                    <div>
                                        <SelectOptions
                                            title="Select mode code"
                                            selectedOption={formValues.mode_code}
                                            setSelectedOption={(userSelection) => setValue("mode_code", userSelection)}
                                            options={["Mode 1", "Mode 2", "Mode 3", "Mode 4", "Mode 5"]}
                                            className="w-full border border-[#D9D9D9] outline-primary transition-all py-1 px-2"
                                            top="top-8"
                                        />
                                    </div>
                                </div>
                            
                                <div className="flex flex-wrap items-center mb-2 gap-1">
                                    <div className="w-1/3 font-bold">{t("description.dashboard.TR_ID_number_passport_number_declared")}</div>
                                    <div>
                                        <input type="text" id="tr_id_number" placeholder="TR ID Number/Passport Number Declared" 
                                            className="border-2 py-1 px-2 outline-none"
                                            {...register("tr_id_number")}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center mb-2 gap-1">
                                    <div className="w-1/3 font-bold">{t("description.dashboard.name_and_surname_of_declarer")}</div>
                                    <div>
                                        <input type="text" id="name_declarer" placeholder="Declarer name and surname" 
                                            className="border-2 py-1 px-2 outline-none"
                                            {...register("name_declarer")}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="w-full p-1 text-xs">
                                <div className="border-b-2 border-primary text-tertiary pb-1 mb-3 font-bold">{t("description.dashboard.EXPORT_BUYER")}</div>
                                <div className="flex flex-wrap items-center mb-2 gap-1">
                                    <div className="w-1/3 font-bold">{t("description.dashboard.name")}</div>
                                    <div>
                                        <input type="text" id="name" placeholder="Name" 
                                            className="border-2 py-1 px-2 outline-none"
                                            {...register("name")}
                                        />
                                    </div>
                                </div>
                            
                                <div className="flex flex-wrap items-center mb-2 gap-1">
                                    <div className="w-1/3 font-bold">{t("description.dashboard.surname")}</div>
                                    <div>
                                        <input type="text" id="surname" placeholder="Last name" 
                                            className="border-2 py-1 px-2 outline-none"
                                            {...register("surname")}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center mb-2 gap-1">
                                    <div className="w-1/3 font-bold">{t("description.dashboard.nationality")}</div>
                                    <div>
                                        <input type="text" id="nationality" placeholder="Last name" 
                                            className="border-2 py-1 px-2 outline-none"
                                            {...register("nationality")}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center mb-2 gap-1">
                                    <div className="w-1/3 font-bold">{t("description.dashboard.passport_no")}</div>
                                    <div>
                                        <input type="text" id="passport_number" placeholder="Last name" 
                                            className="border-2 py-1 px-2 outline-none"
                                            {...register("passport_number")}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center mb-2 gap-1">
                                    <div className="w-1/3 font-bold">{t("description.dashboard.passport_date")}</div>
                                    <div>
                                        <input type="date" id="passport_date"
                                            className="border-2 py-1 px-2 outline-none"
                                            {...register("passport_date")}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : null
            }
            </div>

        </>
    )

}

export default OrderInfo