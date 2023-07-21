import "./Account.css";

import {
  IonButton,
  IonContent,
  IonIcon,
  IonImg,
  IonInput,
  IonPage,
  useIonLoading,
  useIonToast,
  useIonViewDidEnter,
} from "@ionic/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { Action } from "../components/Action";
import { FirebaseError } from "firebase/app";
import { logInOutline } from "ionicons/icons";
import { useColorScheme } from "../hooks/page";
import { useHistory } from "react-router";

interface IFormInput {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const auth = getAuth();

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
        history.push("/account");
      })
      .catch((error: FirebaseError) => {
        dismiss();
        toast("top", error.message);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const { colorScheme } = useColorScheme();

  useIonViewDidEnter(() => {
    setFocus("email");
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="h-full flex">
          <form
            className="ion-padding flex flex-col justify-center h-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <IonImg
              src={
                colorScheme === "dark"
                  ? "/slogan_white_mode.png"
                  : "/slogan_dark_mode.png"
              }
              className="w-[35%] mx-auto"
            />
            <IonInput
              label="Email"
              labelPlacement="start"
              type="email"
              className="ion-text-right"
              {...register("email", { required: true })}
            ></IonInput>
            <IonInput
              label="Password"
              type="password"
              className="ion-text-right"
              {...register("password", { required: true })}
            ></IonInput>
            <IonButton
              expand="block"
              disabled={!isValid}
              type="submit"
              className="ion-margin-top"
            >
              Sign in
              <IonIcon src={logInOutline} />
            </IonButton>
            <Action
              message="Don't have an account?"
              link="/register"
              text="Signup"
            />
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
