import { ReactNode } from "react";


export interface ChildrenProps {
    children: ReactNode;
}

export interface ProfileProps {
    id: number | string;
    uuid: string;
    name: string;
    email: string;
    phone: string;
    username: string;
    address: string;
    company_id: string;
    email_verified_at: string;
    created_at: string;
    updated_at: string;
}

export interface CompanyProps {
    "id": number | string;
    "company_name": string;
    "tax_number": string;
    "tax_office": string;
    "mersis_number": string;
    "business_registry_number": string;
    "operating_center": string;
    "country": string;
    "city": string;
    "address": string;
    "email": string;
    "phone_number": string;
    "website": string;
    "gib_registration_data": string;
    "gib_sender_alias": string;
    "gib_receiver_alias": string;
    "e-signature_method": string;
    "date_of_last_update": string;
    "last_update_user": string;
  }

// export interface UserProps {
//     "id": number | string;
//     "name": string;
//     "email": string;
//     "phone": string;
//     "mobile": string;
//     "username": string;
//     "password": string;
//     "notification_einvoice": boolean;
//     "notification_edispatch": boolean;
//     "luca_username": string;
//     "luca_member_number": string;
//     "luca_password": string;
//     "export_only": boolean;
//     "earchive": boolean;
//     "einvoice_only": boolean;
//     "ssi_only": boolean;
//     "company_id": number | string;
//   }


export interface UserProps {
  "id": number | string;
  "uuid": string;
  "name": string;
  "email": string;
  "phone": string;
  "mobile": string;
  "username": string;
  "address": string | null;
  "email_verified_at": string | null;
  "company_id": number | string;
  "company_name"?: string;
  "notification_einvoice": number | string;
  "notification_edispatch": number | string;
  "luca_username": string;
  "luca_member_number": string;
  "luca_password": string;
  "export_only": number | string;
  "earchive": number | string;
  "einvoice_only": number | string;
  "ssi_only": number | string;
  "created_at": string;
  "updated_at": string;
  "pivot": {
      "company_id": number | string;
      "user_id": number | string;
  }
}


export interface CurrencyProps {
  "id": number | string;
  "name": string;
  "code": string;
  "created_at": string;
  "updated_at": string;
}


export interface UnitProps {
  "id": number | string;
  "name": string;
  "code": string;
  "created_at": string;
  "updated_at": string;
}


export interface InvoiceTypeProps {
  "id": number | string;
  "name": string;
  "created_at": string;
  "updated_at": string;
}

export interface InvoiceScenarioProps {
  "id": number | string;
  "name": string;
  "created_at": string;
  "updated_at": string;
}

export interface InvoiceSendTypeProps {
  "id": number | string;
  "name": string;
  "created_at": string;
  "updated_at": string;
}

export interface UtilsProps {
  "id": number | string;
  "name": string;
  "created_at": string;
  "updated_at": string;
}


export interface OutgoingInvoiceProps {
  "id": number | string;
  "user_id": number | string;
  "company_id": number | string;
  "send_type": number | string;
  "invoice_uuid": string;
  "invoice_date": string;
  "invoice_time": string;
  "invoice_id": string;
  "invoice_type": number | string;
  "invoice_scenario": number | string;
  "invoice_currency": number | string;
  "exchange_rate": string;
  "wildcard_1": string;
  "your_tapdk_number": string;
  "charge_start_date": string;
  "charge_start_time": string;
  "charge_end_date": string;
  "charge_end_time": string;
  "plate_number": string;
  "vehicle_id": string;
  "esu_report_id": string;
  "esu_report_date": string;
  "esu_report_time": string;
  "order_number": string;
  "order_date": string;
  "dispatch_number": string;
  "dispatch_date": string;
  "dispatch_time": string;
  "mode_code": string;
  "tr_id_number": string;
  "name_declarer": string;
  "name": string;
  "surname": string;
  "nationality": string;
  "passport_number": string;
  "passport_date": string;
  "receiver_name": string;
  "tax_number": string;
  "gib_post_box": string;
  "receiver_tapdk_number": string;
  "tax_office": string;
  "country": string;
  "city": string;
  "address": string;
  "receiver_email": string;
  "receiver_web": string;
  "receiver_phone": string;
  "payment_date": string;
  "payment_means": string;
  "payment_channel_code": string;
  "payee_financial_account": string;
  "total_products": number | string;
  "total_discount": string;
  "total_increase": string;
  "zero_zero_one_five_vat": string;
  "total_taxes": string;
  "bottom_total_discount_rate": string;
  "notes": string;
  "attachment": string;
  "created_at": string;
  "updated_at": string;
  "products": {
          "id": number;
          "product_service": string;
          "quantity": number;
          "unit_measurement": string;
          "price": string;
          "taxable_amount": string;
          "zero_zero_one_five_vat_rate": string;
          "zero_zero_one_five_vat_amount": string;
          "taxline_total": string;
          "payabl_line_total": string;
          "invoice_id": number;
          "created_at": string;
          "updated_at": string;
          "decrease_increase": {
                  "id": number;
                  "type": string;
                  "rate": number;
                  "amount": string;
                  "invoice_product_id": number;
                  "created_at": string;
                  "updated_at": string;
          }[]
    }[]
}


export interface OutgoingDeliveryProps {
      "id": number;
      "user_id": number;
      "company_id": number;
      "invoice_uuid": string;
      "submission_type_id": number;
      "despatch_date": string;
      "despatch_id": string;
      "despatch_type_id": number;
      "invoice_scenario_id": number;
      "currency_unit_id": number;
      "carrier_title": string;
      "carrier_tin": string;
      "vehicle_plate_number": string;
      "total_amount": string;
      "wild_card1": string;
      "receiver_name": string;
      "receiver_tax_number": string;
      "receiver_gib_postacute": string;
      "receiver_tax_office": string;
      "receiver_country": string;
      "receiver_city": string;
      "receiver_destrict": string;
      "receiver_address": string;
      "receiver_mobile_number": string;
      "real_buyer": string;
      "buyer_tax_number": string;
      "buyer_tax_admin": string;
      "buyer_tax_office": string;
      "buyer_country": string;
      "buyer_city": string;
      "buyer_destrict": string;
      "buyer_address": string;
      "real_seller": string;
      "seller_tax_number": string;
      "seller_tax_admin": string;
      "seller_tax_office": string;
      "seller_country": string;
      "seller_city": string;
      "seller_destrict": string;
      "seller_address": string;
      "order_number": number | string;
      "order_date": string;
      "shipment_time": string;
      "additional_document_id": string;
      "second_receiver_country": string;
      "second_receiver_ill": string;
      "second_receiver_postal_code": string;
      "second_receiver_district": string;
      "second_receiver_address": string;
      "notes": string;
      "created_at": string;
      "updated_at": string;
      "products": {
              "id": number;
              "product_service": string;
              "quantity_one": number | string;
              "unit_id_one": number;
              "quantity_two": number | string;
              "unit_id_two": number;
              "price": number | string;
              "product_amount": number | string;
              "edelivery_note_id": number;
              "created_at": string;
              "updated_at": string;
      }[],
      "drivers": {
              "id": number;
              "name": string;
              "surname": string;
              "tckn": string;
              "edelivery_note_id": number;
              "created_at": string;
              "updated_at": string;
      }[],
      "trailers": {
              "id": number;
              "plate_number": string;
              "edelivery_note_id": number;
              "created_at": string;
              "updated_at": string;
      }[]
}


export interface OutgoingProducerProps {
      "id": number;
      "producer_uuid": string;
      "producer_date": string;
      "producer_name": string;
      "unit_id": number
      "total_amount": string;
      "title": string;
      "receiver_name": string;
      "receiver_tax_number": string;
      "receiver_tax_office": string;
      "buyer_country": string;
      "buyer_city": string;
      "buyer_email": string;
      "buyer_mobile_number": string;
      "buyer_web_address": string;
      "buyer_address": string;
      "total_product_services": string;
      "total_0003_stoppage": string;
      "total_taxes": string;
      "total_payable": string;
      "notes": string;
      "company_id": number;
      "user_id": number
      "created_at": string;
      "updated_at": string;
      "unit": {
          "id": number
          "name": string;
          "code": string;
          "created_at": string;
          "updated_at": string;
      },
      "products": {
              "id": number;
              "fee_reason": string;
              "quantity1": number | string;
              "quantity2": number | string;
              "unit_id1": number;
              "unit_id2": number;
              "price": number | string;
              "gross_amount": number | string;
              "rate": number | string;
              "amount": number | string;
              "tax_line_total": number | string;
              "payable_line": number | string;
              "producer_receipt_id": number;
              "created_at": string;
              "updated_at": string;
      }[]
}

export interface ELedgerProps {
  "id": number | string;
  "account_name": string;
  "transaction_type_id": number | string;
  "amount": number | string;
  "currency_id": number | string;
  "transaction_date": string;
  "description": string;
  "reference_number": string;
  "category_id": number | string;
  "tax_info_id": number | string;
  "tax_amount": number | string;
  "payment_method_id": number | string;
  "payer_name": string;
  "payer_id_number": string;
  "created_by": string;
  "updated_by": string;
  "status_id": number | string;
  "company_id": number | string;
}

export interface UtilsProps {
  "id": number | string;
  "name": string;
  "created_at": string;
  "updated_at": string;
}

