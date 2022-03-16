import {
  IonAlert,
  IonButton,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonReorder,
  IonReorderGroup,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonToast,
  IonToggle,
  ItemReorderEventDetail,
  createGesture,
  Gesture,
} from "@ionic/react";
import { add, link, swapVertical } from "ionicons/icons";
import { useState } from "react";
import cn from "classnames";
import styles from "./CreateWorkout.module.css";
import BackHeader from "../../components/BackHeader/BackHeader";
import ExerciseBlock from "../../components/ExerciseBlock/ExerciseBlock";
import CreateExercise from "../CreateExercise/CreateExercise";
import { Exercise, Workout } from "../../types";

const CreateWorkout: React.FC<{
  showModal: boolean;
  setShowModal: any;
  workoutList: Workout[];
  setWorkoutList: any;
}> = (props) => {
  const [error, setError] = useState<string>();
  const [draftAlert, setDraftAlert] = useState<boolean>(false);
  const [superSetState, setSuperSetState] = useState<boolean>(false);
  const [reorderState, setReorderState] = useState<boolean>(false);
  const [workoutName, setWorkoutName] = useState<string>();
  const [split, setSplit] = useState<string>();
  const [showCreateExerciseModal, setShowCreateExerciseModal] =
    useState<boolean>(false);
  const [exerciseList, setExerciseList] = useState<Exercise[]>([
    {
      id: "1075745745",
      name: "Squats",
      muscleTarget: ["legs"],
      sets: 5,
      reps: 5,
      restTime: 5,
    },
    {
      id: "942982498549",
      name: "Bench",
      muscleTarget: ["legs"],
      sets: 5,
      reps: 5,
      restTime: 5,
    },
    {
      id: "89127487",
      name: "Shoulder Press",
      muscleTarget: ["legs"],
      sets: 5,
      reps: 5,
      restTime: 5,
    },
  ]);

  const doReorder = (event: CustomEvent<ItemReorderEventDetail>) => {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log("Dragged from index", event.detail.from, "to", event.detail.to);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    let newList = exerciseList.slice();
    let temp = newList[event.detail.from];
    newList[event.detail.from] = newList[event.detail.to];
    newList[event.detail.to] = temp;
    console.log(newList);
    setExerciseList(newList);

    event.detail.complete();
  };

  const resetState = () => {
    setWorkoutName("");
    setSplit("");
    setError("");
    setExerciseList([]);
  };

  const addWorkout = (draft: boolean) => {
    if (!draft && (!workoutName || !split)) {
      setError("All fields are required");
      return;
    }

    if (exerciseList.length === 0) {
      setError("You must add at least 1 exercise");
      return;
    }

    const workout: Workout = {
      name: workoutName,
      split: split,
      exercises: exerciseList,
      draft: draft,
    };

    const newList = props.workoutList.concat(workout);
    props.setWorkoutList(newList);
    props.setShowModal(false);
    resetState();
  };

  return (
    <>
      <IonModal isOpen={props.showModal}>
        <IonContent>
          <BackHeader
            exitFunction={props.setShowModal}
            resetFunction={resetState}
            alertFunction={setDraftAlert}
            exerciseCount={exerciseList.length}
          />
          <IonGrid fixed={true} className={styles.paddingBottom}>
            <IonRow>
              <IonItem className={cn("fields", "mobileWidth")}>
                <IonLabel>Workout Name</IonLabel>
                <IonInput
                  value={workoutName}
                  onIonChange={(e) => setWorkoutName(e.detail.value!)}
                ></IonInput>
              </IonItem>
            </IonRow>
            <IonRow>
              <IonItem
                className={cn("fields", "ion-margin-top", "mobileWidth")}
              >
                <IonLabel>Split Type</IonLabel>
                <IonSelect
                  value={split}
                  placeholder="Select One"
                  onIonChange={(e) => setSplit(e.detail.value)}
                  interface="action-sheet"
                >
                  <IonSelectOption value="push">Push</IonSelectOption>
                  <IonSelectOption value="pull">Pull</IonSelectOption>
                  <IonSelectOption value="legs">Legs</IonSelectOption>
                  <IonSelectOption value="upper body">
                    Upper Body
                  </IonSelectOption>
                  <IonSelectOption value="arms">Arms</IonSelectOption>
                </IonSelect>
              </IonItem>
            </IonRow>
            <IonRow className={cn(styles.fabRow, "ion-justify-content-center")}>
              <IonCol size="3.5" className="ion-align-self-center">
                <div className={styles.toggleWrapper}>
                  <IonIcon icon={link} size="small" />
                  <IonToggle
                    disabled={exerciseList.length < 2}
                    checked={superSetState}
                    onIonChange={(e) => setSuperSetState(e.detail.checked)}
                  />
                </div>
              </IonCol>
              <IonCol size="5">
                <IonFab className={styles.fab}>
                  <IonFabButton
                    onClick={() => setShowCreateExerciseModal(true)}
                  >
                    <IonIcon icon={add} />
                  </IonFabButton>
                </IonFab>
              </IonCol>
              <IonCol size="3.5" className="ion-align-self-center">
                <div className={styles.toggleWrapper}>
                  <IonIcon icon={swapVertical} size="small" />
                  <IonToggle
                    disabled={exerciseList.length < 2}
                    checked={reorderState}
                    onIonChange={(e) => setReorderState(e.detail.checked)}
                  />
                </div>
              </IonCol>
            </IonRow>
            <IonReorderGroup
              disabled={!reorderState}
              onIonItemReorder={doReorder}
            >
              {exerciseList.map((exercise: Exercise, i: number) => {
                return (
                  <IonReorder key={exercise.id}>
                    <IonRow className="ion-justify-content-center">
                      <ExerciseBlock
                        exercise={exercise}
                        order={i + 1}
                        readOnly={true}
                      />
                    </IonRow>
                  </IonReorder>
                );
              })}
            </IonReorderGroup>
          </IonGrid>
          <IonButton
            expand="block"
            className={cn("fixedButton", "mobileWidth")}
            onClick={() => addWorkout(false)}
          >
            COMPLETE
          </IonButton>
        </IonContent>

        <IonToast
          isOpen={!!error}
          onDidDismiss={() => setError("")}
          message={error}
          duration={800}
          position="top"
          color="danger"
          cssClass={"ion-text-center"}
        />
        <IonAlert
          isOpen={draftAlert}
          onDidDismiss={() => {
            props.setShowModal(false);
            setDraftAlert(false);
          }}
          backdropDismiss={false}
          header={"Save workout as draft?"}
          buttons={[
            {
              text: "No",
              role: "cancel",
              handler: () => {
                resetState();
              },
            },
            {
              text: "Yes",
              handler: () => {
                addWorkout(true);
              },
            },
          ]}
        />
      </IonModal>
      <CreateExercise
        showModal={showCreateExerciseModal}
        setShowModal={setShowCreateExerciseModal}
        exerciseList={exerciseList}
        setExerciseList={setExerciseList}
      />
    </>
  );
};

export default CreateWorkout;
