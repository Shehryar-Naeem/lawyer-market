import React from "react";
import { FloatingLabel, Flowbite } from "flowbite-react";
const InputComp = ({ text, type, name, register }) => {
  const customeTheme = {
    floatingLabel: {
      input: {
        default: {
          outlined: {
            sm: "peer block relative w-full appearance-none md:rounded-sm rounded-xs md:border-2 border-1 border-gray-slate focus:border-gray-600 md:focus:ring-gray-200 md:focus:ring-4 focus:ring-0 lg:text-xl md:text-base text-sm md:p-1 p-sm-ly-pad placeholder-gray-400 md:text-base text-sm focus:text-black",
          },
        
        },
      },
      label: {
        default: {
          outlined: {
            sm: "absolute left-0 top-0 transform -translate-y-2/4 md:mx-1 mx-sm md:px-1 px-4xl bg-white lg:text-xl md:font-bold md:text-base text-sm text-gray-400 scale-0 transition-all peer-focus:-translate-y-2/4 peer-focus:top-0 peer-focus:text-gray-500 peer-focus:shadow-none md:peer-focus:text-base peer-focus:text-sm md:peer-focus:font-bold peer-focus:font-normal z-10 scale-75 peer-focus:scale-100 duration-300 md:peer-focus:mx-4  peer-placeholder-shown:top-2/4 peer-placeholder-shown:-translate-y-2/4 peer-placeholder-shown:scale-100",
            

          },
        },
      },
      helperText: {
        "default": "mt-2 text-xs text-gray-600 dark:text-gray-400",
       
      }
    },
  };
  
  return (
    <Flowbite
      theme={{ theme: customeTheme }}
    >
      <div className="relative">
        <FloatingLabel
          variant="outlined"
          // placeholder={`${name}...`}
          label={text.charAt(0).toUpperCase() + text.slice(1)}
          name={name}
          type={type}
          {...register(name)}
          sizing={"sm"}
        />
      </div>
    </Flowbite>
  );
};

export default InputComp;
