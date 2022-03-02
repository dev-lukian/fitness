import {
  IonHeader,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import { settings } from "ionicons/icons";
import cn from "classnames";
import styles from "./Header.module.css";

const Header: React.FC = () => {
  return (
    <IonHeader
      collapse="fade"
      className={cn(styles.header, "ion-padding-horizontal")}
    >
      <IonGrid>
        <IonRow className="ion-align-items-center">
          <IonCol className={styles.headerTitle}>Hi Lukian 👋</IonCol>
          <IonCol className="ion-text-end">
            <IonButton color="light">
              <IonIcon icon={settings} color="medium" />
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonHeader>
  );
};

export default Header;
