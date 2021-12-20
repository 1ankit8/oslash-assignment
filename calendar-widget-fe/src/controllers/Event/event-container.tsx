import axios from "axios";
import { Fragment, useState } from "react";
import { Spinner } from "react-bootstrap";
import { CreateEventPayload } from "../../model/event";
import CreateEvent from "../Event/CreateEvent/create-event";
import EventDetails from "../Event/EventDetails/event-details";
import './event-container.scss';

const EventContainer = () => {
    const [eventLink, setEventLink] = useState('');
    const [loadingEvent, setLoadingEvent] = useState(false);
    let resetFormOnIdle: any;
    const createEventHandler = (payload: CreateEventPayload) => {
        setLoadingEvent(true);
        axios.post('http://localhost:4000/api/createTokens', payload).then(
            res => {
                const { hangoutLink } = res.data;
                setEventLink(hangoutLink);
                resetFormOnIdle = setInterval(() => setEventLink(''), 10 * 1000);
                setLoadingEvent(false);
            }
        ).catch(
            err => {
                setEventLink('');
                resetFormOnIdle.clearInterval();
                console.log(err)
                setLoadingEvent(false);
            }
        )
    }

    const resetForm = () => {
        setEventLink('');
        resetFormOnIdle.clearInterval();
    }

    return (
        <Fragment>
            {
                loadingEvent &&
                <Spinner animation="border" role="status" className="event-spinner">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            }
            {(eventLink && !loadingEvent) && <EventDetails confURL={eventLink} resetForm={() => resetForm} />}
            {(!eventLink && !loadingEvent) && <CreateEvent onCreateEvent={(eventPayload: CreateEventPayload) => createEventHandler(eventPayload)} />}
        </Fragment>
    )
}

export default EventContainer;