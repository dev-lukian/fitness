import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
} from "@ionic/react";
import styles from "./TodayCard.module.css";
import cn from "classnames";

const TodayCard: React.FC = () => {
  return (
    <IonCard className={cn("card", "mobileWidth")}>
      <IonCardHeader>
        <IonCardTitle className={styles.title}>Today's Workout</IonCardTitle>
      </IonCardHeader>

      <IonCardContent>
        <IonButton expand="block" className="ion-margin-top">
          START
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default TodayCard;
