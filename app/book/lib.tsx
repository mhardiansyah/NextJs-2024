/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { BookListFilter, BookListResponse } from "./interface";
import { axiosClient } from "@/lib/axiosClient";
import { useState } from "react";

const useBookModule = () => {
  const defaultParams = {
    title: "",
    author: "",
    from_year: "",
    to_year: "",
    page: 1,
    pageSize: 10,
  };
  const getBookList = async (
    params: BookListFilter
  ): Promise<BookListResponse> => {
    return axiosClient.get("/book/list", { params }).then((res) => res.data);
  };

  const useBookList = () => {
    let [params, setParams] = useState<BookListFilter>(defaultParams);
    let [filterParams, setFilterParams] =
      useState<BookListFilter>(defaultParams);
      const handleClear = () => {
        console.log("clear berjalan");
      };
    
      const handleFilter = () => {
        console.log("filter berjalan");
      };
    const { data, isFetching, isLoading } = useQuery<BookListResponse>({
      queryKey: ["/book/list", [filterParams]],
      queryFn: () => getBookList(filterParams),
    });

    return { data, isFetching, isLoading, params, setParams, handleClear, handleFilter };
  };

  return { useBookList };
};

export default useBookModule;
