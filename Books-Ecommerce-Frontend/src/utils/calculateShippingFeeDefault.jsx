import { fetchDataGHN } from "../helpers/fetch"
import { formatDate } from "./formatDate"

const SHOP_ID = 191502
const SHOP_PRIVINCE_ID = 202
const SHOP_DISTRICT_ID = 1444 //Quận 3
const SHOP_WARD_CODE = "90795" //Võ Thị Sáu
const SHOP_WARD_NAME = "Võ Thị Sáu"
const SHOP_DISTRICT_NAME = "Quận 3"
const SHOP_PROVINCE_NAME = "Hồ Chí Minh"
const SHOP_PHONE_NUMBER = "0948908485"

export const calculateShippingFeeDefault = async (toAddress, product) => {
    const url_service = 'https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services'
    const url_cal_fee = 'https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/preview'

    const serviceDataResponse = await fetchDataGHN(url_service, {
        "shop_id": SHOP_ID,
        "from_district": SHOP_DISTRICT_ID,
        "to_district": toAddress.distristid
    })

    if (serviceDataResponse.code !== 200) {
        return null
    }
    const serviceData = serviceDataResponse.data

    const service_fee_data = []
    for (const service of serviceData) {

        // console.log(toAddress.distristid, {
        //     "payment_type_id": 2,
        //     "required_note": "KHONGCHOXEMHANG",
        //     "from_ward_name": SHOP_WARD_NAME,
        //     "from_district_name": SHOP_DISTRICT_NAME,
        //     "from_province_name": SHOP_PROVINCE_NAME,
        //     "return_phone": SHOP_PHONE_NUMBER,
        //     "return_address": "",
        //     "return_district_id": SHOP_DISTRICT_ID,
        //     "return_ward_code": SHOP_WARD_CODE,
        //     "to_name": toAddress.userFullName,
        //     "to_phone": toAddress.userPhone,
        //     "to_address": "Ký tự bất kỳ",
        //     "to_ward_code": toAddress.wardid,
        //     "to_district_id": toAddress.distristid,
        //     "weight": 200,
        //     "length": 1,
        //     "width": 19,
        //     "height": 10,
        //     "pick_station_id": SHOP_DISTRICT_ID,
        //     "service_id": service.service_id,
        //     "service_type_id": service.service_type_id,
        //     "items": [
        //         {
        //             "name": product.name,
        //             "code": `"${product.id}"`,
        //             "quantity": 1,
        //             "price": product.price,
        //             "length": product.length_,
        //             "width": product.width_,
        //             "height": product.height_,
        //             "weight": product.weight_
        //         }
        //     ]
        // });


        const service_fee = await fetchDataGHN(url_cal_fee, {
            "payment_type_id": 2,
            "required_note": "KHONGCHOXEMHANG",
            "from_ward_name": SHOP_WARD_NAME,
            "from_district_name": SHOP_DISTRICT_NAME,
            "from_province_name": SHOP_PROVINCE_NAME,
            "return_phone": SHOP_PHONE_NUMBER,
            "return_address": "",
            "return_district_id": SHOP_DISTRICT_ID,
            "return_ward_code": SHOP_WARD_CODE,
            "to_name": toAddress.userFullName,
            "to_phone": toAddress.userPhone,
            "to_address": "Ký tự bất kỳ",
            "to_ward_code": toAddress.wardid,
            "to_district_id": toAddress.distristid,
            "weight": 200,
            "length": 1,
            "width": 19,
            "height": 10,
            "pick_station_id": SHOP_DISTRICT_ID,
            "service_id": service.service_id,
            "service_type_id": service.service_type_id,
            "items": [
                {
                    "name": product?.name || "name",
                    "code": `"${product?.id || 123}"`,
                    "quantity": 1,
                    "price": product?.price || 0,
                    "length": product?.length_ || 20,
                    "width": product?.width_ || 20,
                    "height": product?.height_ || 20,
                    "weight": product?.weight_ || 200
                }
            ]
        })

        if (service_fee.code === 200) {
            service_fee_data.push({
                "serviceid": service.service_id,
                "fee": service_fee.data.total_fee,
                "type": service.short_name,
                "date": `${formatDate(new Date())} - ${formatDate(service_fee.data.expected_delivery_time)}`,
                "typeid": service.service_type_id
            })
        }
    }

    return service_fee_data || null
}