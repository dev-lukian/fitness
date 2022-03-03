import { IonContent, IonPage, IonGrid, IonRow } from "@ionic/react";
import { calendar } from "ionicons/icons";
import CardButton from "../components/CardButton/CardButton";
import Header from "../components/Header/Header";
import TodayCard from "../components/TodayCard/TodayCard";
import StreakCard from "../components/StreakCard/StreakCard";

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <Header />
      <IonContent fullscreen>
        <IonGrid fixed={true}>
          <IonRow>
            <TodayCard />
          </IonRow>
          <IonRow>
            <StreakCard />
          </IonRow>
          <IonRow>
            <CardButton
              function=""
              icon={calendar}
              titleRegular="View"
              titleBold="Calendar"
            />
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
