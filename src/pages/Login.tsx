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
} from "@ionic/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

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

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    signInWithEmailAndPassword(auth, data.email, data.password).then(
      (userCredential) => {
        const user = userCredential.user;
        console.log(user);
        history.push("/account");
      }
    );
  };

  return (
    <IonPage>
      <IonHeader>
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
        <form className="ion-padding" onSubmit={handleSubmit(onSubmit)}>
          <IonInput
            label="Email"
            type="email"
            {...register("email", { required: true })}
          />
          <IonInput
            label="Password"
            type="password"
            {...register("password", { required: true })}
          />
          <IonButton expand="block" disabled={!isValid} type="submit">
            Sign in
            <IonIcon src={logInOutline} />
          </IonButton>
          <IonButton routerLink="/register" expand="block">
            Don't have an account?
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Login;
