import axios from "axios";

//baseURL: 'http://210.104.190.229:2101/',
const client = axios.create({/*baseURL: 'http://210.104.190.229:2101/',*/ withCredentials: true });

// 공휴일 API

const API_KEY = "E6c3ACjloHKJTdlaQSkPVuUcoZEWV8zH9knCD4EFe7gqpiCWNhNwdX8laJuPFjvAouKFvRsoV%2FruPjl2kz4Yqw%3D%3D";
const operation = 'getHoliDeInfo';

export const getHoliday = (solYear, solMonth) =>
  client.get(`https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/${operation}?solYear=${solYear}&solMonth=${solMonth}&ServiceKey=${API_KEY}&_type=json`, {withCredentials: false});

// 휴가 DB API

export const getVacation = (solYear, solMonth) => {
    return client.get(`calendar/approval?`, {
        params: {
            year: solYear,
            month: solMonth
        }
    })
        .then(res => res.data)
        .catch(error => console.log(error))
}


// 우리 DB API

const OSDInternURL = 'calendar/'

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
export const getOneEventData = async pickEventID => {
    return client.get(`${OSDInternURL}${pickEventID}`)
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

export const login = ({ m_id, m_password }) =>
    client.post('auth/login', {id : m_id, password: m_password});

export const register = ({ m_id, m_password, m_name, m_dept }) =>
    client.post('auth/join', {id : m_id, password: m_password, name: m_name, deptno: m_dept})

export const check = () => client.get('auth/login/check');

export const logout = () => client.get('auth/logout');

export const getTeam = m_num => client.get(`bob/team/list/new/${m_num}`);