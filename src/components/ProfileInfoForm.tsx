'use client';

import { saveProfile } from "@/actions/profileInfoActions";
import UploadButton from "./UploadButton";
import { useState } from "react";
import { ProfileInfo } from "@/models/ProfileInfo";
import Image from "next/image";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { signOut } from "next-auth/react";

type Props = {
    profileInfo:ProfileInfo|null;
}; 

export default function ProfileInfoForm({profileInfo}: Props){

    const [coverUrl, setCoverUrl] = useState(profileInfo?.coverUrl); 
    const [avatarUrl, setAvatarUrl] = useState(profileInfo?.avatarUrl); 

    async function handleFormAction(formData: FormData){
        //const savePromise = new Promise<void>(async (resolve, reject) => {
             await saveProfile(formData);
             toast.success('Profile saved! ')
            //resolve();
       // });
        //await  toast.promise(
          //  savePromise,
           // {
                //loading: 'Saving...',
                //success: <b>Profile saved!</b>,
                //error: <b>Could not save.</b>,
           // }
        //);
    }
    
    return(
        <form action={handleFormAction}>
            <div className="relative border bg-gray-100 rounded-lg h-48 mb-4">
                <Image 
                    src={coverUrl || ''} 
                    alt="cover image"
                    width={1024}
                    height={1024}
                    className="w-full h-48 object-cover object-center rounded-lg"
                />
                <div className="absolute left-4 -bottom-4 z-10 border bg-gray-100 size-24 rounded-lg">
                    <div className="rounded-lg size-24 overflow-hidden">
                        <Image 
                            src={avatarUrl || ''} 
                            alt="avatar" 
                            width={120} 
                            height={120}
                        />
                    </div>
                    <div className="absolute -bottom-2 -right-2">
                        <UploadButton onUploadComplete={setAvatarUrl}/>
                    </div>
                    <input type="hidden" name="avatarUrl" value={avatarUrl}/>
                </div>
                <div className="absolute right-2 bottom-2">
                    <UploadButton onUploadComplete={setCoverUrl}/>
                    <input type="hidden" name="coverUrl" value={coverUrl}/> 
                </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
                <div>
                    <label className="input-label" htmlFor="usernameIn">username</label>
                    <input 
                        defaultValue={profileInfo?.username} 
                        name="username" 
                        id="usernameIn" 
                        type="text" 
                        placeholder="username" 
                    />
                </div>
                <div>
                    <label className="input-label" htmlFor="displayNameIn">display name</label>
                    <input 
                        defaultValue={profileInfo?.displayName} 
                        name="displayName" 
                        id="displayNameIn" 
                        type="text" 
                        placeholder="display name" 
                    />
                </div>
            </div>
            
            <div>
                <label className="input-label" htmlFor="bioIn">bio</label>
                <textarea defaultValue={profileInfo?.bio} name="bio" id="bioIn"placeholder="bio"></textarea>
            </div>
            <div>
                <button className="mt-4 bg-yellow-300 px-4 py-2 rounded-lg flex gap-1 items-center">
                    <FontAwesomeIcon icon={faSave}/>
                    Save profile 
                </button>
                <button 
                    className="mt-4 bg-gray-200 border border-gray-3 00 px-4 py-2 rounded-lg flex gap-1 items-center"
                    onClick={()=>signOut()} 
                    type="button" 
                >
                    Logout
                </button>
            </div>
        </form>
    )
}