import AppInput from "../../../ui-components/AppInput/app-input";
import SuggestionList from "../../../ui-components/SuggestionList/SuggestionList";
import InviteeList from "../../../ui-components/InviteeList/InviteeList";
import Validators, { ValidationErr } from "../../../services/app.validators";
import { useContext, useState } from "react";
import AppContext from "../../../context/app-context";
import './create-event.scss'
import { Button } from "react-bootstrap";
import { CreateEventPayload } from "../../../model/event";
const CreateEvent = (props: CreateEventProp) => {
    const ctx = useContext(AppContext);
    const EMPTY_STRING_ARRAY: string[] = [];

    const getTodayDate = () => {
        const today = new Date();
        const date = today.getDate();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        return year + '-' + month + '-' + date;
    }

    const [inviteList, setInviteList] = useState(EMPTY_STRING_ARRAY);
    const [email, setEmail] = useState('');
    const [date, setDate] = useState(getTodayDate());
    const [fromTime, setFromTime] = useState('12:00');
    const [toTime, setToTime] = useState('12:30');
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isDateValid, setIsDateValid] = useState(false);
    const [isFromTimeValid, setIsFromTimeValid] = useState(false);
    const [isToTimeValid, setisToTimeValid] = useState(false);

    const handleEmailBlur = (value: string, isValid: boolean, isTouched: boolean, hasError: ValidationErr) => {
        setEmail(value);
        setIsEmailValid(isValid);
    }
    const handleEmailChange = (value: string, isValid: boolean, isTouched: boolean, hasError: ValidationErr) => {
        setEmail(value);
        setIsEmailValid(isValid);
    }
    const handleDateBlur = (value: string, isValid: boolean, isTouched: boolean, hasError: ValidationErr) => {
        setDate(value);
        setIsDateValid(isValid);
    }
    const handleDateChange = (value: string, isValid: boolean, isTouched: boolean, hasError: ValidationErr) => {
        setDate(value);
        setIsDateValid(isValid);
    }
    const handleFromTimeBlur = (value: string, isValid: boolean, isTouched: boolean, hasError: ValidationErr) => {
        setFromTime(value);
        setIsFromTimeValid(isValid)
    }
    const handleFromTimeChange = (value: string, isValid: boolean, isTouched: boolean, hasError: ValidationErr) => {
        setFromTime(value);
        setIsFromTimeValid(isValid)
    }
    const handleToTimeBlur = (value: string, isValid: boolean, isTouched: boolean, hasError: ValidationErr) => {
        setToTime(value);
        setIsFromTimeValid(isValid);
    }
    const handleToTimeChange = (value: string, isValid: boolean, isTouched: boolean, hasError: ValidationErr) => {
        setToTime(value);
        setIsFromTimeValid(isValid);
    }

    const createEventhandler = (event:any) => {
        event.preventDefault();
        const createEventPayload : CreateEventPayload = {
            fromDate: date+'T'+fromTime,
            toDate: date+'T'+toTime,
            inviteList: inviteList.map(email => {return {email}}),
            access_token: ctx.user.userToken.access_token
        }
        props.onCreateEvent(createEventPayload);
    }

    const addInvitee = (mailFromCache?: string) => {
        if (mailFromCache) {
            if (!inviteList.includes(mailFromCache)) {
                setInviteList([...inviteList, mailFromCache]);
            }
            setEmail('')
            return;
        }
        if (isEmailValid && email) {
            if (!inviteList.includes(email)) {
                setInviteList([...inviteList, email]);
            }
            if (!ctx.attendees.includes(email)) {
                ctx.addAttendees(email);
            }
        }
        setEmail('');
    }

    const removeInvitee = (emailToRemove: string) => {
        let allMails = [...inviteList];
        allMails = allMails.filter((email: string) => email !== emailToRemove)
        setInviteList(allMails);
    }


    return (
        <form className="create-event-form" onSubmit={createEventhandler}>
            <AppInput
                label="Add Date"
                inputValue={date}
                appInputType='date'
                onAppInputBlur={handleDateBlur}
                onAppInputChange={handleDateChange}
                validators={[Validators.isRequired]}
            ></AppInput>

            <div className="time-input-section">
                <AppInput
                    label="From"
                    inputValue={fromTime}
                    appInputType='time'
                    onAppInputBlur={handleFromTimeBlur}
                    onAppInputChange={handleFromTimeChange}
                    validators={Validators.isRequired}
                ></AppInput>
                <AppInput
                    label="To"
                    inputValue={toTime}
                    appInputType='time'
                    onAppInputBlur={handleToTimeBlur}
                    onAppInputChange={handleToTimeChange}
                    validators={Validators.isRequired}
                ></AppInput>
            </div>
            <div className="attendee-section">
                <div className="attendee-input-section">
                    <AppInput
                        label="Add Email"
                        inputValue={email}
                        appInputType='text'
                        onAppInputBlur={handleEmailBlur}
                        onAppInputChange={handleEmailChange}
                        validators={Validators.email}
                    ></AppInput>
                    <Button variant="primary" type="button" onClick={() => addInvitee()}>+</Button>
                </div>
                <InviteeList inviteList={inviteList} removeInvitee={(emailToRemove: string) => removeInvitee(emailToRemove)} />
                <SuggestionList
                    searchText={email}
                    allValue={ctx.attendees}
                    selectedValues={inviteList}
                    onValueSelect={(email: string) => { addInvitee(email) }} />

            </div>
            <Button variant="primary" type="submit">Create Event</Button>
        </form>

    )
}

interface CreateEventProp{
    onCreateEvent: Function
}

export default CreateEvent;