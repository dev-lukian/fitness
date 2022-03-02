import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
} from "@ionic/react";
import styles from "./TodayCard.module.css";

const TodayCard: React.FC = () => {
  return (
    <IonCard className="card">
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
