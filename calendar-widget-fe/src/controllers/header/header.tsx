import { useContext } from "react";
import './header.scss';
import { useGoogleLogout } from "react-google-login";
import AppContext from "../../context/app-context";
import { CLIENT_ID } from "../../model/app.const";
const Header = () => {
    const ctx = useContext(AppContext);
    const user = ctx.user.userProfile;
    const onLogoutFaiure = (err: any) => {
        console.log('[Err] failed to logout')
    }

    const onLogoutSuccess = () => {
        ctx.logoutUser();
    }

    const { signOut, loaded } = useGoogleLogout({
        clientId: CLIENT_ID,
        onLogoutSuccess: onLogoutSuccess
    })

    return (
        <div className="header">
            <h3>Google Event Creator</h3>
            <div className="user-detail">
                <img src={user.imageUrl}></img>
                <div className="user-info">
                    <span>Welcome {user.givenName}</span>
                    <h5 onClick={signOut}>Logout</h5>
                </div>
            </div>
        </div>
    )
}

export default Header;