import {
  IonCard,
  IonCardContent,
  IonCol,
  IonGrid,
  IonIcon,
  IonRow,
} from "@ionic/react";
import cn from "classnames";
import { chevronForwardOutline } from "ionicons/icons";
import styles from "./Cardbutton.module.css";

const CardButton: React.FC<{
  titleRegular: string;
  titleBold: string;
  icon: string;
  function: any;
}> = (props) => {
  return (
    <IonCard
      className={cn("card", "mobileWidth")}
      button={true}
      onClick={() => props.function(true)}
    >
      <IonCardContent>
        <IonGrid>
          <IonRow className="ion-align-items-center">
            <IonCol size="9" className="ion-align-items-center">
              {props.icon !== "none" ? (
                <IonIcon icon={props.icon} size="small" color="medium" />
              ) : null}{" "}
              <span className={styles.titleRegular}>{props.titleRegular}</span>{" "}
              <span className={styles.titleBold}>{props.titleBold}</span>
            </IonCol>
            <IonCol size="3" className="ion-text-end">
              <IonIcon icon={chevronForwardOutline} size="small" />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
};

export default CardButton;
