import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sessionList } from "../components/Session/SessionList";

export type sessionsType = {
    upcomingSessions: sessionList[]
}

const initialState: sessionsType = {
    upcomingSessions: []
}

const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        bookSession(state, action: PayloadAction<sessionList>) {
            state.upcomingSessions.push(action.payload)
        },
        cancelSession(state, action: PayloadAction<string>) {
            const sessionIndex = state.upcomingSessions.findIndex(({ id }) => id === action.payload);
            state.upcomingSessions.splice(sessionIndex, 1)
        }
    }

})

export const { bookSession, cancelSession } = sessionSlice.actions

export default sessionSlice;