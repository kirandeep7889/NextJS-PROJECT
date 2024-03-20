"use client";

import useRegisterModal from "@/app/hooks/useRegisterModel";
import axios from "axios";
import { error } from "console";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";

const RegisterModal=()=> {
    const registerModal=useRegisterModal();
    const [isLoading,setIsLoading]=useState(false);

    const {
        register,
        handleSubmit,
        formState : {
            errors,
        }
    } =useForm<FieldValues>({
        defaultValues : {
            name : '',
            email : '',
            password : ''
        }
    });

    const onSubmit:SubmitHandler<FieldValues> =(data)=> {
        setIsLoading(true);
        axios.post('/api/register',data)
          .then(()=> {
            registerModal.onClose()
          })
          .catch((error)=> {
            console.log(error)
          })
          .finally (()=> {
            setIsLoading(false)
          })

          const bodyContent= (
            <div className="flex-flex-col gap-4">
                
            </div>
          )
    }
    return (
         <Modal  disabled={isLoading}
           isOpen={registerModal.isOpen}
           title="Register"
           actionLabel="Continue"
           onClose={registerModal.onClose}
           onSubmit={handleSubmit(onSubmit)}
           body={bodyContent}
         />
        )
}

export default RegisterModal