import clsx from "clsx";
import { HtmlContext } from "next/dist/server/future/route-modules/app-page/vendored/contexts/entrypoints";
import React from "react";

//komponen input 

interface InputProps {
    isError? : boolean;
    messageError? : string;
    id : string | number;
    name : string ;
    value : string | number | undefined;
}

function InputTugas ({ isError , messageError , id ,name ,value , ...props} : InputProps & React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <section>
            <input  
            {...props}
            className={clsx(
                `w-full border rounded px-3 py-2 text-black`,
                {
                  "border-red-500": isError, 
                  "border-gray-300": !isError,
                }
              )}
            />
            {isError && <p className="text-red-500 mt-1">{messageError}</p>} 
        </section>
    )
}

export default InputTugas

