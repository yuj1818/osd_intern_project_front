import axios from "axios";

// 공휴일 API

const API_KEY = "E6c3ACjloHKJTdlaQSkPVuUcoZEWV8zH9knCD4EFe7gqpiCWNhNwdX8laJuPFjvAouKFvRsoV%2FruPjl2kz4Yqw%3D%3D";
const operation = 'getHoliDeInfo';

export const getHoliday = (solYear, solMonth) =>
    axios.get(`https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/${operation}?solYear=${solYear}&solMonth=${solMonth}&ServiceKey=${API_KEY}&_type=json`);