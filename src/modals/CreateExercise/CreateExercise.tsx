import {
  IonButton,
  IonContent,
  IonGrid,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonRow,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonToast,
} from "@ionic/react";
import { useState } from "react";
import cn from "classnames";
import styles from "./CreateExercise.module.css";
import BackHeader from "../../components/BackHeader/BackHeader";
import { Exercise } from "../../types";

const CreateExercise: React.FC<{
  showModal: boolean;
  setShowModal: any;
  exerciseList: Exercise[];
  setExerciseList: any;
}> = (props) => {
  const [error, setError] = useState<string>();
  const [searchText, setSearchText] = useState<string>();
  const [exerciseName, setExerciseName] = useState<string>();
  const [muscleTarget, setMuscleTarget] = useState<string[]>();
  const [sets, setSets] = useState<number>();
  const [reps, setReps] = useState<number>();
  const [restTime, setRestTime] = useState<number>();

  const resetState = () => {
    setExerciseName("");
    setMuscleTarget([]);
    setSets(undefined);
    setReps(undefined);
    setRestTime(undefined);
    setError("");
  };

  const addExercise = () => {
    // Make all inputs required
    if (
      !exerciseName ||
      muscleTarget?.length === 0 ||
      !sets ||
      !reps ||
      !restTime
    ) {
      setError("All fields are required");
      return;
    }

    // Input validation: Sets = 0-20, Reps = 0-100, Rest Time = 0-1000
    if (sets > 20 || sets < 0) {
      setError("Sets must be between 0 and 20");
      return;
    } else if (reps > 100 || reps < 0) {
      setError("Reps must be between 0 and 100");
      return;
    } else if (restTime > 1000 || restTime < 0) {
      setError("Rest Time must be between 0 and 1000");
      return;
    }

    const exercise: Exercise = {
      name: exerciseName,
      muscleTarget: muscleTarget!,
      sets: sets,
      reps: reps,
      restTime: restTime,
    };

    console.log(exercise);

    const newList = props.exerciseList.concat(exercise);
    props.setExerciseList(newList);
    props.setShowModal(false);
    resetState();

    console.log(newList);
  };

  return (
    <IonModal isOpen={props.showModal} animated={false}>
      <IonContent>
        <BackHeader
          resetFunction={resetState}
          exitFunction={props.setShowModal}
        />
        <IonGrid fixed={true}>
          <IonRow>
            <IonSearchbar
              value={searchText}
              onIonChange={(e) => setSearchText(e.detail.value!)}
              className="mobileWidth"
            ></IonSearchbar>
          </IonRow>
          <IonRow className="ion-margin-top">
            <IonItem className={cn("fields", "mobileWidth")}>
              <IonLabel>Exercise Name</IonLabel>
              <IonInput
                value={exerciseName}
                onIonChange={(e) => setExerciseName(e.detail.value!)}
              ></IonInput>
            </IonItem>
          </IonRow>
          <IonRow>
            <IonItem className={cn("fields", "ion-margin-top", "mobileWidth")}>
              <IonLabel>Muscle Target</IonLabel>
              <IonSelect
                multiple={true}
                value={muscleTarget}
                onIonChange={(e) => setMuscleTarget(e.detail.value)}
              >
                <IonSelectOption value="push">Chest</IonSelectOption>
                <IonSelectOption value="pull">Shoulders</IonSelectOption>
                <IonSelectOption value="legs">Biceps</IonSelectOption>
                <IonSelectOption value="upper body">Upper Body</IonSelectOption>
                <IonSelectOption value="arms">Arms</IonSelectOption>
              </IonSelect>
            </IonItem>
          </IonRow>
          <IonRow>
            <IonItem className={cn("fields", "mobileWidth")}>
              <IonLabel>Sets</IonLabel>
              <IonInput
                type="number"
                value={sets}
                onIonChange={(e) => setSets(parseInt(e.detail.value!))}
              ></IonInput>
            </IonItem>
          </IonRow>
          <IonRow>
            <IonItem className={cn("fields", "mobileWidth")}>
              <IonLabel>Reps</IonLabel>
              <IonInput
                type="number"
                value={reps}
                onIonChange={(e) => setReps(parseInt(e.detail.value!))}
              ></IonInput>
            </IonItem>
          </IonRow>
          <IonRow>
            <IonItem className={cn("fields", "mobileWidth")}>
              <IonLabel>Rest Time</IonLabel>
              <IonInput
                type="number"
                value={restTime}
                onIonChange={(e) => setRestTime(parseInt(e.detail.value!))}
              ></IonInput>
            </IonItem>
          </IonRow>
        </IonGrid>
        <IonButton
          expand="block"
          className={cn("fixedButton", "mobileWidth")}
          onClick={addExercise}
        >
          ADD
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
    </IonModal>
  );
};

export default CreateExercise;
