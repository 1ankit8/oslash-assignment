import { useContext } from "react";
import { Button } from "react-bootstrap";
import './Login.scss'   
import { useGoogleLogin } from "react-google-login";
import AppContext from "../../context/app-context";
import { CLIENT_ID, SINGLE_HOST_ORIGIN, GOOGLE_LOGIN_SCOPE } from "../../model/app.const";

const Login = () => {
    const ctx = useContext(AppContext);

    const { signIn, loaded } = useGoogleLogin({
        clientId: CLIENT_ID,
        onSuccess: (res) => { loginSuccessHandler(res) },
        onFailure: (err) => { loginFailureHandler(err) },
        cookiePolicy: SINGLE_HOST_ORIGIN,
        scope: GOOGLE_LOGIN_SCOPE
    })

    const loginSuccessHandler = (authResponse: any) => {
        // const res: GoogleLoginResponse = authResponse;
        ctx.setUserDetails({ userProfile: authResponse.profileObj, userToken: authResponse.tokenObj })
    }

    const loginFailureHandler = (err: any) => {
        console.log(err)
    }

    return (
        <Button variant="primary" className="google-login-button" onClick={signIn}>
            Login
        </Button>
    )
}



export default Login;