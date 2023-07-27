import {
  FieldValue,
  doc,
  getFirestore,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import {
  IonButton,
  IonCol,
  IonContent,
  IonImg,
  IonInput,
  IonPage,
  IonRow,
  IonSpinner,
  IonText,
  useIonAlert,
  useIonRouter,
} from "@ionic/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { getAuth, updateProfile } from "firebase/auth";
import { memo, useState } from "react";

import { FirebaseError } from "firebase/app";
import success from "../assets/success.png";

interface IFormInput {
  nickname: string;
  gender?: string;
  pronouns?: string;
  updatedAt?: FieldValue;
}

function Onboarding() {
  const db = getFirestore();
  const auth = getAuth();
  const router = useIonRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isValidating },
  } = useForm<IFormInput>();
  const [loading, setLoading] = useState(false);
  const [presentAlert] = useIonAlert();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setLoading(true);

    try {
      // update firebase user profile
      await updateProfile(auth.currentUser!, {
        displayName: data.nickname,
      });

      // construct the user data
      const userData: IFormInput = {
        nickname: data.nickname,
        updatedAt: serverTimestamp(),
        ...(data.gender && { gender: data.gender }),
        ...(data.pronouns && { pronouns: data.pronouns }),
      };

      // set the information in user's document
      await setDoc(doc(db, "users", auth.currentUser!.uid), userData);

      // navigate to home
      setLoading(false);
      router.push("/home");
    } catch (err: unknown) {
      const error = err as FirebaseError;
      console.error(err);
      presentAlert({
        header: "Error",
        message: error.message,
        buttons: ["OK"],
      });
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="h-full flex">
          <form
            className="ion-padding flex flex-col justify-center items-center"
            onSubmit={handleSubmit(onSubmit)}
          >
            <IonImg src={success} className="w-2/3 ion-margin-bottom" />
            <IonText className="ion-margin-vertical text-center">
              <span className="font-bold">
                To personalize your orders, we'd just like to ask you two
                things. Rest assured this information is kept private.
              </span>
            </IonText>
            <IonInput
              label="Nickname"
              labelPlacement="floating"
              fill="outline"
              placeholder="What should we call you?"
              {...register("nickname", { required: true })}
            />
            <IonRow>
              <IonCol className="pl-0 pt-0">
                <IonInput
                  label="Gender (Optional)"
                  labelPlacement="floating"
                  fill="outline"
                  className="mt-4"
                  {...register("gender", { required: false })}
                />
              </IonCol>
              <IonCol className="pr-0 pt-0">
                <IonInput
                  label="Pronouns (Optional)"
                  labelPlacement="floating"
                  fill="outline"
                  className="mt-4"
                  {...register("pronouns", { required: false })}
                />
              </IonCol>
            </IonRow>
            <IonButton
              className="ion-margin-top w-full"
              type="submit"
              disabled={!isValid || isValidating}
            >
              {loading ? <IonSpinner /> : "Continue"}
            </IonButton>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default memo(Onboarding);
