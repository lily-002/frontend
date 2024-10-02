/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import SelectOptions from "../../../components/SelectOptions";
import countries from "../../../../../data/countries.json";
import { useTranslation } from "react-i18next";


interface ReceiverInfoProps {
    register: any;
    errors: any;
    formValues: any;
    setValue: any;
}

const ReceiverInfo = ({register, errors, formValues, setValue}: ReceiverInfoProps) => {
    const { t } = useTranslation();

    const getStateCountryState = (country: string) => {

        if(country){
            const filteredCountry = countries.find(cnt => cnt.name === country);
            return filteredCountry ? filteredCountry.states.map(state => state.name) : []
        }

        return [];
    }
    

    return (
        <>
            <div className=" w-full md:w-1/2 p-4 mb-3 text-xs shadow-md">
                <div className="border-b-2 border-primary text-tertiary pb-1 mb-3 font-bold">{t("description.dashboard.RECEIVER_INFORMATION")}</div>
                <div className="flex flex-wrap items-center mb-2 gap-1">
                    <div className="w-1/3 font-bold">{t("description.dashboard.receiver")}<span className="text-red-500">*</span></div>
                    <div>
                        <input type="text" id="receiver_name" placeholder="Enter receiver name" 
                            className="border-2 p-1 outline-none"
                            {...register("receiver_name", {required: true})}
                            required
                        />
                        {errors.receiver_name ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                    </div>
                </div>

                <div className="flex flex-wrap items-center mb-2 gap-1">
                    <div className="w-1/3 font-bold">{t("description.dashboard.tax_number")}<span className="text-red-500">*</span></div>
                    <div>
                        <input type="text" id="tax_number" placeholder="Enter tax number here" 
                            className="border-2 p-1 outline-none"
                            {...register("tax_number", {required: true})}
                            required
                        />
                        {errors.tax_number ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                    </div>
                </div>

                <div className="flex flex-wrap items-center mb-2 gap-1">
                    <div className="w-1/3 font-bold">{t("description.dashboard.GIB_post_box")}<span className="text-red-500">*</span></div>
                    <div>
                        <input type="text" id="gib_post_box" placeholder="Enter GIB post box" 
                            className="border-2 p-1 outline-none"
                            {...register("gib_post_box", {required: true})}
                            required
                        />
                        {errors.gib_post_box ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                    </div>
                </div>
                
                {/* Display when GOVERNMENT is selected in invoice scenario options */}
                {
                    formValues?.invoice_type?.toUpperCase() === "GOVERNMENT" ? (
                        <div className="flex flex-wrap items-center mb-2 gap-1">
                            <div className="w-1/3 font-bold">{t("description.dashboard.expenditure_unit_tax_number")}<span className="text-red-500">*</span></div>
                            <div>
                                <input type="text" id="expenditure_tax_number" placeholder="Enter tax number here" 
                                    className="border-2 p-1 outline-none"
                                    {...register("expenditure_tax_number", {required: true})}
                                    required
                                />
                                {errors.expenditure_tax_number ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                            </div>
                        </div>
                    ) : null
                }

                <div className="flex flex-wrap items-start mb-2 gap-1">
                    <div className="w-1/3 font-bold">{t("description.dashboard.TAPDK_no")}</div>
                    <div className="w-1/4">
                        <input type="text" id="receiver_tapdk_number" placeholder="That is the assigned number" 
                            className="border-2 py-1 px-2 outline-none"
                            {...register("receiver_tapdk_number")}
                        />
                        <span className="text-primary">{t("description.dashboard.your_TAPDK_number_should_only_be_used_on_TAPDK_invoice")}</span>
                    </div> 
                </div>

                <div className="flex flex-wrap items-center mb-2 gap-1">
                    <div className="w-1/3 font-bold">{t("description.dashboard.tax_office")}</div>
                    <div>
                        <input type="text" id="tax_office" placeholder="Enter tax office" 
                            className="border-2 py-1 px-2 outline-none"
                            {...register("tax_office")}
                        />
                    </div>
                </div>

                <div className="flex flex-wrap items-center mb-2 gap-1">
                    <div className="w-1/3 font-bold">{t("description.dashboard.country")}<span className="text-red-500">*</span></div>
                    <div>
                        <input type="text" readOnly className="-z-10 absolute top-0 left-0 opacity-0" {...register("country", {required: true})} />
                        <SelectOptions
                            title="Select country"
                            selectedOption={formValues.country}
                            setSelectedOption={(userSelection) => setValue("country", userSelection)}
                            options={countries.map(country => country.name)}
                            className="w-full border border-[#D9D9D9] outline-primary transition-all py-1 px-2"
                            top="top-8"
                        />
                        {!formValues.country && errors.country ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                    </div>
                </div>

                <div className="flex flex-wrap items-center mb-2 gap-1">
                    <div className="w-1/3 font-bold">{t("description.dashboard.city")}</div>
                    <div>
                        <input type="text" readOnly className="-z-10 absolute top-0 left-0 opacity-0" {...register("city", {required: true})} />
                        <SelectOptions
                            title={!formValues.country ? "Select country first" : "Select city"}
                            selectedOption={formValues.city}
                            setSelectedOption={(userSelection) => setValue("city", userSelection)}
                            options={getStateCountryState(formValues.country)}
                            className="w-full border border-[#D9D9D9] outline-primary transition-all py-1 px-2"
                            top="top-8"
                        />
                        {!formValues.city && errors.city ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                    </div>
                </div>

                <div className="flex flex-wrap items-center mb-2 gap-1">
                    <div className="w-1/3 font-bold">{t("description.dashboard.county")}</div>
                    <div>
                        <input type="text" readOnly className="-z-10 absolute top-0 left-0 opacity-0" {...register("county", {required: true})} />
                        <input type="text" id="county" placeholder="Enter county" 
                            className="border-2 py-1 px-2 outline-none" 
                            {...register("county", {required: true})}
                        />
                        {errors.county ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                    </div>
                </div>

                <div className="flex flex-wrap items-start mb-2 gap-1">
                    <div className="w-1/3 font-bold">{t("description.dashboard.address")}<span className="text-red-500">*</span></div>
                    <div>
                        <textarea className="border-2 outline-none resize-none py-1 px-2"
                            id="address"
                            placeholder="Enter Address"
                            {...register("address", {required: true})}
                            
                            cols={30} rows={5}
                        ></textarea>
                        {errors.address ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                    </div>
                </div>

                <div className="flex flex-wrap items-center mb-2 gap-1">
                    <div className="w-1/3 font-bold">{t("description.auth.email")}</div>
                    <div>
                        <input type="email" id="receiver_email" placeholder="Enter email address" 
                            className="border-2 py-1 px-2 outline-none" 
                            {...register("receiver_email")}
                        />
                    </div>
                </div>

                <div className="flex flex-wrap items-center mb-2 gap-1">
                    <div className="w-1/3 font-bold">{t("description.dashboard.website_address")}</div>
                    <div>
                        <input type="text" id="receiver_web" placeholder="Enter website address" 
                            className="border-2 py-1 px-2 outline-none"
                            {...register("receiver_web")}
                        />
                    </div>
                </div>

                <div className="flex flex-wrap items-start mb-1 gap-1">
                    <div className="w-1/3 font-bold">{t("description.dashboard.mobile_number")}</div>
                    <div className="w-1/4">
                        <input type="number" id="receiver_phone" placeholder="Enter mobile number" 
                            className="border-2 py-1 px-2 outline-none"
                            {...register("receiver_phone")}
                        />
                        <div className="flex items-start my-2 gap-2">
                            <input type="checkbox" name="sms_notification_for_archive" id="sms_notification_for_archive" 
                                className="accent-primary"
                                defaultValue={formValues.sms_notification_for_archive ?? ""}
                                onChange={(ev) => setValue("sms_notification_for_archive", ev.target.checked)}
                            />
                            <label htmlFor="sms_notification_for_archive">{t("description.dashboard.enable_SMS_notification_for_e_archive_sent")} </label>
                        </div>
                        <div className="flex items-start my-2 gap-2">
                            <input type="checkbox" name="outgoing_sms_notification_einvoice" id="outgoing_sms_notification_einvoice" 
                                className="accent-primary"
                                defaultValue={formValues.outgoing_sms_notification_einvoice ?? ""}
                                onChange={(ev) => setValue("outgoing_sms_notification_einvoice", ev.target.checked)}
                            />
                            <label htmlFor="outgoing_sms_notification_einvoice">{t("description.dashboard.outgoing_SMS_notification_for_e_invoice")}</label>
                        </div>
                        <div className="flex items-start my-2 gap-2">
                            <input type="checkbox" name="add_address_book" id="add_address_book" 
                                className="accent-primary"
                                defaultValue={formValues.add_address_book ?? ""}
                                onChange={(ev) => setValue("add_address_book", ev.target.checked)}
                            />
                            <label htmlFor="add_address_book">{t("description.dashboard.add_to_address_book")}</label>
                        </div>
                        <div className="flex items-start my-2 gap-2">
                            <input type="checkbox" name="delivery_address" id="delivery_address" 
                                className="accent-primary"
                                defaultValue={formValues.delivery_address ?? ""}
                                onChange={(ev) => setValue("delivery_address", ev.target.checked)}
                            />
                            <label htmlFor="delivery_address">{t("description.dashboard.delivery_address")}</label>
                        </div>
                    </div>
                </div>
        </div>
        
        </>
    )

}  

export default ReceiverInfo