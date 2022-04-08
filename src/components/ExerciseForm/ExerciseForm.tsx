import {
  IonButton,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { link, unlink } from "ionicons/icons";
import { useState, useImperativeHandle, forwardRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import cn from "classnames";
import styles from "./ExerciseForm.module.css";
import { Exercise, formsFunctions } from "../../types";

const ExerciseForm: React.ForwardRefRenderFunction<
  formsFunctions,
  {
    forms: string[];
    setForms: any;
    setError: any;
    i: number;
    edit: Exercise | undefined;
  }
> = (props, ref) => {
  const [exerciseName, setExerciseName] = useState<string>();
  const [muscleTarget, setMuscleTarget] = useState<string[]>();
  const [sets, setSets] = useState<number>();
  const [reps, setReps] = useState<number>();
  const [restTime, setRestTime] = useState<number>();

  useImperativeHandle(ref, () => ({ errorCheck, resetState, createExercise }));

  const errorCheck = () => {
    // Make all inputs required
    if (
      !exerciseName ||
      muscleTarget?.length === 0 ||
      !sets ||
      !reps ||
      (!restTime && props.i === props.forms.length - 1)
    ) {
      props.setError("All fields are required");
      throw "Add exercise block error";
    }

    // Input validation: Sets = 0-20, Reps = 0-100, Rest Time = 0-1000
    if (sets > 20 || sets < 0) {
      props.setError("Sets must be between 0 and 20");
      throw "Add exercise block error";
    } else if (reps > 100 || reps < 0) {
      props.setError("Reps must be between 0 and 100");
      throw "Add exercise block error";
    } else if (restTime && (restTime > 1000 || restTime < 0)) {
      props.setError("Rest Time must be between 0 and 1000");
      throw "Add exercise block error";
    }

    return;
  };

  const createExercise = () => {
    const exercise: Exercise = {
      id: props.forms[props.i],
      name: exerciseName!,
      muscleTarget: muscleTarget!,
      sets: sets!,
      reps: reps!,
      restTime: restTime!,
    };

    return exercise;
  };

  const resetState = () => {
    setExerciseName("");
    setMuscleTarget([]);
    setSets(undefined);
    setReps(undefined);
    setRestTime(undefined);
  };

  const createLinkedExercise = () => {
    let newList = props.forms.slice();
    newList.push(uuidv4());
    props.setForms(newList);
    setRestTime(undefined);
  };

  const deleteLinkedExercise = (i: number) => {
    let newList = props.forms.slice();
    newList.splice(i, 1);
    props.setForms(newList);
  };

  useEffect(() => {
    if (props.edit !== undefined) {
      setExerciseName(props.edit.name);
      setMuscleTarget(props.edit.muscleTarget);
      setSets(props.edit.sets);
      setReps(props.edit.reps);
      setRestTime(props.edit.restTime);
    }

    return () => {
      resetState();
    };
  }, [props.edit]);

  return (
    <>
      <IonRow className="ion-margin-top">
        <IonItem className={cn("fields", "mobileWidth")}>
          <IonLabel position="stacked">Exercise Name</IonLabel>
          <IonInput
            value={exerciseName}
            onIonChange={(e) => setExerciseName(e.detail.value!)}
          ></IonInput>
        </IonItem>
      </IonRow>
      <IonRow>
        <IonItem className={cn("fields", "ion-margin-top", "mobileWidth")}>
          <IonLabel position="stacked">Muscle Target</IonLabel>
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
          <IonLabel position="stacked">Sets</IonLabel>
          <IonInput
            type="number"
            value={sets}
            onIonChange={(e) => setSets(parseInt(e.detail.value!))}
          ></IonInput>
        </IonItem>
      </IonRow>
      <IonRow>
        <IonItem className={cn("fields", "mobileWidth")}>
          <IonLabel position="stacked">Reps</IonLabel>
          <IonInput
            type="number"
            value={reps}
            onIonChange={(e) => setReps(parseInt(e.detail.value!))}
          ></IonInput>
        </IonItem>
      </IonRow>
      <IonRow>
        <IonItem
          className={cn("fields", "mobileWidth")}
          disabled={!(props.i === props.forms.length - 1)}
        >
          <IonLabel position="stacked">Rest Time</IonLabel>
          <IonInput
            type="number"
            value={restTime}
            onIonChange={(e) => setRestTime(parseInt(e.detail.value!))}
          ></IonInput>
        </IonItem>
      </IonRow>
      <IonRow className="ion-justify-content-center">
        {props.i === props.forms.length - 1 ? (
          <IonButton color="light" onClick={createLinkedExercise}>
            <IonIcon icon={unlink} size="large" color="medium" />
          </IonButton>
        ) : (
          <IonButton
            color="medium"
            onClick={() => deleteLinkedExercise(props.i + 1)}
          >
            <IonIcon icon={link} size="large" color="light" />
          </IonButton>
        )}
      </IonRow>
    </>
  );
};

export default forwardRef(ExerciseForm);
