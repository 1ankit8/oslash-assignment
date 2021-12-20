import { Button } from "react-bootstrap";
import './event-details.scss';
const EventDetails = (props: EventDetailsProps) => {
    return (
        <div className="event-details">
            <div className="copy-link-section">
                <Button
                    variant="link"
                    onClick={() => { navigator.clipboard.writeText(props.confURL) }}
                >Copy</Button> link here
            </div>
            <span className="or-text">or</span>
            <div className="open-link-section">
                <Button
                    variant="link"
                    onClick={() => { window.open(props.confURL, '_blank') }}
                >Click here</Button> to open meeting now
            </div>
            <Button
                className="new-event-button"
                variant="link"
                onClick={() => props.resetForm()}
            >Create New Event</Button>
        </div>
    )
}

interface EventDetailsProps {
    confURL: string;
    resetForm: Function;
}

export default EventDetails;