import {
  IonCard,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonProgressBar,
  IonAccordionGroup,
  IonAccordion,
  IonIcon,
  IonButton,
} from "@ionic/react";
import styles from "./ExerciseBlock.module.css";
import cn from "classnames";
import { Exercise } from "../../types";
import { useLongPress } from "react-use";
import { arrowUndoCircle, removeCircle } from "ionicons/icons";
import { useState } from "react";

const ExerciseBlock: React.FC<{
  exerciseBlock: Exercise[];
  order: number;
  readOnly: boolean;
  edit: any;
  remove: any;
}> = (props) => {
  const [overlay, setOverlay] = useState<boolean>(false);

  const onLongPress = () => {
    setOverlay(!overlay);
  };

  const longPressOptions = {
    isPreventDefault: true,
    delay: 300,
  };

  const longPressEvent = useLongPress(onLongPress, longPressOptions);

  return (
    <div className={cn("mobileWidth", styles.wrapper)}>
      {overlay && (
        <div className={styles.overlay}>
          <IonButton
            color="medium"
            fill="clear"
            className={styles.editButton}
            onClick={() => props.edit([props.exerciseBlock, props.order - 1])}
          >
            <IonIcon icon={arrowUndoCircle} size="large" />
          </IonButton>
          <IonButton
            color="danger"
            fill="clear"
            className={styles.removeButton}
            onClick={() => props.remove(props.order - 1)}
          >
            <IonIcon icon={removeCircle} size="large" />
          </IonButton>
        </div>
      )}
      <IonCard {...longPressEvent} className={cn("card", "mobileWidth")}>
        <IonCardContent>
          <IonAccordionGroup>
            <IonAccordion readonly={props.readOnly}>
              <IonGrid slot="header">
                {props.exerciseBlock.map((exercise: Exercise, i: number) => {
                  return (
                    <IonRow
                      className="ion-align-items-center"
                      key={exercise.id}
                    >
                      <IonCol size="2">
                        <div className={styles.leftIcon}>
                          {props.order}
                          {props.exerciseBlock.length > 1 && "." + (i + 1)}
                        </div>
                      </IonCol>
                      <IonCol className={styles.exerciseTitle} size="7">
                        {exercise.name}
                      </IonCol>
                      <IonCol
                        className={cn("ion-text-end", styles.exerciseInfo)}
                        size="3"
                      >
                        <div>{exercise.sets} sets</div>
                        <div>{exercise.reps} reps</div>
                        {i === props.exerciseBlock.length - 1 && (
                          <div>{exercise.restTime} secs</div>
                        )}
                      </IonCol>
                    </IonRow>
                  );
                })}

                <IonProgressBar color="light" />
              </IonGrid>

              <IonGrid slot="content"></IonGrid>
            </IonAccordion>
          </IonAccordionGroup>
        </IonCardContent>
      </IonCard>
    </div>
  );
};

export default ExerciseBlock;
