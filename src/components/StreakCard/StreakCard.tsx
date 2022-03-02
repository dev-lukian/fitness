import {
  IonCard,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonProgressBar,
} from "@ionic/react";
import styles from "./StreakCard.module.css";
import cn from "classnames";

const StreakCard: React.FC = () => {
  return (
    <IonCard className="card">
      <IonCardContent>
        <IonGrid>
          <IonRow className="ion-align-items-center">
            <IonCol size="4" className={cn("ion-text-center", styles.streak)}>
              ⚡️5
            </IonCol>
            <IonCol size="8">
              <p className={cn("ion-text-center", styles.quote)}>
                “Don’t give up on your dreams, or your dreams will give up on
                you.”
              </p>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCardContent>
      <IonProgressBar value={0.5} />
    </IonCard>
  );
};

export default StreakCard;
