import { ReactNode } from "react";
import InputText from "./components/TextInput";
import Label from './components/label_tugas'; // Import the Label component
import InputTugas from './components/input_tugas'; // Import the Input component
import Button from './components/button_tugas'; // Import the Button component

export default function App() {
  return (
    <div className="p-4">
      <h1 className="text-white text-3xl mb-4">Hello World</h1>

      <div className="mb-4 ">
        <Label htmlFor="username" isRequired={true} title="Username" />
        <InputTugas id="username" name="username" value="ihsanabuhanifah" />
      </div>

      <div className="mb-4">
        <Label htmlFor="password" isRequired={true} title="Password" />
        <InputTugas id="password" name="password" value="12345678" />
      </div>

      <div className="mb-4">
        <Label htmlFor="name" isRequired={true} title="Name" />
        <InputTugas id="name" name="name" value="ihsan" />
      </div>

      <div className="flex space-x-2">
        <Button title="Simpan" colorSchema="blue" variant="solid" />

      </div>
    </div>
  );
}



// interface InputType {
//   isError? : boolean
//   isSmk? : boolean
//   number? : number
//   isloading? : boolean
// }


// function InputText({isError , isSmk, number,isloading = false, ...props} : InputType & React.InputHTMLAttributes<HTMLInputElement>) {
//   if(isloading) {
//     return (
//       <div className="bg-red-500 w-full h-20">sedang loading ...</div>
//     )
//   }
//   return(
//     <>
//     <input {...props} className="border rounded-md border-black text-black"/>
//     {isSmk ? "sekolah" : isSmk === false ? "bolos" : "sakit"}
//     {number === 100 ? " lulus" : " tidak lulus"}
//     {isError ? <span className="text-red-500">wajib di isi</span> : <></>}
//     </>
//   )
// }


// //props children

// interface NoteType {
//   title : string
//   children :ReactNode
// }

// function Note({title ,children} : NoteType) {
//   return (
//     <div className="border p-2 rounded-md mb-5">
//       <h1 className="text-red-500 mb-1">{title}</h1>
//       <div className="bg-blue-500">{children}</div>
//     </div>
//   )
// }

// interface CardType {
//   angka: string;
//   nama: string;
//   isLoding?: boolean;
//   nomor? : number
// }

// //props = angka
// //contoh props

// function Card({ angka, nama, isLoding  , nomor = 1}: CardType) {
//   // console.log('isLoding' ,angka , isLoding , nomor);
//   // console.log('ok');
//   return (
//     <div className="w-full h-10 bg-blue-500">
//       {angka} {nama}
//       <span className="text-yellow-500">{isLoding ? " sedang mengambil data" : ""}</span>
//       <span> {nomor}</span>
//     </div>
//   );
// }
