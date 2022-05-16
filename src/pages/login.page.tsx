import { AuthErrorCodes } from "firebase/auth";
import { useState } from "react";
import { Facebook, Google } from "../assets/svgs";
import { signInWithProvider } from "../config/firebase.config";
import { AuthProviders } from "../constants/providers.enum";

const LoginPage = () => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [authenticating, setAuthenticating] = useState(false);

  const onLoginWithProviderButtonClicked = (provider: AuthProviders) => {
    setAuthenticating(true);
    setErrorMsg(null);

    signInWithProvider(provider)
      ?.then((result) => {
        setAuthenticating(false);
        console.log(result);
      })
      .catch((err) => {
        setAuthenticating(false);
        let errMsg;
        switch (err.code) {
          case AuthErrorCodes.POPUP_CLOSED_BY_USER:
            errMsg = "Authentication popup closed by user";
            break;

          default:
            errMsg = "Authentication error. Please try again later ! - ";
            errMsg += "ERROR_CODE: " + err.code;
        }
        setErrorMsg(errMsg);
      });
  };

  return (
    <div className="bg-modal">
      <div className="modal-content">
        <button
          type="button"
          className="login-btn btn btn-outline-primary"
          onClick={() => onLoginWithProviderButtonClicked(AuthProviders.Google)}
          disabled={authenticating}
        >
          <Google width={20} height={20} className="mx-2" /> Sign in with Google
        </button>
        <button
          type="button"
          className="login-btn btn btn-outline-primary my-2"
          onClick={() => onLoginWithProviderButtonClicked(AuthProviders.Facebook)}
          disabled={authenticating}
        >
          <Facebook width={20} height={20} className="mx-2" /> Sign in with Facebook
        </button>
        <small className="pt-2 text-danger text-center">
          {authenticating ? "Authenticating..." : errorMsg}
        </small>
      </div>
    </div>
  );
};

export default LoginPage;
