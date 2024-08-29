import { createContext, ReactNode, useContext, useReducer } from "react";
import { sessionList } from "../components/Session/SessionList";

type SessionProviderTypes = {
  children: ReactNode;
};

type SessionCtxTypes = {
  upcomingSessions: sessionList[];
  addSession: (session: sessionList) => void;
  removeSession: (sessionId: string) => void;
}

const SessionContext = createContext<SessionCtxTypes | null>(null);

export const useSessionContext = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("SessionContext Not initialized")
  }
  return context;

}

type sessionStateType = {
  upcomingSessions: sessionList[];
}
const initialState: sessionStateType = {
  upcomingSessions: [],
}


type addSessiontype = {
  type: "addSession";
  session: sessionList;
}

type removeSessiontype = {
  type: "removeSession";
  sessionId: string;
}

type sessionActionType = addSessiontype | removeSessiontype;

const sessionReducer = (state: sessionStateType, action: sessionActionType) => {
  switch (action.type) {
    case "addSession":
      state.upcomingSessions.push(action.session);
      break;
    case "removeSession":
      state.upcomingSessions.filter(session => session.id !== action.sessionId);
      break;
  }

  return state;
}

const SessionProvider = ({ children }: SessionProviderTypes) => {

  const [sessionState, disptach] = useReducer(sessionReducer, initialState)
  const ctx: SessionCtxTypes = {
    upcomingSessions: sessionState.upcomingSessions,
    addSession: (session: sessionList) => {
      disptach({
        type: "addSession",
        session
      })
    },
    removeSession: (sessionId: string) => {
      disptach({
        type: "removeSession",
        sessionId
      })
    }
  };
  return (
    <SessionContext.Provider value={ctx}> {children}</SessionContext.Provider >
  );
};

export default SessionProvider;
