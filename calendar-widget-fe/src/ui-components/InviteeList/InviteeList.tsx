import { Button } from "react-bootstrap";
import "./InviteeList.scss";
const InviteeList = (props: InviteeListProps) => {
    const getInviteList = () => {
        return props.inviteList.map((email: string, index: number) => {
            return <div key={index} className="invitee">
                {email}
                <Button className="remove-invitee-button" variant="danger" onClick={(evt) => {evt.preventDefault(); props.removeInvitee(email)}}>X</Button>
            </div>
        })
    }
    return (
        <div className="inviteList">
            {getInviteList()}
        </div>
    )
}
interface InviteeListProps {
    inviteList: string[],
    removeInvitee: Function
}
export default InviteeList