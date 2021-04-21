import Image from "next/image";
import React from "react";
import {FaTrashAlt} from 'react-icons/fa'

export default function DiscountsModal({confirmDelete}) {
  const [showModal, setShowModal] = React.useState(true);
  return (
    <>
        {showModal ? (
        <>
          <div
            transition-style="fade:in:faster"
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid rounded-t">
                  <h3 className="text-3xl font-semibold ml-2">
                    Discounts Available
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div style={{minHeight: '400px', maxWidth: '700px'}} className="relative p-6">
                    <div className="my-4 mx-3 text-xl flex flex-col items-center">
                        <p className="text-xl mb-10">Big discounts at checkout! We have generated a discount based on your selections.</p>
                        
                        <Image src="/images/discounts.jpg" width={600} height={300} />

                        <div className="text-lg mt-7 text-center"><span className="text-green-600 text-2xl font-light mr-2">&#8594;</span>Head over to our checkout page to apply the discount</div>
                    </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-center p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-gray-700 background-transparent font-bold uppercase px-6 py-2 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:bg-gray-100 mr-5 focus:ring focus:ring-green-300 focus:ring-opacity-80"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Continue reviewing system
                  </button>
                  <button
                    className="bg-green-600 text-white active:bg-green-600 font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-80 hover:bg-green-500"
                    type="button"
                    onClick={() => {setShowModal(false)}}
                  >
                    Proceed to checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black animate-gray"></div>
        </>
      ) : null}
    </>
  );
}