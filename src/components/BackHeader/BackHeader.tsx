import {
  IonHeader,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import cn from "classnames";
import styles from "./BackHeader.module.css";

const BackHeader: React.FC<{
  exitFunction: any;
  resetFunction: any;
  alertFunction?: any;
  exerciseCount?: number;
}> = (props) => {
  const exit = () => {
    if (props.alertFunction && props.exerciseCount! > 0) {
      props.alertFunction(true);
    } else {
      props.exitFunction(false);
      props.resetFunction();
    }
  };

  return (
    <IonHeader
      collapse="fade"
      className={cn(styles.header, "ion-padding-horizontal")}
    >
      <IonGrid>
        <IonRow className="ion-align-items-center">
          <IonCol>
            <IonButton class="ion-no-padding" color="white" onClick={exit}>
              <IonIcon icon={chevronBack} color="medium" />
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonHeader>
  );
};

export default BackHeader;
