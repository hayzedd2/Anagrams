"use client"
import { motion } from "framer-motion"


const toast = (toastMessage: string, toastType: "success" | "error") => {
    const toastVariants = {
        initial: {
            y: 0,
            opacity: 0
        },
        animate: {
            y: 200,
            opacity: 1
        },
        exit: {
            opacity: 0
        }
    }
    return (
        <motion.div initial="initial" animate="animate" exit="exit" className="absolute  bottom-0 h-[20rem] bg-red-800">
            <p>{toastMessage}</p>


        </motion.div>
    )
}

export default toast