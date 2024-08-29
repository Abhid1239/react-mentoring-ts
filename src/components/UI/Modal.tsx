import { ComponentPropsWithoutRef, forwardRef, ReactNode, useImperativeHandle, useRef } from 'react'
import { createPortal } from 'react-dom';

type ModalProps = {
    onClose: () => void;
    children: ReactNode
} & ComponentPropsWithoutRef<"dialog">

export type ModalHandle = {
    open: () => void;
}

const Modal = forwardRef<ModalHandle, ModalProps>(function Modal({ onClose, children }, ref) {
    const dailogRef = useRef<HTMLDialogElement>(null);

    useImperativeHandle(ref, () => ({
        open: () => {
            if (dailogRef.current) {
                dailogRef.current.showModal();
            }
        }
    }))

    return createPortal(
        <dialog className='modal' ref={dailogRef} onClose={onClose}>
            {children}
        </dialog>
        , document.getElementById('modal-root')!)
})

export default Modal