import {
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import Header from "../components/Header/Header";

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <Header />
      <IonContent fullscreen>
        <IonGrid fixed={true}></IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
