import "./Account.css";

import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCardTitle,
  IonCol,
  IonContent,
  IonHeader,
  IonInput,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTitle,
  IonToolbar,
  useIonLoading,
} from "@ionic/react";
import { SubmitHandler, useController, useForm } from "react-hook-form";

import { Action } from "../components/Action";

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
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    alert("Submitted");
    console.log(data);
  };

  const [present, dismiss] = useIonLoading();

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="account"></IonBackButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <form className="ion-padding" onSubmit={handleSubmit(onSubmit)}>
          <IonCardTitle>Signup</IonCardTitle>
          <h5>Let's get to know each other</h5>
          <IonRow className="ion-margin-top">
            <IonCol className="ion-no-padding">
              <IonInput
                fill="outline"
                label="First Name"
                labelPlacement="floating"
                type="text"
                {...register("firstName", { required: true })}
              />
            </IonCol>
            <IonCol className="ion-no-padding">
              <IonInput
                fill="outline"
                label="Last Name"
                labelPlacement="floating"
                type="text"
                {...register("lastName", { required: true })}
              />
            </IonCol>
          </IonRow>

          <IonSelect
            fill="outline"
            label="Gender"
            labelPlacement="floating"
            {...register("gender", { required: true })}
          >
            <IonSelectOption value="Male">Male</IonSelectOption>
            <IonSelectOption value="Female">Female</IonSelectOption>
            <IonSelectOption value="Non-Binary">Non-Binary</IonSelectOption>
          </IonSelect>

          <IonRow>
            <IonCol className="ion-no-padding">
              <IonInput
                fill="outline"
                labelPlacement="floating"
                label="Pronouns"
                type="text"
                {...register("pronouns", { required: true })}
              ></IonInput>
            </IonCol>
            <IonCol className="ion-no-padding">
              <IonInput
                fill="outline"
                label="Nickname"
                labelPlacement="floating"
                type="text"
                {...register("nickname", { required: true })}
              ></IonInput>
            </IonCol>
          </IonRow>

          <IonInput
            label="Email"
            labelPlacement="floating"
            fill="outline"
            type="text"
            {...register("email", { required: true })}
          />
          <IonInput
            fill="outline"
            label="Password"
            labelPlacement="floating"
            type="password"
            {...register("password", { required: true })}
          />

          <IonButton
            expand="block"
            type="submit"
            disabled={!isValid}
            className="ion-margin-top"
          >
            Create Account
          </IonButton>
        </form>
        <Action message="Already have an account?" link="/login" text="Login" />
      </IonContent>
    </IonPage>
  );
};

export default Register;
