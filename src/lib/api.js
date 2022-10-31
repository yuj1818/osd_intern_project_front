import axios from "axios";

const client = axios.create();

// 공휴일 API

const API_KEY = "E6c3ACjloHKJTdlaQSkPVuUcoZEWV8zH9knCD4EFe7gqpiCWNhNwdX8laJuPFjvAouKFvRsoV%2FruPjl2kz4Yqw%3D%3D";
const operation = 'getHoliDeInfo';

export const getHoliday = (solYear, solMonth) =>
    client.get(`https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/${operation}?solYear=${solYear}&solMonth=${solMonth}&ServiceKey=${API_KEY}&_type=json`);


// 우리 DB API

const OSDInternURL = 'http://172.25.4.5:2101/calendar/'

// export const getNewEvent = (CalYear, CalMonth) => {
//     //console.log(`http://172.25.4.5:2101/calendar/?year=${CalYear}&month=${CalMonth}`);
//     return client.get(`http://172.25.4.5:2101/calendar/?year=${CalYear}&month=${CalMonth}`)
// }

export const getNewEvent = async (CalYear, CalMonth) => {
    return client.get(OSDInternURL, {
        params : {
            year : CalYear,
            month : CalMonth
        }
    })
        .then(function (res) {
            return res.data
        })
        .catch( function (error) {
            console.log(error)
        })
}

export const addNewEvent = ({ title, category, startDate, endDate }) => {
    const bodyData = {
        cal_title: title,
        cal_category: category,
        cal_start_day: startDate,
        cal_end_day: endDate,
    }
    return client.post(OSDInternURL,bodyData,{
        method : "POST",
        header : {
            "Content-Type": "application/json",
        },
    })
        .then(function (res){
            return res
        })
        .catch( function (error) {
            console.log(error)
        })
}

export const updateNewEvent = ({_id, title, category, startDate, endDate }) => {
    const bodyData = {
        cal_title: title,
        cal_category: category,
        cal_start_day: startDate,
        cal_end_day: endDate,
    }
    return client.put(`${OSDInternURL}${_id}`,bodyData,{
        method : "PUT",
        header : {
            "Content-Type": "application/json",
        },
    })
        .then(function (res){
            return res
        })
        .catch( function (error) {
            console.log(error)
        })
}

export const deleteNewEvent = id => {
    console.log(`${OSDInternURL}${id}`)
    return client.delete(`${OSDInternURL}${id}`)
}