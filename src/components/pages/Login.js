import { useRef, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import FormRedirect from "../Forms/FormRedirect";
import FormSubmitButton from "../Forms/FormSubmitButton";
import FormContainer from "./../Forms/FormContainer";
import FormHeader from "./../Forms/FormHeader";
import FormInput from "./../Forms/FormInput";
import ThisForm from "./../Forms/ThisForm";
import { userActions } from "../../store/slices/user";
import Loading from "../Loading";

function Login() {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmitLogin() {
    setIsLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );

      // Signed in
      dispatch(
        userActions.setCurrentUser({
          currentUser: JSON.parse(JSON.stringify(userCredential.user)),
        })
      );
      navigate("/");
    } catch (error) {
      const errorMessage = error.message;
      const formattedError = errorMessage.split("(")[1].split(")")[0];
      alert(formattedError.at(0).toUpperCase() + formattedError.slice(1));
    }

    setIsLoading(false);
  }

  return (
    <>
      <FormContainer>
        {isLoading && (
          <Loading
            inlineStyles={{
              height: "100%",
              width: "30vw",
              borderRadius: "1.2rem",
            }}
          />
        )}
        <FormHeader text="Login" />
        <ThisForm onSubmitForm={handleSubmitLogin}>
          <FormInput type="email" ref={emailRef} id="email" label="E-Mail" />
          <FormInput
            type="password"
            ref={passwordRef}
            id="password"
            label="Password"
          />
          <FormSubmitButton text="Login" />
        </ThisForm>
        <FormRedirect text="Create an account" href="/signup" />
      </FormContainer>
    </>
  );
}

export default Login;
