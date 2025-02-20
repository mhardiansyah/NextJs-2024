import axios, { AxiosInstance } from "axios";
 
export const axiosClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:4002",
  headers: { "Content-Type": "application/json" },
});
 
export interface BaseResponsePagination {
  status: string;
  message: string;
  pagination: {
    page: number;
    limit: number;
    pageSize: number;
    total: number;
    total_page: number;
  };
}

export interface BaseResponseSuccess{
  status: string;
  message: string;
}