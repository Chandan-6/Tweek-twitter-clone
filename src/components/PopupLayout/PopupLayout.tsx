"use client";

import { MouseEvent, ReactNode, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";

interface PopupLayoutProps {
    onClose: () => void;
    children: ReactNode;
}

export default function PopupLayout(props : PopupLayoutProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    const closeModal = (e: MouseEvent) => {
        if (modalRef.current === e.target) {
            props.onClose();
        }
    };

    return (
        <div
            ref={modalRef}
            onClick={(e) => closeModal(e)}
            className="fixed inset-0 bg-blue-200 bg-opacity-30 backdrop-blur-sm py-7 flex justify-center items-center select-none z-[100]"
        >
            {props.children}
            <Toaster/>
        </div>
    )
}