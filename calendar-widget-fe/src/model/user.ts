export interface User {
    userProfile: UserProfile,
    userToken: UserToken
}

export interface UserToken {
    access_token: string,
    expires_at: number,
    expires_in: number,
    first_issued_at: number,
    id_token: string,
    idpId: string,
    login_hint: string,
    scope: string
}

export interface UserProfile {
    email: string,
    familyName: string,
    givenName: string,
    googleId: string,
    imageUrl: string,
    name: string
}

export const EMPTY_USER: User = {
    userProfile: {
        email: '',
        familyName: '',
        givenName: '',
        googleId: '',
        imageUrl: '',
        name: ''
    },
    userToken: {
        access_token:'',
        expires_at:-1,
        expires_in:-1,
        first_issued_at:-1,
        id_token:'',
        idpId:'',
        login_hint:'',
        scope:''
    }
} 