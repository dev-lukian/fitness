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
  ItemReorderEventDetail,
} from "@ionic/react";
import { add, swapVertical } from "ionicons/icons";
import { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import cn from "classnames";
import styles from "./CreateWorkout.module.css";
import BackHeader from "../../components/BackHeader/BackHeader";
import ExerciseBlock from "../../components/ExerciseBlock/ExerciseBlock";
import CreateExerciseBlock from "../CreateExerciseBlock/CreateExerciseBlock";
import { Exercise, Workout, Mode } from "../../types";
const axios = require("axios");

const CreateWorkout: React.FC<{
  showModal: boolean;
  setShowModal: any;
  workoutList: Workout[];
  setWorkoutList: any;
  clickedWorkout: Workout | undefined;
  setClickedWorkout: any;
}> = (props) => {
  const [error, setError] = useState<string>();
  const [draftAlert, setDraftAlert] = useState<boolean>(false);
  const [workoutID, setWorkoutID] = useState<string>();
  const [workoutMode, setWorkoutMode] = useState<Mode>("create");
  const [editBlock, setEditBlock] = useState<
    [Exercise[], number] | undefined
  >();
  const [removeBlock, setRemoveBlock] = useState<number>(-1);
  const [workoutName, setWorkoutName] = useState<string>();
  const [split, setSplit] = useState<string>();
  const [showCreateExerciseModal, setShowCreateExerciseModal] =
    useState<boolean>(false);
  const [exerciseBlockList, setExerciseBlockList] = useState<Exercise[][]>([]);
  const parentModal = useRef<any>();

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
    setError("");
    setWorkoutName("");
    setSplit("");
    setExerciseBlockList([]);
    setWorkoutMode("create");
    props.setClickedWorkout();
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
      id: uuidv4(),
      name: workoutName,
      split: split,
      exerciseBlocks: exerciseBlockList,
      draft: draft,
    };

    axios
      .post("", {
        firstName: "Fred",
        lastName: "Flintstone",
      })
      .then(function (response: any) {
        console.log(response);
      })
      .catch(function (error: any) {
        console.log(error);
      });

    const newList = props.workoutList.concat(workout);
    props.setWorkoutList(newList);
    props.setShowModal(false);
    resetState();
  };

  const deleteWorkout = () => {
    let i = props.workoutList.findIndex((workout) => workout.id === workoutID);
    let newList = props.workoutList.slice();
    newList.splice(i, 1);
    props.setWorkoutList(newList);
    props.setShowModal(false);
  };

  const editWorkout = () => {
    setWorkoutMode("view");
  };

  useEffect(() => {
    if (removeBlock !== -1) {
      let newList = exerciseBlockList.slice();
      newList.splice(removeBlock, 1);
      setExerciseBlockList(newList);
      setRemoveBlock(-1);
    }
  }, [removeBlock]);

  useEffect(() => {
    if (editBlock !== undefined) {
      setShowCreateExerciseModal(true);
    }
  }, [editBlock]);

  useEffect(() => {
    console.log(props.clickedWorkout);
    if (props.clickedWorkout) {
      setWorkoutID(props.clickedWorkout.id);
      setWorkoutName(props.clickedWorkout.name);
      setSplit(props.clickedWorkout.split);
      setExerciseBlockList(props.clickedWorkout.exerciseBlocks);
      setWorkoutMode("view");
    }
  }, [props.clickedWorkout]);

  return (
    <>
      <IonModal
        mode="ios"
        isOpen={props.showModal}
        onDidDismiss={() => props.setShowModal(false)}
        showBackdrop={true}
        ref={parentModal}
      >
        <IonContent>
          <BackHeader
            exitFunction={props.setShowModal}
            resetFunction={resetState}
            // alertFunction={setDraftAlert}
            // exerciseCount={exerciseBlockList.length}
          />
          <IonGrid fixed={true} className={styles.paddingBottom}>
            {workoutMode === "edit" || workoutMode === "create" ? (
              <>
                <IonRow>
                  <IonItem className={cn("fields", "mobileWidth")}>
                    <IonLabel position="stacked">Workout Name</IonLabel>
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
                    <IonLabel position="stacked">Split Type</IonLabel>
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
              </>
            ) : (
              <>
                <IonRow className="mobileWidth ion-padding-bottom">
                  <div className={styles.workoutTitleWrapper}>
                    <div className={styles.workoutTitle}>{split}</div>
                    <div className={styles.buttonGroup}>
                      <IonButton
                        className={styles.editButton}
                        expand="block"
                        color="secondary"
                        size="small"
                        onClick={() => setWorkoutMode("edit")}
                      >
                        EDIT
                      </IonButton>
                      <IonButton
                        className={styles.deleteButton}
                        expand="block"
                        color="danger"
                        onClick={deleteWorkout}
                        size="small"
                      >
                        DELETE
                      </IonButton>
                    </div>
                  </div>
                </IonRow>
                <IonRow className="mobileWidth">
                  <div>
                    <div className="bold-medium">{workoutName}</div>
                    <div>
                      <span className="bold-medium">
                        {exerciseBlockList.length}
                      </span>{" "}
                      Exercises
                    </div>
                  </div>
                </IonRow>
              </>
            )}
            <IonRow className={cn(styles.fabRow, "ion-justify-content-center")}>
              {workoutMode === "edit" || workoutMode === "create" ? (
                <IonFab className={styles.fab}>
                  <IonFabButton
                    onClick={() => setShowCreateExerciseModal(true)}
                  >
                    <IonIcon icon={add} />
                  </IonFabButton>
                </IonFab>
              ) : null}
            </IonRow>
            <IonRow className="ion-justify-content-center">
              <IonReorderGroup
                disabled={workoutMode === "view"}
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
                          edit={setEditBlock}
                          remove={setRemoveBlock}
                          workoutMode={workoutMode}
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
        </IonContent>
        {workoutMode === "edit" || workoutMode === "create" ? (
          <IonButton
            expand="block"
            className={cn("fixedButton", "mobileWidth")}
            onClick={
              workoutMode === "create" ? () => addWorkout(false) : editWorkout
            }
          >
            {workoutMode === "create" ? "COMPLETE" : "UPDATE"}
          </IonButton>
        ) : null}

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
        parentModal={parentModal}
        showModal={showCreateExerciseModal}
        setShowModal={setShowCreateExerciseModal}
        exerciseBlockList={exerciseBlockList}
        setExerciseBlockList={setExerciseBlockList}
        editBlock={editBlock}
        setEditBlock={setEditBlock}
      />
    </>
  );
};

export default CreateWorkout;
