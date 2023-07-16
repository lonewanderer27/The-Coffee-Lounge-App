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
  isPlatform,
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
      <IonHeader>
        <IonToolbar>
          <IonTitle>Signup</IonTitle>
          <IonButtons slot="start">
            <IonBackButton defaultHref="account"></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle>
              <h1>Signup</h1>
            </IonTitle>
            {/* <IonButtons slot="start">
              <IonBackButton defaultHref="account"></IonBackButton>
            </IonButtons> */}
          </IonToolbar>
        </IonHeader>
        <form className="ion-padding" onSubmit={handleSubmit(onSubmit)}>
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
            className=" ion-margin-top"
            {...register("gender", { required: true })}
          >
            <IonSelectOption value="Male">Male</IonSelectOption>
            <IonSelectOption value="Female">Female</IonSelectOption>
            <IonSelectOption value="Non-Binary">Non-Binary</IonSelectOption>
          </IonSelect>

          <IonRow className=" ion-margin-top">
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
            className=" ion-margin-top"
          />
          <IonInput
            fill="outline"
            label="Password"
            labelPlacement="floating"
            type="password"
            {...register("password", { required: true })}
            className=" ion-margin-top"
          />

          <IonButton
            expand="block"
            type="submit"
            disabled={!isValid}
            className="ion-margin-top"
          >
            Create Account
          </IonButton>
          <Action
            message="Already have an account?"
            link="/login"
            text="Login"
            align="center"
          />
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Register;
