"use client"
import Image from "next/image"
import { FormEvent, Fragment, useState } from "react"
import { Dialog, Transition } from '@headlessui/react'
import { EmailtoProduct } from "@/lib/actions"

interface Props {
    productId: string
}


const Mod = ({ productId}: Props) => {
    let [isOpen, setIsOpen] = useState(true)
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [email, setEmail] = useState('');

    const handlesubmit = async (e: FormEvent<HTMLFormElement>) => {
         e.preventDefault();
         setIsSubmitted(true);
           
         await EmailtoProduct(productId, email)

         setIsSubmitted(false);
         setEmail('');
         closeMod()
    }
    const openMod = () => setIsOpen(true);

    const closeMod = () => setIsOpen(false);
    return (
        <>
            <button type='button' className='btn' onClick={openMod}>
                Track
            </button>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" onClose={closeMod} className="dialog-container">
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>
                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >

                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-95"
                        >
                            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                                <div className="flex flex-col">
                                    <div className="flex justify-between">
                                        <div className="p-3 border border-gray-200 rounded-10">
                                            <Image
                                                src='/track.png'
                                                alt='track'
                                                width={20}
                                                height={20}
                                            />
                                        </div>


                                        <Image
                                            src='/x-close.svg'
                                            alt='close'
                                            width={20}
                                            height={20}
                                            className="cursor-pointer"
                                            onClick={closeMod}
                                        />

                                    </div>
                                    <h4>
                                        Track the product by E-mail alert
                                    </h4>
                                    
                                    <p>
                                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum odit cumque excepturi enim repellendus, esse numquam assumenda et deserunt, itaque reprehenderit? Adipisci magnam fuga blanditiis labore, asperiores nostrum dolorem exercitationem?
                                    </p>
                                   
                                </div>
                                <form className="flex flex-col mt-5" onSubmit={handlesubmit}>
                                        <label htmlFor="email" className="test-sm font-medium text-red-700">
                                            Email Address
                                        </label>
                                        <div className="dialog-input_container">
                                           <Image
                                             src='/mail.svg'
                                             alt='email'
                                             width={20}
                                             height={20}
                                             className="cursor-pointer"
                                           />

                                           <input
                                            required
                                            type="email"
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your email address"
                                             className="dialog-input"
                                           />             
                                        </div>

                                        <button type="submit"
                                         className="dialog-btn"

                                        >
                                          {isSubmitted ? "Processing..." : "Track"}
                                        </button>

                                    </form>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>

        </>
    )

}

export default Mod
