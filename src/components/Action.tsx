import { IonCol, IonRouterLink, IonRow } from "@ionic/react";

export const Action = (props: {
  message?: string;
  link: string;
  text: string;
  align?: "center" | "left" | "right";
}) => (
  <IonRow className={`ion-text-${props.align} ion-justify-content-center`}>
    <IonCol size="12">
      <p>
        {props.message}
        <IonRouterLink className="custom-link" routerLink={props.link}>
          {" "}
          {props.text} &rarr;
        </IonRouterLink>
      </p>
    </IonCol>
  </IonRow>
);

Action.defaultProps = {
  align: "center",
};
