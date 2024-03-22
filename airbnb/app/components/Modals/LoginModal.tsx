
"use client";

import useRegisterModal from "@/app/hooks/useRegisterModel";
import axios from "axios";
import { error } from "console";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../Inputs/Input";
import toast from "react-hot-toast";
import Button from "../Button";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import useLoginModal from "@/app/hooks/useLoginModel";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginModal=()=> {
    const registerModal=useRegisterModal();
    const LoginModal=useLoginModal();
    const [isLoading,setIsLoading]=useState(false);
    const router=useRouter();

    const {
        register,
        handleSubmit,
        formState : {
            errors,
        }
    } =useForm<FieldValues>({
        defaultValues : {
            email : '',
            password : ''
        }
    });

    const onSubmit:SubmitHandler<FieldValues> =(data)=> {
        setIsLoading(true);
        signIn('credentials',{
            ...data,
           redirect :false
        })
          .then((callback)=> {
                setIsLoading(false); 
                if(callback?.ok) {
                    toast.success('logged in');
                    router.refresh();
                    LoginModal.onClose();    
                  if(callback?.error) {
                    toast.error(callback.error)
                  }  
                }          
          })

  
    }
    const bodyContent=(
      <div className="flex flex-col gap-4">
          <Heading  title="Welcome Back" subtitle="Login to your Acccout" />
          <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required/>
          <Input id="password" label="Password" type="password" disabled={isLoading} register={register} errors={errors} required/>

      </div>
    );
    const footerContent=(
      <div className="flex flex-col gap-4 mt-3">
         <hr/>
          <Button outline label="Continue with Google"
            icon={FcGoogle}
            onClick={()=> {}}
            />
          <Button outline label="Continue with Github"
            icon={AiFillGithub}
            onClick={()=> {}}
            />   
          <div className="text-neutral-500 text-center mt-4 font-light">
            <div className="justify-center flex flex-row items-center gap-2">
             <div>
                Already have an account?
             </div>
             <div
              onClick={registerModal.onClose}
             className="text-neutral-800 cursor-pointer hover:underline ">
                Log in
             </div>
            </div> 
          </div>         
      </div>
    )
    return (
         <Modal  disabled={isLoading}
           isOpen={LoginModal.isOpen}
           title="Login"
           actionLabel="Continue"
           onClose={LoginModal.onClose}
           onSubmit={handleSubmit(onSubmit)}
           body={bodyContent}
           footer={footerContent}
         />
        )
}

export default LoginModal