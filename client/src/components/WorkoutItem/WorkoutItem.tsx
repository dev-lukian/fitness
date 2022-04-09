import {
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
} from "@ionic/react";
import styles from "./WorkoutItem.module.css";
import cn from "classnames";
import { Workout } from "../../types";
import { pencil, remove } from "ionicons/icons";

const WorkoutItem: React.FC<{
  workout: Workout;
  setClickedWorkout: any;
  setShowCreateWorkoutModal?: any;
  setShowLinkedWorkoutModal?: any;
}> = (props) => {
  const click = () => {
    props.setClickedWorkout(props.workout);
    if (props.setShowCreateWorkoutModal) {
      props.setShowCreateWorkoutModal(true);
    }
    if (props.setShowLinkedWorkoutModal) {
      props.setShowLinkedWorkoutModal(false);
    }
  };

  return (
    <IonItemSliding disabled={!props.setShowCreateWorkoutModal}>
      <IonItemOptions side="start">
        <IonItemOption onClick={() => console.log("edit")} color="medium">
          <IonIcon slot="icon-only" icon={pencil} />
        </IonItemOption>
        <IonItemOption onClick={() => console.log("delete")} color="danger">
          <IonIcon slot="icon-only" icon={remove} />
        </IonItemOption>
      </IonItemOptions>

      <IonItem
        className="mobileWidth"
        lines="full"
        shape="round"
        button={true}
        detailIcon="none"
        onClick={click}
      >
        <IonLabel>{props.workout.name}</IonLabel>
        <div className={cn("ion-text-end", styles.workoutInfo)}>
          <IonLabel>{props.workout.splitType}</IonLabel>
          <IonLabel>
            {props.workout.exerciseBlocks.length} Exercise
            {props.workout.exerciseBlocks.length > 1 ? "s" : null}
          </IonLabel>
        </div>
      </IonItem>
    </IonItemSliding>
  );
};

export default WorkoutItem;
