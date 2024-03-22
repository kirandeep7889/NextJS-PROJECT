"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import RegisterModal from "../Modals/RegisterModal";
import useRegisterModal from "@/app/hooks/useRegisterModel";
import LoginModal from "../Modals/LoginModal";
import useLoginModal from "@/app/hooks/useLoginModel";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";

interface UserMenuProps {
    currentUser?: User | null;
}

const UserMenu:React.FC<UserMenuProps>=({
    currentUser
})=> {
    const registerModal=useRegisterModal();
    const LoginModal=useLoginModal();
    const [isOpen,setIsOpen]=useState(false);

    const toogleOpen=useCallback(()=>{
        setIsOpen((value)=>!value);
    },[])

    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                 <div onClick={()=>{}}
                  className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
                 >
                    Airbnb your home
                 </div>
                 <div
                 onClick={toogleOpen}
                   className="p-4 md:py-1 md:px-2 border-[1px] flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
                 >
                    <AiOutlineMenu/>
                    <div className="hidden md:block">
                         <Avatar/>
                    </div>
                 </div>
                 {isOpen && (
                    <div  className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm " >
                        <div className="flex flex-col cursor-pointer">
                           { currentUser ? 
                           <>
                              <MenuItem 
                                onClick={()=> {}}
                                label="My trips"/>
                              <MenuItem 
                                onClick={()=> {}}
                                label="My Favourites"/>  
                                <MenuItem
                                  onClick={()=> {}}
                                  label="My Reservations"
                                />
                                <MenuItem
                                  onClick={()=> {}}
                                  label="My properties"
                                />                                                                                               
                              <MenuItem 
                                onClick={()=> {}}
                                label="Airbnb my home"/>   
                                <MenuItem 
                                  onClick={()=> {signOut()}}
                                  label="Logout"
                                />                        
                           </>
                           : (
                            <>
                              <MenuItem 
                                onClick={LoginModal.onOpen}
                                label="Login"/>
                                <MenuItem 
                                    onClick={registerModal.onOpen}
                                label="Signup"/>
                            </>
                           )}
                        </div>
                    </div>
                 )
                 }
            </div>
        </div>
    )
}

export default UserMenu;