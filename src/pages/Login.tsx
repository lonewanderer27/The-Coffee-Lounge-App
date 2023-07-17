import "./Account.css";

import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonLoading,
  useIonToast,
} from "@ionic/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { Action } from "../components/Action";
import { FirebaseError } from "firebase/app";
import { logInOutline } from "ionicons/icons";
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
        const user = userCredential.user;
        console.log(user);
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

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Login</IonTitle>
          </IonToolbar>
        </IonHeader>
        <form
          className="ion-padding"
          onSubmit={handleSubmit(onSubmit)}
          style={{
            height: window.innerHeight - 150,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <IonInput
            label="Email"
            type="email"
            className="ion-text-right"
            {...register("email", { required: true })}
          />
          <IonInput
            label="Password"
            type="password"
            className="ion-text-right"
            {...register("password", { required: true })}
          />
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
      </IonContent>
    </IonPage>
  );
};

export default Login;
