import {
  IonCol,
  IonContent,
  IonGrid,
  IonLabel,
  IonPage,
  IonRow,
  IonToggle,
} from "@ionic/react";
import cn from "classnames";
import { useState } from "react";
import CardButton from "../../components/CardButton/CardButton";
import Header from "../../components/Header/Header";
import CreateWorkout from "../../modals/CreateWorkout/CreateWorkout";
import { Workout } from "../../types";
import styles from "./Plan.module.css";

const Plan: React.FC = () => {
  const [showCreateWorkoutModal, setShowCreateWorkoutModal] =
    useState<boolean>(false);
  const [workoutList, setWorkoutList] = useState<Workout[]>([]);
  const [drafts, setDrafts] = useState<boolean>();

  console.log(workoutList);

  return (
    <>
      <IonPage>
        <Header />
        <IonContent fullscreen>
          <IonGrid fixed={true}>
            <IonRow className="ion-justify-content-center">
              <CardButton
                function={setShowCreateWorkoutModal}
                icon="none"
                titleRegular="Create"
                titleBold="Workout"
              />
            </IonRow>
            <IonRow className="ion-justify-content-center">
              <CardButton
                function=""
                icon="none"
                titleRegular="Setup"
                titleBold="Weekly Split"
              />
            </IonRow>
            <IonRow
              className={cn(
                "ion-justify-content-center",
                "ion-align-items-center"
              )}
            >
              <IonCol size="8">
                <span className={styles.workoutTitle}>Your Workouts</span>
              </IonCol>
              <IonCol class="ion-text-end">
                <IonLabel className={styles.draftsLabel}>drafts</IonLabel>
              </IonCol>
              <IonCol className={cn(styles.draftsWrapper, "ion-text-end")}>
                <IonToggle
                  checked={drafts}
                  onIonChange={(e) => setDrafts(e.detail.checked)}
                />
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
      <CreateWorkout
        showModal={showCreateWorkoutModal}
        setShowModal={setShowCreateWorkoutModal}
        workoutList={workoutList}
        setWorkoutList={setWorkoutList}
      />
    </>
  );
};

export default Plan;
