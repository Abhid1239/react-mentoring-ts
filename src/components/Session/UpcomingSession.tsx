import { useEffect, useRef } from "react"
import Modal, { type ModalHandle } from "../UI/Modal"
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "../../store/store";
import { type sessionList } from "./SessionList";
import Button from "../UI/Button";
import { cancelSession } from "../../store/sessionSlice";


function UpcomingSessionItem({ id, title, summary, date, onCancel, ...props }: sessionList & { onCancel: () => void }) {

    return (
        <article className="upcoming-session">
            <div>
                <h3>{title}</h3>
                <p>{summary}</p>
                <time dateTime={new Date(date).toISOString()}>
                    {new Date(date).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                    })}
                </time>
            </div>
            <p className="actions">
                <Button textOnly onClick={onCancel}>
                    Cancel
                </Button>
            </p>
        </article>
    )
}
function UpcomingSession({ onDone }: { onDone: () => void }) {
    const { upcomingSessions } = useSelector((state: rootState) => state.session)
    const modalRef = useRef<ModalHandle>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (modalRef.current) modalRef.current.open()
    }, [])
    return (
        <Modal onClose={onDone} ref={modalRef}>
            <h2>
                UpcomingSession
            </h2>
            {upcomingSessions.length > 0 && (
                <ul>
                    {upcomingSessions.map(session => (
                        <li key={session.id}>
                            <UpcomingSessionItem {...session} onCancel={() => dispatch(cancelSession(session.id))} />
                        </li>
                    ))}
                </ul>)}
            {!upcomingSessions && <p>No upcoming sessions.</p>}
            <p className="action">
                <Button onClick={onDone}>
                    Close
                </Button>
            </p>
        </Modal>
    )
}

export default UpcomingSession