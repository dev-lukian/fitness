import {
  IonAlert,
  IonButton,
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
  ItemReorderEventDetail,
} from "@ionic/react";
import { add } from "ionicons/icons";
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
  const [workoutName, setWorkoutName] = useState<string>();
  const [split, setSplit] = useState<string>();
  const [showCreateExerciseModal, setShowCreateExerciseModal] =
    useState<boolean>(false);
  const [exerciseList, setExerciseList] = useState<Exercise[]>([]);

  const doReorder = (event: CustomEvent<ItemReorderEventDetail>) => {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log("Dragged from index", event.detail.from, "to", event.detail.to);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    let newList = exerciseList;
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
            <IonRow className="ion-justify-content-center">
              <IonItem className="fields">
                <IonLabel>Workout Name</IonLabel>
                <IonInput
                  value={workoutName}
                  onIonChange={(e) => setWorkoutName(e.detail.value!)}
                ></IonInput>
              </IonItem>
            </IonRow>
            <IonRow className="ion-justify-content-center">
              <IonItem className={cn("fields", "ion-margin-top")}>
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
            <IonRow className={cn("ion-justify-content-center")}>
              <IonFab className={styles.fab}>
                <IonFabButton onClick={() => setShowCreateExerciseModal(true)}>
                  <IonIcon icon={add} />
                </IonFabButton>
              </IonFab>
            </IonRow>
            <IonReorderGroup
              disabled={exerciseList.length === 0}
              onIonItemReorder={doReorder}
            >
              {exerciseList.map((exercise: Exercise, i: number) => {
                return (
                  <IonReorder key={i}>
                    <IonRow className="ion-justify-content-center">
                      <ExerciseBlock exercise={exercise} order={i + 1} />
                    </IonRow>
                  </IonReorder>
                );
              })}
            </IonReorderGroup>
          </IonGrid>
          <IonButton
            expand="block"
            className="fixedButton"
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
