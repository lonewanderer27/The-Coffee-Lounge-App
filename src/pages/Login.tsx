import "./Account.css";

import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  useIonLoading,
  useIonRouter,
  useIonToast,
  useIonViewDidEnter,
} from "@ionic/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";

import { Action } from "../components/Action";
import { FirebaseError } from "firebase/app";
import Logo2 from "../assets/The Coffee Lounge - Logo 2.svg";
import { logInOutline } from "ionicons/icons";
import { nextUrl } from "../App";
import { useColorScheme } from "../hooks/page";
import { useHistory } from "react-router";

interface IFormInput {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const auth = getAuth();
  const router = useIonRouter();

  const [showPass, setShowPass] = useState(false);

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { isValid },
  } = useForm<IFormInput>();

  const history = useHistory();
  const [presentToast] = useIonToast();
  const [presentLoading, dismiss] = useIonLoading();

  const toast = (position: "top" | "middle" | "bottom", message: string) => {
    presentToast({
      message,
      duration: 1500,
      position: position,
    });
  };

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    presentLoading("Logging in...");
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        dismiss();
        router.push(nextUrl("/account"));
      })
      .catch((error: FirebaseError) => {
        dismiss();
        toast("top", error.message);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/signin"></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="h-full flex flex-col justify-center ion-padding ">
          <div className="flex flex-col justify-center text-center">
            <IonImg src={Logo2} className="w-[35%] mx-auto tcl-logo" />
            {/* <IonText>
              <h1 className="font-bold">Login</h1>
            </IonText> */}
            <IonText>
              <p className="text-center font-bold">Welcome Back!</p>
            </IonText>
            <IonInput
              label="Email"
              labelPlacement="floating"
              type="email"
              fill="outline"
              className="text-start"
              {...register("email", { required: true })}
            ></IonInput>
            <IonInput
              fill="outline"
              label="Password"
              labelPlacement="floating"
              type={showPass ? "text" : "password"}
              className="text-start mt-2"
              {...register("password", { required: true })}
            ></IonInput>
          </div>
          <IonCheckbox
            className="my-2"
            justify="end"
            onIonChange={() => setShowPass((o) => !o)}
          >
            Show Password
          </IonCheckbox>
          <IonButton
            expand="block"
            disabled={!isValid}
            type="submit"
            className="ion-margin-top"
            onClick={handleSubmit(onSubmit)}
          >
            Sign in
            <IonIcon slot="end" src={logInOutline} />
          </IonButton>
          <Action
            message="Don't have an account?"
            link="/register"
            text="Signup"
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
