import "./SuggestionList.scss";
const SuggestionList = (props: SuggestionListProps) => {
    const isSelected = (email: string): boolean => props.selectedValues.includes(email)
    const allInvites = props.allValue.map((email: string, index: number) => {
        const matchingMails = email.indexOf(props.searchText) >= 0;
        return (matchingMails && props.searchText) ? <div
            key={index}
            className={isSelected(email) ? 'invitee selected' : 'invitee'}
            onClick={() => props.onValueSelect(email)}
        >{email}</div> : null;
    })
    return (
        <div className="invite-suggestions">
            {allInvites}
        </div>
    )
}

interface SuggestionListProps {
    searchText: string,
    allValue: string[],
    selectedValues: string[],
    onValueSelect: Function
}

export default SuggestionList;