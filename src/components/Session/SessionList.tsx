import SessionItem from "./SessionItem";

export type sessionList = {
    id: string;
    title: string;
    summary: string;
    description: string;
    duration: number;
    date: string;
    image: string;
}
type SessionListProps = {
    sessions: sessionList[]
}

function SessionList({ sessions }: SessionListProps) {
    return (
        <ul id='sessions-list'>
            {
                sessions.map(session => (
                    <li className='session-item' key={session.id}>
                        <SessionItem {...session} />
                    </li>
                ))
            }
        </ul>
    )
}

export default SessionList