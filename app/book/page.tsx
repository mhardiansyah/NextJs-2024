/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Table, Th, Thead, Tr, Tbody, Td } from "../../components/Table";
import useBookModule from "./lib";
import useDislosure from "@/Hook/useDislosure";
import { Drawer } from "@/components/Drawer";
import Filter from "./module/filter";
import Button from "@/components/Button";
import { Pagination } from "@/components/Pagination";
import { useRouter } from 'next/navigation';
import Swal from "sweetalert2";
import { useState } from "react";

const Book = () => {
  const router = useRouter();
  const { useBookList, useDeleteBook, useDeleteMultiBook } = useBookModule();
  const mutate = useDeleteBook();
  const mutateMulti = useDeleteMultiBook();


 

  const { data, isFetching, isLoading, params, setParams, handleClear, handleFilter, handlePage, handlePageSize } = useBookList();
  const { isOpen, onOpen, onClose } = useDislosure();
  const [selectedBooks, setSelectedBooks] = useState<number[]>([]);

  console.log("data buku", data);

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        mutate.mutate(id,)
        // Swal.fire({
  
        // });
      }
    });
  };
  const handleDeleteMulti = () => {
    if (selectedBooks.length === 0){
      Swal.fire({
        title: "Anda belum memilih buku!",
        text: "Silahkan pilih buku yang ingin dihapus!",
        icon: "error",
        confirmButtonText: "Okay",
      });
      return;
    }
    Swal.fire({
      title: "Yakin ingin menghapus buku yang dipilih?",
      text: "Data ini tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
      
    }).then((result) => {
      if (result.isConfirmed) {
        mutateMulti.mutate(selectedBooks);
        setSelectedBooks([]); 
      }
    });

    
    
  };
  const selectedBook = (id: number) => {
    setSelectedBooks((prev) =>
    prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id])
  }
  return (
    <>
      <Drawer
        onClose={onClose}
        onClear={handleClear}
        onSubmit={handleFilter}
        title="Filter Buku"
        isOpen={isOpen}
      >
        <Filter params={params} setParams={setParams} />
      </Drawer>

      <section>
        <Button width="sm"
            onClick={onOpen}
            colorSchema="blue"
            title="Filter" />


<Button onClick={()=> {
            router.push('/book/tambah')
          }} width="sm" colorSchema="green" title="tambah" />
<Button onClick={handleDeleteMulti} width="sm" colorSchema="red" title="hapus banyak" />

      </section>
      <section className="container px-4 mx-auto">
        <Table>
          <Thead>
            <Tr>
              <Th scope="col">
                <div className="flex items-center gap-x-3">
                  <input
                    type="checkbox"
                    className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"
                  />
                  <button className="flex items-center gap-x-2">
                    <span>Invoice</span>
                    <svg
                      className="h-3"
                      viewBox="0 0 10 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="0.1"
                      />
                      <path
                        d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="0.1"
                      />
                      <path
                        d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="0.3"
                      />
                    </svg>
                  </button>
                </div>
              </Th>
              <Th scope="col">Date</Th>
              <Th scope="col">Status</Th>
              <Th scope="col">Tahun</Th>
              <Th scope="col">Date</Th>
              <Th scope="col">
                <span className="sr-only">Actions</span>
              </Th>
              <th>Aksi</th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.data?.map((item, index) => (
              <><Tr key={item.id || index}>
                <Td>
                  <span>
                    <input
                      checked={selectedBooks.includes(item.id)}
                      onChange={() => selectedBook(item.id)}
                      type="checkbox"
                      className="text-blue-500 border-gray-300 rounded-full rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"
                    />
                  </span>
                </Td>
                <Td>
                  <span>{item.author || "="}</span>
                </Td>
                <Td>
                  <span>{item.title || "="}</span>
                </Td>
                <Td>
                  <span>{item.year || "="}</span>
                </Td>
                <Td>
                  <span>{item.created_at || "="}</span>
                </Td>
                <Td>
                  <span>{item.updated_at || "="}</span>
                </Td>
                <Td>
                  <Button
                    width="sm"
                    onClick={() => router.push(`/book/${item.id}/update`)}
                    colorSchema="blue"
                    title="Edit" />
                  <Button
                    width="sm"
                    onClick={
                     ()=> {
                      handleDelete(item.id)
                     }
                    }
                    colorSchema="red"
                    title="Delete" />
                </Td>
              </Tr>
              </>
            ))}
          </Tbody>
        </Table>



        <Pagination
            page={params.page}
            pageSize={params.pageSize}
            handlePageSize={handlePageSize}
            handlePage={handlePage}
            pagination={data?.pagination}
          />
      </section>
    </>
  );
};

export default Book;
