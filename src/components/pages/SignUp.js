import { useRef, useState } from "react";

import FormRedirect from "../Forms/FormRedirect";
import FormSubmitButton from "../Forms/FormSubmitButton";
import FormContainer from "./../Forms/FormContainer";
import FormHeader from "./../Forms/FormHeader";
import FormInput from "./../Forms/FormInput";
import ThisForm from "./../Forms/ThisForm";
import Loading from "../Loading";

import { collection, doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "./../../firebase";
import { useNavigate } from "react-router-dom";

import styles from "./SignUp.module.css";

const displayImageColors = [
  "ffbaba",
  "ffdcb5",
  "fffece",
  "c8ffb2",
  "b7fff9",
  "aed8ff",
  "a9b9ff",
  "d2baff",
  "ffbff4",
  "f0f0f0",
];

const generateRandom = () => {
  return Math.round(Math.random() * displayImageColors.length);
};

function SignUp() {
  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmitSignup() {
    setIsLoading(true);
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      alert(
        "Invalid confirm password. Please make sure both the entered passwords match"
      );
      return;
    }

    if (!usernameRef.current.value) {
      alert("Invalid username");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );

      const displayName = usernameRef.current.value;
      const color = await displayImageColors[generateRandom()];
      const photoURL = `https://api.dicebear.com/6.x/bottts-neutral/svg?backgroundColor=${color}&size=48&seed=${userCredential.user.uid}`;

      await updateProfile(userCredential.user, {
        displayName,
        photoURL,
      });

      const newUser = doc(collection(db, "users"), userCredential.user.uid);
      const newUserChat = doc(
        collection(db, "userChats"),
        userCredential.user.uid
      );

      await setDoc(newUser, {
        uid: userCredential.user.uid,
        displayName,
        photoURL,
        email: emailRef.current.value,
      });
      await setDoc(newUserChat, {});

      alert("Your account has been successfully created");
      navigate("/login");
    } catch (error) {
      const errorMessage = error.message;
      const formattedError = errorMessage?.split("(")[1]?.split(")")[0];
      alert(formattedError?.at(0).toUpperCase() + formattedError?.slice(1));
    }

    setIsLoading(false);
  }

  return (
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
      <FormHeader text="SignUp" />
      <ThisForm onSubmitForm={handleSubmitSignup}>
        <FormInput
          type="email"
          id="email"
          label="E-Mail"
          className={styles[`transparent-bg`]}
          ref={emailRef}
        />
        <FormInput
          id="username"
          label="Username"
          className={styles[`transparent-bg`]}
          ref={usernameRef}
        />
        <FormInput
          type="password"
          id="password"
          label="Password"
          className={styles[`transparent-bg`]}
          ref={passwordRef}
        />
        <FormInput
          type="password"
          id="confirm-password"
          label="Confirm Password"
          className={styles[`transparent-bg`]}
          ref={confirmPasswordRef}
        />
        <FormSubmitButton text="Signup" />
      </ThisForm>
      <FormRedirect text="Already have an account" href="/" />
    </FormContainer>
  );
}

export default SignUp;
