import Image from 'next/image'
import { useRef, useState, useEffect } from 'react';
import {FaEdit} from 'react-icons/fa'

export default function InstallationInCart({homeOrBusiness, cablesType, cameras, goToStep}){
    const [displayMoreDetails, setDisplayMoreDetails] = useState(false);

    const item = useRef();

    const handleClick = e => {
        if(!item.current?.contains(e.target)){
          setDisplayMoreDetails(false);
        }
      }
  
    useEffect(() => {
        document.addEventListener("mousedown", handleClick);

        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, [])

    const baseFee = (homeOrBusiness == 'home' ? 299 : 349);
    const subtotal = baseFee + (212.50 * cameras.length);

    return(
        <div
            ref={item}
            style={{height: (displayMoreDetails ? '300px' : '176px')}} 
            className={"relative flex flex-row justify-start items-center mb-3 rounded p-5 border bg-white border-gray-300 shadow overflow-hidden transition-all duration-500 ease " + (cablesType == 'pre-made' ? 'w-6/12' : 'w-8/12')}
        >
            <div 
                style={{left: '6%', top: (displayMoreDetails ? '100px' : '40px')}}
                className={"absolute flex flex-col justify-center items-center border-gray-300 transition-all duration-500 ease "}
            >
                <div className="rounded" style={{height: '86px', width: '120px'}}> 
                    <div style={{position: 'relative', maxWidth: '100%', height: '100%'}}>
                        <Image
                            src='/images/installation.png'
                            layout="fill"
                            objectFit="contain"
                            quality={100}
                        />
                    </div>
                </div>
            </div>
            <div 
                style={{left: (displayMoreDetails ? '35%' : '35%'), top: (displayMoreDetails ? '15%' : '30%')}}
                className={"absolute flex flex-col items-center transition-all duration-500 ease"}
            >
                <p className="text-center text-lg">{(homeOrBusiness == 'home' ? 'Home' : 'Business') + ' Installation'}</p>
                {!displayMoreDetails && 
                    <a onClick={e => setDisplayMoreDetails(true)} className="font-light text-green-700 cursor-pointer hover:text-green-500">See details</a>
                }
                {displayMoreDetails && 
                    <div>
                        <div className="flex justify-between w-full mt-7 mb-2 pb-3 px-2 border-b-2 border-dashed border-gray-700 border-opacity-80">
                            <span className="mr-5">Base fee</span>
                            <span>${baseFee.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between w-full mb-2 px-2">
                            <span className="mr-5">Installation fee per camera</span>
                            <span>$212.50</span>
                        </div>
                        <div className="flex justify-between w-full px-2 pb-2">
                            <span className="mr-5">Your cameras</span>
                            <span>x{cameras?.length}</span>
                        </div>
                        <div className="flex justify-between w-full pt-3 border-t border-gray-400 mt-2 px-2">
                            <span className="mr-5 font-semibold">Subtotal</span>
                            <span className="text-green-600">{subtotal.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</span>
                        </div>
                    </div>
                }
            </div>
            {!displayMoreDetails &&
            <div 
                style={{right: '14%', padding: '15px 15px 0px 0px'}}
                className={"absolute top-10 flex flex-col items-center rounded transition-all duration-500 ease"}
            >
                <p>Price:</p>
                <p className="font-normal text-green-600">{((homeOrBusiness == 'home' ? 299 : 349) + (cameras.length * 212.50)).toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</p>
            </div>}
            <span 
                onClick={e => goToStep('installation')}
                className={"absolute top-0 right-0 cursor-pointer m-2 "}
            >
                <FaEdit className="fill-current text-yellow-600 text-2xl hover:text-yellow-400"/>
            </span>
        </div>
    )
}