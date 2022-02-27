import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
} from "@ionic/react";
import styles from "./TodayBlock.module.css";

const TodayBlock: React.FC = () => {
  return (
    <>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle className={styles.title}>Today's Workout</IonCardTitle>
        </IonCardHeader>

        <IonCardContent>
          <IonButton expand="block" className="ion-margin-top">
            START
          </IonButton>
        </IonCardContent>
      </IonCard>
    </>
  );
};

export default TodayBlock;
