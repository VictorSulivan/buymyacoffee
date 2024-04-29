'use client';

import { createDonation } from "@/actions/donationsActions";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";



export default function DonationForm ({email}:{email:string }):JSX.Element{
    const [numberInValue, setNumberInValue] = useState('');
    const [crypto, setCrypto] = useState('btc');
    const [amount, setAmount] = useState(1);

    useEffect(():void=>{
        if(numberInValue){
            const intValue = parseInt(numberInValue);
            if(intValue>5 && intValue<=100){
                setAmount(intValue);
            } else if(intValue === 1 || intValue === 3 || intValue === 5){
                setAmount(intValue);
            }else {
                setAmount(1);
            }
        }
    },[numberInValue])
    async function handleFormSubmit(formData: FormData) {
        formData.set('amount', amount.toString());
        formData.set('crypto', crypto);
        formData.set('email', email);
        const url = await createDonation(formData);
        if(!url){
            return;
        }
        if(url && window && window.location){
            window.location.href = url;
        }

    }
    return(
        <form action={handleFormSubmit}>
            <div className="border border-yellow-300 bg-yellow-300/10 rounded-xl p-4 flex gap-2 items-center">
                <FontAwesomeIcon icon={faCoffee}/>
                <span>x</span>
                <button 
                    type="button"
                    onClick={()=>{setAmount(1); setNumberInValue('1')}}
                    className={"amount "+ (amount === 1 ? 'active' : '')}
                >
                    1
                </button>
                <button 
                    type="button" 
                    onClick={()=>{setAmount(3); setNumberInValue('3')}}
                    className={"amount "+ (amount === 3 ? 'active' : '')}
                >
                    3
                </button>
                <button 
                    type="button" 
                    onClick={()=>{setAmount(5); setNumberInValue('5')}}
                    className={"amount "+ (amount === 5 ? 'active' : '')}
                >
                    5
                </button>
                <input 
                    type="number" 
                    placeholder="10" 
                    value={numberInValue} 
                    onChange={ev=>setNumberInValue(ev.target.value)}
                    className="w-12 h-12 border border-yellow-300 rounded-xl text-center"
                />
            </div>
            <div className="mt-2">
                <input name="name" type="text" placeholder="Your name" />
            </div>
            <div className="mt-2">
                <textarea name="message" id="" placeholder="Say something nice "></textarea>
            </div>
            <div className="mt-2">
                <h3 className="text-xs text-gray-500 mb-1">pay with selected crypto or with cc</h3>
                <div className="flex gap-1">
                    <button 
                        type="button" 
                        className={"crypto "+ (crypto === "btc" ? 'active' : '')} 
                        onClick={()=>setCrypto("btc")}
                    >
                        <span>BTC</span>
                        <p>BITCOIN</p>
                    </button>
                    <button 
                        type="button" 
                        className={"crypto "+ (crypto === "eth" ? 'active' : '')} 
                        onClick={()=>setCrypto("eth")}
                    >
                        <span>ETH</span>
                        <p>Ethereum</p>    
                    </button>      
                    <button 
                        type="button" 
                        className={"crypto "+ (crypto === "ltc" ? 'active' : '')} 
                        onClick={()=>setCrypto("ltc")}
                    >
                        <span>LTC</span>
                        <p>Litecoin</p>    
                    </button>   
                </div>
            </div>
            <div className="mt-2">
                <button className="bg-yellow-300 w-full  rounded-xl py-2 font-semibold">
                    Support ${amount * 5}
                </button>            
            </div>
         </form>
    )
}