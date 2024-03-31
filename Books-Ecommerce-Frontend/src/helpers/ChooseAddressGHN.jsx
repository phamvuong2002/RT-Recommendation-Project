import React, { useEffect, useState } from 'react'
import { PopupCenterPanel } from '../components/popup/PopupCenterPanel'
import { fetchData, fetchDataGHN } from './fetch';
import { TextLoader } from '../components/loaders/TextLoader';

export const ChooseAddressGHN = ({ open, setOpen, icon, setGeneralAddress }) => {
    const [province, setProvince] = useState({ ProvinceID: 0, });
    const [district, setDistrict] = useState({ DistrictID: 0, });
    const [ward, setWard] = useState({ WardCode: 0 })

    const [provinceData, setProviceData] = useState([]);
    const [districtData, setDistrictData] = useState([]);
    const [wardData, setWardData] = useState([]);

    const [previewProvince, setPreviewProvince] = useState(false);
    const [previewDistrict, setPreviewDistrict] = useState(false);
    const [previewWard, setPreviewWard] = useState(false);

    const [isShowResetButton, setISShowResetButton] = useState(false);

    const reset = (province = false, district = false, ward = false) => {
        if (province) {
            setProviceData([]);
            setProvince({ ProvinceID: 0, });
            setPreviewProvince(false);
        }
        if (district) {
            setDistrictData([]);
            setDistrict({ DistrictID: 0, });
            setPreviewDistrict(false);
        }
        if (ward) {
            setWardData([]);
            setWard({ WardCode: 0 });
            setPreviewWard(false);
        }
    }

    const sortProvinceArrayByProvinceID = (array) => {
        // Tìm vị trí của các đối tượng có ProvinceID là 201 và 202
        const index201 = array.findIndex(obj => obj.ProvinceID === 201);
        const index202 = array.findIndex(obj => obj.ProvinceID === 202);

        // Nếu không tìm thấy ProvinceID 201 hoặc 202, hoặc 201 và 202 đã ở đầu mảng, không cần sắp xếp lại
        if (index201 === -1 || index202 === -1 || index201 === 0 || index202 === 0) {
            return array;
        }

        // Loại bỏ các đối tượng có ProvinceID là 201 và 202 từ mảng
        const province201 = array.splice(index201, 1)[0];
        const province202 = array.splice(index202, 1)[0];

        // Thêm các đối tượng có ProvinceID là 201 và 202 vào đầu mảng
        array.unshift(province202);
        array.unshift(province201);

        return array;
    }

    useEffect(() => {
        const loadDataAddress = async () => {
            if (province.ProvinceID === 0) {
                const provinceUrl = 'https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province'
                try {
                    const loadProvinceData = await fetchDataGHN(provinceUrl)
                    if (loadProvinceData.code === 200) {
                        setProviceData(sortProvinceArrayByProvinceID(loadProvinceData.data))
                    }
                } catch (error) {
                    //Throw an error
                }
            }
            else if (province.ProvinceID !== 0 && district.DistrictID === 0) {
                const districtUrl = 'https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district'
                try {
                    const loadDistrictData = await fetchDataGHN(districtUrl, { "province_id": province.ProvinceID })
                    if (loadDistrictData.code === 200) {
                        setDistrictData(loadDistrictData.data)
                    }
                } catch (error) {
                    //Throw an error
                }
            } else if (district.DistrictID !== 0 && ward.WardCode === 0) {
                const wardUrl = 'https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward'
                try {
                    const loadWardData = await fetchDataGHN(wardUrl, { "district_id": district.DistrictID })
                    if (loadWardData.code) {
                        setWardData(loadWardData.data)
                    }
                } catch (error) {
                    //Throw an error
                }
            }
        }
        loadDataAddress()

        if (province.ProvinceID !== 0 && district.DistrictID !== 0 && ward.WardCode !== 0) {
            setGeneralAddress({
                ...province,
                ...district,
                ...ward,
            })
            setOpen(false);
            setISShowResetButton(true);
        }
    }, [province, district, ward])


    return (
        <div>
            <PopupCenterPanel
                title="Chọn Địa Chỉ"
                open={open}
                setOpen={setOpen}
                icon={icon}
                titleClassName={''}
                content={
                    <div className="flex flex-col gap-4 font-semibold text-sm mt-4">
                        <div className="flex gap-4">

                            <div
                                className={` ${province.ProvinceID === 0 ? 'text-red-500' : ''} flex flex-col gap-2 items-center justify-center cursor-pointer`}
                                onClick={() => { setPreviewProvince(true), reset(true, true, true) }}>
                                <div>
                                    {province.ProvinceID === 0 ? 'Chọn Tỉnh(Thành Phố)' : province?.ProvinceName}
                                </div>
                                <hr className={`${province.ProvinceID === 0 ? 'bg-red-500' : 'bg-none'} w-8 h-1  border-0 rounded`} />
                            </div>

                            {
                                province.ProvinceID !== 0 ?
                                    <div
                                        className={`${district.DistrictID === 0 ? 'text-red-500' : ''} flex flex-col gap-2 items-center justify-center cursor-pointer`}
                                        onClick={() => { setPreviewDistrict(true); reset(false, true, true) }}
                                    >
                                        <div>
                                            {district.DistrictID === 0 ? 'Chọn Huyện(Quận)' : district?.DistrictName}
                                        </div>
                                        <hr className={`${district.DistrictID === 0 ? 'bg-red-500' : 'bg-none'} w-8 h-1  border-0 rounded`} />
                                    </div>
                                    : ''
                            }

                            {
                                district.DistrictID !== 0 ?
                                    <div
                                        className={`${ward.WardCode === 0 ? 'text-red-500' : ''} flex flex-col gap-2 items-center justify-center cursor-pointer`}
                                        onClick={() => { reset(false, false, true) }}
                                    >
                                        <div>
                                            {ward.WardCode === 0 ? 'Chọn Phường(Xã)' : ward?.WardName}
                                        </div>
                                        <hr className={`${ward.WardCode === 0 ? 'bg-red-500' : 'bg-none'} w-8 h-1  border-0 rounded`} />
                                    </div>
                                    : ''
                            }
                        </div>

                        <div className="flex flex-col w-full max-h-[20rem] overflow-y-auto bg-white scrollbar-thin">
                            {/* Provice render */}
                            {
                                province.ProvinceID === 0 || (province.ProvinceID !== 0 && previewProvince) ?
                                    provinceData === 0 ? <TextLoader items={4} /> :
                                        provinceData.map(province_ => (
                                            <div
                                                key={province_.ProvinceID}
                                                className="w-full px-2 py-4 border-b border-b-gray-200 cursor-pointer xl:hover:bg-gray-100"
                                                onClick={() => {
                                                    setProvince({ ProvinceID: province_.ProvinceID, ProvinceName: province_.ProvinceName });
                                                }}
                                            >
                                                <div className="flex justify-between">
                                                    <div>
                                                        {province_?.ProvinceName}
                                                    </div>
                                                    <div>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        )) : null
                            }
                            {/* District render */}
                            {
                                district.DistrictID === 0 || (province.ProvinceID !== 0 && previewDistrict) ?
                                    districtData.length === 0 ? <div className={province.ProvinceID !== 0 ? '' : 'hidden'}><TextLoader items={4} /></div> :
                                        districtData.map(district_ => (
                                            <div
                                                key={district_.DistrictID}
                                                className="w-full px-2 py-4 border-b border-b-gray-200 cursor-pointer xl:hover:bg-gray-100"
                                                onClick={() => {
                                                    setDistrict({ DistrictID: district_.DistrictID, DistrictName: district_.DistrictName })
                                                }
                                                }
                                            >
                                                <div className="flex justify-between">
                                                    <div>
                                                        {district_?.DistrictName}
                                                    </div>
                                                    <div>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        )) : null
                            }
                            {/* Ward render */}
                            {
                                ward.WardCode === 0 || (district.DistrictID !== 0 && previewWard) ?
                                    wardData.length === 0 ? <div className={district.DistrictID !== 0 ? '' : 'hidden'}><TextLoader items={4} /></div> :
                                        wardData.map(ward_ => (
                                            <div
                                                key={ward_.WardCode}
                                                className="w-full px-2 py-4 border-b border-b-gray-200 cursor-pointer xl:hover:bg-gray-100"
                                                onClick={() => { setWard({ WardCode: ward_.WardCode, WardName: ward_.WardName }) }}
                                            >
                                                <div className="flex justify-between">
                                                    <div>
                                                        {ward_?.WardName}
                                                    </div>
                                                    <div>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        )) : null
                            }
                        </div>
                        {
                            isShowResetButton ?
                                <button className='h-10 w-full bg-red-500' onClick={() => reset(true, true, true)}> Chọn Lại </button>
                                : null
                        }
                    </div>
                }
            />
        </div>
    )
}
