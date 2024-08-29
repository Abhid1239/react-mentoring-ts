import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { type sessionList } from './SessionList';
import Modal, { type ModalHandle } from '../UI/Modal';
import Input from '../UI/Input';
import Button from '../UI/Button';
import { useDispatch } from 'react-redux';
import { bookSession } from '../../store/sessionSlice';
import UpcomingSession from './UpcomingSession';
import { useSessionContext } from '../../store/StoreProvider';

type bookingProps = {
    session: sessionList;
    onDone: () => void;
}

function BookingSession({ session, onDone }: bookingProps) {
    // const dispatch = useDispatch()
    const { addSession } = useSessionContext();
    const modalRef = useRef<ModalHandle>(null);


    useEffect(() => {
        if (modalRef.current)
            modalRef.current.open()
    }, [])

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {

        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData);
        addSession(session)
        onDone();
    }

    return (
        <Modal onClose={onDone} ref={modalRef}>
            <h2>
                Book Session
            </h2>
            <form onSubmit={handleSubmit}>
                <Input placeholder='name...' id='name' label='Your Name' type='text' />
                <Input placeholder='email...' id='email' label='Your email' type='email' />
                <p className="actions">
                    <Button type='button' textOnly onClick={onDone}>
                        Cancel
                    </Button>
                    <Button>
                        Book Session
                    </Button>
                </p>
            </form>
        </Modal>
    )
}

export default BookingSession