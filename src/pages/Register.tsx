import "./Account.css";

import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonHeader,
  IonInput,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
  useIonLoading,
} from "@ionic/react";
import { SubmitHandler, useController, useForm } from "react-hook-form";

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
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="account"></IonBackButton>
            </IonButtons>
            <IonTitle>Register</IonTitle>
          </IonToolbar>
        </IonHeader>
        <form className="ion-padding" onSubmit={handleSubmit(onSubmit)}>
          <IonInput
            label="Email"
            labelPlacement="floating"
            fill="outline"
            type="text"
            className="ion-margin-top"
            {...register("email", { required: true })}
          />
          <IonInput
            fill="outline"
            label="Password"
            labelPlacement="floating"
            type="password"
            className="ion-margin-top"
            {...register("password", { required: true })}
          />
          <IonRow>
            <IonCol className="ion-no-padding">
              <IonInput
                fill="outline"
                label="First Name"
                labelPlacement="floating"
                type="text"
                className="ion-margin-top"
                {...register("firstName", { required: true })}
              />
            </IonCol>
            <IonCol className="ion-no-padding">
              <IonInput
                fill="outline"
                label="Last Name"
                labelPlacement="floating"
                type="text"
                className="ion-margin-top"
                {...register("lastName", { required: true })}
              />
            </IonCol>
          </IonRow>

          <IonSelect
            fill="outline"
            label="Gender"
            labelPlacement="floating"
            className="ion-margin-top"
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
                className="ion-margin-top"
                type="text"
                {...register("pronouns", { required: true })}
              ></IonInput>
            </IonCol>
            <IonCol className="ion-no-padding">
              <IonInput
                fill="outline"
                label="Nickname"
                labelPlacement="floating"
                className="ion-margin-top"
                type="text"
                {...register("nickname", { required: true })}
              ></IonInput>
            </IonCol>
          </IonRow>

          <IonButton
            expand="block"
            type="submit"
            disabled={!isValid}
            className="ion-margin-top"
          >
            Register
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Register;
