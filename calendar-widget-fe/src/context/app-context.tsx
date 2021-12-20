import React, { useState } from "react";
import { User, EMPTY_USER } from "../model/user";
let initialUser: User;
const EMPTY_STRING_ARRAY: string[] = [];
const AppContext = React.createContext({
    user: { ...EMPTY_USER },
    attendees: EMPTY_STRING_ARRAY,
    setUserDetails: (user: User) => { },
    logoutUser: () => { },
    getAllAttendees: () => { },
    addAttendees: (attendeeEmail: string) => { },
    removeAttendees: (attendeeEmail: string) => { }

});

export const AppContextProvider = (props: React.PropsWithChildren<React.ReactNode>) => {
    const [user, setUser] = useState(initialUser);

    const getAttendeesFromStore = (): string[] => {

        const attendeesFromStore = localStorage.getItem('attendees') || '';

        return attendeesFromStore ? JSON.parse(attendeesFromStore) : [];
    }

    const [attendees, setAttendees] = useState(getAttendeesFromStore())

    const setUserDetails = (user: User) => {
        localStorage.setItem('token', JSON.stringify(user.userToken));
        localStorage.setItem('profile', JSON.stringify(user.userProfile));
        setUser(user);
    }
    const logoutUser = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('profile');
        setUser({ ...EMPTY_USER });
    }

    const addAttendees = (attendeeEmail: string) => {
        if (!attendees.includes(attendeeEmail)) {
            setAttendees([...attendees, attendeeEmail]);
            localStorage.setItem('attendees', JSON.stringify(attendees))
        }
    }
    const removeAttendees = (attendeeEmail: string) => {
        if (attendees.includes(attendeeEmail)) {
            setAttendees(attendees.filter((attendee) => attendee !== attendeeEmail));
            localStorage.setItem('attendees', JSON.stringify(attendees))
        }
    }

    const getAllAttendees = () => [...attendees]
    return <AppContext.Provider
        value={
            {
                user: user,
                attendees,
                setUserDetails,
                logoutUser,
                getAllAttendees,
                addAttendees,
                removeAttendees
            }
        }>
        {props.children}
    </AppContext.Provider>
}

export default AppContext;