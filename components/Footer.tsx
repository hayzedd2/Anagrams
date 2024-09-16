import React from 'react'
import { GoArrowUpRight } from "react-icons/go";

const Footer = () => {
    return (
        <div className='w-full flex justify-end px-3'>
            <div className="flex gap-2">
                <a href="https://alhameen.vercel.app" target='_blank' className='text-[0.85rem] flex items-center gap-[0.15rem] font-[500] underline underline-offset-2 opacity-85'>Built by alhameen <GoArrowUpRight /></a>
            </div>
        </div>
    )
}

export default Footer