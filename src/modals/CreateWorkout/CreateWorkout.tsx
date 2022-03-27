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
import { add, swapVertical } from "ionicons/icons";
import { useEffect, useState } from "react";

import cn from "classnames";
import styles from "./CreateWorkout.module.css";
import BackHeader from "../../components/BackHeader/BackHeader";
import ExerciseBlock from "../../components/ExerciseBlock/ExerciseBlock";
import CreateExerciseBlock from "../CreateExerciseBlock/CreateExerciseBlock";
import { Exercise, Workout } from "../../types";

const CreateWorkout: React.FC<{
  showModal: boolean;
  setShowModal: any;
  workoutList: Workout[];
  setWorkoutList: any;
}> = (props) => {
  const [error, setError] = useState<string>();
  const [draftAlert, setDraftAlert] = useState<boolean>(false);
  const [remove, setRemove] = useState<number>(-1);
  const [edit, setEdit] = useState<[Exercise[], number] | undefined>();
  const [workoutName, setWorkoutName] = useState<string>();
  const [split, setSplit] = useState<string>();
  const [showCreateExerciseModal, setShowCreateExerciseModal] =
    useState<boolean>(false);
  const [exerciseBlockList, setExerciseBlockList] = useState<Exercise[][]>([
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
  ]);

  const doReorder = (event: CustomEvent<ItemReorderEventDetail>) => {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log("Dragged from index", event.detail.from, "to", event.detail.to);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    let newList = exerciseBlockList.slice();
    let temp = newList[event.detail.from];
    newList[event.detail.from] = newList[event.detail.to];
    newList[event.detail.to] = temp;
    console.log(newList);
    setExerciseBlockList(newList);

    event.detail.complete();
  };

  const resetState = () => {
    setWorkoutName("");
    setSplit("");
    setError("");
    setExerciseBlockList([]);
  };

  const addWorkout = (draft: boolean) => {
    if (!draft && (!workoutName || !split)) {
      setError("All fields are required");
      return;
    }

    if (exerciseBlockList.length === 0) {
      setError("You must add at least 1 exercise block");
      return;
    }

    const workout: Workout = {
      name: workoutName,
      split: split,
      exerciseBlocks: exerciseBlockList,
      draft: draft,
    };

    const newList = props.workoutList.concat(workout);
    props.setWorkoutList(newList);
    props.setShowModal(false);
    resetState();
  };

  useEffect(() => {
    if (remove !== -1) {
      let newList = exerciseBlockList.slice();
      newList.splice(remove, 1);
      setExerciseBlockList(newList);
      setRemove(-1);
    }
  }, [remove]);

  useEffect(() => {
    if (edit !== undefined) {
      setShowCreateExerciseModal(true);
    }
  }, [edit]);

  return (
    <>
      <IonModal isOpen={props.showModal}>
        <IonContent>
          <BackHeader
            exitFunction={props.setShowModal}
            resetFunction={resetState}
            alertFunction={setDraftAlert}
            exerciseCount={exerciseBlockList.length}
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
              <IonFab className={styles.fab}>
                <IonFabButton onClick={() => setShowCreateExerciseModal(true)}>
                  <IonIcon icon={add} />
                </IonFabButton>
              </IonFab>
            </IonRow>
            <IonRow className="ion-justify-content-center">
              <IonReorderGroup
                disabled={false}
                onIonItemReorder={doReorder}
                className="mobileWidth"
              >
                {exerciseBlockList.map(
                  (exerciseBlock: Exercise[], i: number) => {
                    return (
                      <div
                        key={exerciseBlock[0].id}
                        className={styles.reorderBlock}
                      >
                        <ExerciseBlock
                          exerciseBlock={exerciseBlock}
                          order={i + 1}
                          readOnly={true}
                          edit={setEdit}
                          remove={setRemove}
                        />
                        <IonReorder slot="end" className="ion-margin-start">
                          <IonIcon icon={swapVertical} size="small" />
                        </IonReorder>
                      </div>
                    );
                  }
                )}
              </IonReorderGroup>
            </IonRow>
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
      <CreateExerciseBlock
        showModal={showCreateExerciseModal}
        setShowModal={setShowCreateExerciseModal}
        exerciseBlockList={exerciseBlockList}
        setExerciseBlockList={setExerciseBlockList}
        editBlock={edit}
        setEditBlock={setEdit}
      />
    </>
  );
};

export default CreateWorkout;
