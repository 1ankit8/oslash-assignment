export interface CreateEventPayload{
    fromDate: string;
    toDate: string;
    access_token: string,
    inviteList: {email:string}[];

}