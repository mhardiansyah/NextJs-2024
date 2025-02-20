/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  BookCreatePayload,
  BookListFilter,
  BookListResponse,
  DetailBookResponse,
} from "./interface";
import { axiosClient } from "@/lib/axiosClient";
import { ChangeEvent, useState } from "react";
import Swal from "sweetalert2";

const useBookModule = () => {
  const queryClient = useQueryClient();

  const createBook = (payload: BookCreatePayload) => {
    return axiosClient.post("/book/tambah", payload).then((res) => res.data);
  };
  const useCreateBook = () => {
    const [errors, setErrors] = useState<{ year?: string }>({});
    const mutate = useMutation({
      mutationFn: (payload: BookCreatePayload) => createBook(payload),
      onSuccess: (res) => {
        console.log("response", res);
      },
      onError: (error) => {
        console.log("error", error);

        // if ((error as any).response?.data?.message?.includes("minimal harus tahun 2018")) {
        //   setErrors({ year: "Minimal harus tahun 2018" });
        // }
      },
    });
    return mutate;
  };



  // create Book

  //list book
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
      setParams(defaultParams);
      setFilterParams(defaultParams);
    };

    const handleFilter = () => {
      console.log("filter berjalan");

      setFilterParams(() => {
        return {
          ...params,
        };
      });
    };

    console.log("filter", params);

    const handlePage = (page: number) => {
      console.log("page berjalan");
      setParams((params) => {
        return {
          ...params,
          page: page,
        };
      });

      setFilterParams((filterParams) => {
        return {
          ...filterParams,
          page: page,
        };
      });
    };

    const handlePageSize = (e: ChangeEvent<any>) => {
      console.log("PageSize berjalanan");

      setParams((params) => {
        return {
          ...params,
          page: 1,
          pageSize: e.target.value,
        };
      });

      setFilterParams((filterParams) => {
        return {
          ...filterParams,
          page: 1,
          pageSize: e.target.value,
        };
      });
    };

    const { data, isFetching, isLoading } = useQuery<BookListResponse>({
      queryKey: ["/book/list", [filterParams]],
      queryFn: () => getBookList(filterParams),
    });

    return {
      data,
      isFetching,
      isLoading,
      params,
      setParams,
      handleClear,
      handleFilter,
      handlePage,
      handlePageSize,
    }
  };

    //detail
    const getDetailBook = async (id: string): Promise<DetailBookResponse> => {
      return axiosClient.get(`/book/detail/${id}`).then((res) => res.data.data);
    };

    const useDetailBook = (id: string) => {
      const { data, isLoading, isFetching } = useQuery({
        queryKey: ["/book/detail", { id }],
        queryFn: () => getDetailBook(id),
        select: (response: any) => response,
      });
      return { data, isLoading, isFetching };
    };

    //update Book
    const updateBook = (id: string, payload: BookCreatePayload) => {
      return axiosClient.put(`/book/update/${id}`, payload).then((res) => res.data);
    };
    const useUpdateBook = (id: string) => {
      const [errors, setErrors] = useState<{ year?: string }>({});
      const mutate = useMutation({
        mutationFn: (payload: BookCreatePayload) => updateBook(id,payload),
        onSuccess: (res) => {
          console.log("response", res);
        },
        onError: (error) => {
          console.log("error", error);
  
          // if ((error as any).response?.data?.message?.includes("minimal harus tahun 2018")) {
          //   setErrors({ year: "Minimal harus tahun 2018" });
          // }
        },
      });
      return mutate;
    };

    //delete book

    const useDeleteBook = () => {
      
      const mutate = useMutation({
        mutationFn: (id:number) => axiosClient.delete(`/book/delete/${id}`),
        onSuccess: (res: any) => {
          console.log("berhasil", res);
          queryClient.invalidateQueries({ queryKey: ["/book/list"] });          Swal.fire({
            title: "Good job!",
            text: "data berhasil di hapus!",
            icon: "success"
          });
        },
        onError: (error: any) => {
          console.log("error", error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "data gagal di hapus!",
            footer: '<a href="#">Why do I have this issue?</a>'
          });        },
      });
      return mutate;
    }

    //deleteMulti
    const useDeleteMultiBook = () => {
      const mutate = useMutation({
        mutationFn: async (ids: number[]) => {
          return Promise.all(ids.map(id => axiosClient.delete(`/book/delete/${id}`)));
        },
        onSuccess: (res: any) => {
          console.log("berhasil", res);
          queryClient.invalidateQueries({ queryKey: ["/book/list"] });
          Swal.fire({
            title: "Good job!",
            text: "Semua data berhasil dihapus!",
            icon: "success"
          });
        },
        onError: (error: any) => {
          console.log("error", error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Beberapa data gagal dihapus!",
            footer: '<a href="#">Why do I have this issue?</a>'
          });
        },
      });
      return mutate;
    };
    



  return { useBookList, useCreateBook, useDetailBook, useUpdateBook, useDeleteBook, useDeleteMultiBook };
};

export default useBookModule;
