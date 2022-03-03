import { IonItem, IonLabel } from "@ionic/react";
import styles from "./WorkoutItem.module.css";
import cn from "classnames";
import { Workout } from "../../types";

const WorkoutItem: React.FC<{
  workout: Workout;
}> = (props) => {
  return (
    <IonItem className="mobileWidth" lines="full" shape="round">
      <IonLabel>{props.workout.name}</IonLabel>
      <div className={cn("ion-text-end", styles.workoutInfo)}>
        <IonLabel>{props.workout.split}</IonLabel>
        <IonLabel>
          {props.workout.exercises.length} Exercise
          {props.workout.exercises.length > 1 ? "s" : null}
        </IonLabel>
      </div>
    </IonItem>
  );
};

export default WorkoutItem;
