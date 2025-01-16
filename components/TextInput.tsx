import clsx from "clsx";
interface InputProps {
    iserror? : boolean,
    ukuran? : string,
    messageError? : string
}

function InputText({
    iserror = false,
    ukuran = "sm",
    messageError = "wajib diisi",
    ...props
    
}: InputProps & React.InputHTMLAttributes<HTMLInputElement>){
    return (
        <section>
            <input className={clsx(`w-full h-8 border rounded px-2`, {
          "border-red-500 border-2": iserror,  
          "border-gray-700": !iserror,
          "text-sm h-8": ukuran === "sm",
          "text-sm h-16": ukuran === "md",
          "text-sm h-32": ukuran === "lg",
        })}
        {...props}/>
            {iserror ? <p className=" text-yellow-500">{messageError}</p> : <></>}
        </section>
    )
}

export default InputText