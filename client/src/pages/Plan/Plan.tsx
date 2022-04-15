import {
  IonCol,
  IonContent,
  IonGrid,
  IonLabel,
  IonPage,
  IonRow,
  IonSpinner,
  IonToggle,
} from "@ionic/react";
import cn from "classnames";
import { useEffect, useState } from "react";
import CardButton from "../../components/CardButton/CardButton";
import Header from "../../components/Header/Header";
import CreateWorkout from "../../modals/CreateWorkout/CreateWorkout";
import SetupWeek from "../../modals/SetupWeek/SetupWeek";
import WorkoutItem from "../../components/WorkoutItem/WorkoutItem";
import { Workout } from "../../types";
import styles from "./Plan.module.css";
const axios = require("axios");

const Plan: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [showCreateWorkoutModal, setShowCreateWorkoutModal] =
    useState<boolean>(false);
  const [showSetupWeekModal, setShowSetupWeekModal] = useState<boolean>(false);
  const [clickedWorkout, setClickedWorkout] = useState<Workout>();
  const [workoutList, setWorkoutList] = useState<Workout[]>([]);
  const [drafts, setDrafts] = useState<boolean>();

  useEffect(() => {
    axios
      .get("/api/workout/6258dc6a1a1a76e3820c5c6e")
      .then(function (response: any) {
        console.log(response.data.workout);
        const workout: Workout = {
          id: response.data.workout._id,
          name: response.data.workout.name,
          exerciseBlocks: response.data.workout.exerciseBlocks,
          splitType: response.data.workout.splitType,
          draft: response.data.workout.draft,
        };
        setWorkoutList([workout]);
      })
      .catch(function (error: any) {
        console.log(error);
      })
      .then(function () {
        setLoading(false);
      });
  }, []);

  // useEffect(() => {
  //   console.log(workoutList);
  // }, [workoutList]);

  return (
    <>
      {loading ? (
        <IonContent fullscreen>
          <IonSpinner name="crescent" color="dark" className={styles.spinner} />
        </IonContent>
      ) : (
        <>
          <IonPage
            className={
              showCreateWorkoutModal || showSetupWeekModal
                ? styles.blur
                : undefined
            }
          >
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
                    function={setShowSetupWeekModal}
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
                        <IonLabel className={styles.draftsLabel}>
                          drafts
                        </IonLabel>
                        <IonToggle
                          checked={drafts}
                          onIonChange={(e) => setDrafts(e.detail.checked)}
                        />
                      </div>
                    </IonCol>
                  </IonRow>
                  {workoutList.map((workout: any, i: number) => {
                    return (
                      <IonRow key={workout.id} className="mobileWidth">
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
          <SetupWeek
            showModal={showSetupWeekModal}
            setShowModal={setShowSetupWeekModal}
            workoutList={workoutList}
          />
        </>
      )}
    </>
  );
};

export default Plan;
