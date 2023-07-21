import "./Account.css";

import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCardTitle,
  IonCol,
  IonContent,
  IonHeader,
  IonImg,
  IonInput,
  IonPage,
  IonRouterLink,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTitle,
  IonToolbar,
  isPlatform,
  useIonLoading,
  useIonToast,
} from "@ionic/react";
import { SubmitHandler, useController, useForm } from "react-hook-form";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";

import { Action } from "../components/Action";
import { useColorScheme } from "../hooks/page";
import { useHistory } from "react-router";

enum GenderEnum {
  Female = "Female",
  Male = "Male",
  NonBinary = "Non-Binary",
}

interface IFormInput {
  email: string;
  password: string;
  gender: GenderEnum;
  firstName: string;
  lastName: string;
  pronouns: string;
  nickname: string;
}

const Register: React.FC = () => {
  const db = getFirestore();
  const auth = getAuth();
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormInput>();

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
    presentLoading("Creating your account...");
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        dismiss(); // dismiss the original loading
        const user = userCredential.user;
        console.log(user);

        // update firebase user profile
        (async () => {
          await updateProfile(auth.currentUser!, {
            displayName: data.nickname,
          });
        })();

        // create a user in users documents
        (async () => {
          await setDoc(doc(db, "users", user.uid), {
            nickname: data.nickname,
            pronouns: data.pronouns,
          });
          history.push("/account");
        })();
      })
      .catch((error) => {
        dismiss();
        toast("top", error.message);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const { colorScheme } = useColorScheme();

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="h-full flex">
          <form
            className="ion-padding h-full flex flex-col justify-center"
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
              // labelPlacement="floating"
              className=" ion-margin-top ion-text-end"
              fill="outline"
              type="text"
              {...register("email", { required: true })}
            />
            <IonInput
              className=" ion-margin-top ion-text-end"
              fill="outline"
              label="Password"
              // labelPlacement="floating"
              type="password"
              {...register("password", { required: true })}
            />

            <IonRow>
              <IonCol className="ion-no-padding ion-margin-top">
                <IonInput
                  fill="outline"
                  labelPlacement="floating"
                  label="Pronouns"
                  type="text"
                  {...register("pronouns", { required: true })}
                ></IonInput>
              </IonCol>
              <IonCol className="ion-no-padding ion-margin-top">
                <IonInput
                  fill="outline"
                  label="Nickname"
                  labelPlacement="floating"
                  type="text"
                  {...register("nickname", { required: true })}
                ></IonInput>
              </IonCol>
            </IonRow>

            <p className="ion-text-center ion-margin-top">
              By tapping "Create Account" you agree to our{" "}
              <IonRouterLink>Terms of Use</IonRouterLink> and{" "}
              <IonRouterLink>Privacy Policy</IonRouterLink>
            </p>

            <IonButton
              expand="block"
              type="submit"
              disabled={!isValid}
              className="ion-margin-top"
            >
              Create Account
            </IonButton>
            <Action
              message="Have an account?"
              link="/login"
              text="Login"
              align="center"
            />
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Register;
