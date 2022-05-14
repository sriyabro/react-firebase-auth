import { Facebook, Google } from "@mui/icons-material";
import Button from "@mui/material/Button";
import React from "react";
import "./App.css";
import { signInWithProvider } from "./config/firebase.config";
import { AuthProviders } from "./constants/providers.enum";

const App = () => {
  return (
    <>
      <Button
        variant="outlined"
        startIcon={<Google />}
        onClick={() => signInWithProvider(AuthProviders.Google)}
      >
        Sign in with Google
      </Button>
      <Button
        variant="outlined"
        startIcon={<Facebook />}
        onClick={() => signInWithProvider(AuthProviders.Facebook)}
      >
        Sign in with Facebook
      </Button>
    </>
  );
};

export default App;
