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
import WorkoutItem from "../../components/WorkoutItem/WorkoutItem";
import { Workout } from "../../types";
import styles from "./Plan.module.css";

const Plan: React.FC = () => {
  const [showCreateWorkoutModal, setShowCreateWorkoutModal] =
    useState<boolean>(false);
  const [clickedWorkout, setClickedWorkout] = useState<Workout>();
  const [workoutList, setWorkoutList] = useState<Workout[]>([
    {
      id: "1",
      name: "High Reps Chest",
      split: "legs",
      exerciseBlocks: [
        [
          {
            id: "1075745745",
            name: "Squats",
            muscleTarget: ["legs"],
            sets: 5,
            reps: 5,
            restTime: 5,
          },
        ],
        [
          {
            id: "942982498549",
            name: "Bench",
            muscleTarget: ["legs"],
            sets: 5,
            reps: 5,
            restTime: 5,
          },
        ],
        [
          {
            id: "11111111",
            name: "Lateral Raises",
            muscleTarget: ["legs"],
            sets: 5,
            reps: 5,
            restTime: 5,
          },
          {
            id: "222222222",
            name: "Incline Bench Press",
            muscleTarget: ["legs"],
            sets: 5,
            reps: 5,
            restTime: 5,
          },
        ],
      ],
      draft: false,
    },
    {
      id: "2",
      name: "High Reps Chest",
      split: "legs",
      exerciseBlocks: [
        [
          {
            id: "1075745745",
            name: "Squats",
            muscleTarget: ["legs"],
            sets: 5,
            reps: 5,
            restTime: 5,
          },
        ],
        [
          {
            id: "942982498549",
            name: "Bench",
            muscleTarget: ["legs"],
            sets: 5,
            reps: 5,
            restTime: 5,
          },
        ],
        [
          {
            id: "11111111",
            name: "Lateral Raises",
            muscleTarget: ["legs"],
            sets: 5,
            reps: 5,
            restTime: 5,
          },
          {
            id: "222222222",
            name: "Incline Bench Press",
            muscleTarget: ["legs"],
            sets: 5,
            reps: 5,
            restTime: 5,
          },
        ],
      ],
      draft: false,
    },
  ]);
  const [drafts, setDrafts] = useState<boolean>();

  return (
    <>
      <IonPage>
        <Header />
        <IonContent fullscreen>
          <IonGrid fixed={true}>
            <IonRow>
              <CardButton
                function={setShowCreateWorkoutModal}
                icon="none"
                titleRegular="Create"
                titleBold="Workout"
              />
            </IonRow>
            <IonRow>
              <CardButton
                function=""
                icon="none"
                titleRegular="Setup"
                titleBold="Weekly Split"
              />
            </IonRow>
            <div className={styles.workoutWrapper}>
              <IonRow
                className={cn(
                  "ion-align-items-center",
                  "mobileWidth",
                  "ion-padding-vertical"
                )}
              >
                <IonCol size="8">
                  <span className={styles.workoutTitle}>Your Workouts</span>
                </IonCol>
                <IonCol>
                  <div className={styles.toggleWrapper}>
                    <IonLabel className={styles.draftsLabel}>drafts</IonLabel>
                    <IonToggle
                      checked={drafts}
                      onIonChange={(e) => setDrafts(e.detail.checked)}
                    />
                  </div>
                </IonCol>
              </IonRow>
              {workoutList.map((workout: Workout, i: number) => {
                return (
                  <IonRow key={i} className="mobileWidth">
                    <WorkoutItem
                      workout={workout}
                      setShowCreateWorkoutModal={setShowCreateWorkoutModal}
                      setClickedWorkout={setClickedWorkout}
                    />
                  </IonRow>
                );
              })}
            </div>
          </IonGrid>
        </IonContent>
      </IonPage>
      <CreateWorkout
        showModal={showCreateWorkoutModal}
        setShowModal={setShowCreateWorkoutModal}
        workoutList={workoutList}
        setWorkoutList={setWorkoutList}
        clickedWorkout={clickedWorkout}
        setClickedWorkout={setClickedWorkout}
      />
    </>
  );
};

export default Plan;
