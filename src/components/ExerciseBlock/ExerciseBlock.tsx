import {
  IonCard,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonProgressBar,
  IonAccordionGroup,
  IonAccordion,
} from "@ionic/react";
import styles from "./ExerciseBlock.module.css";
import cn from "classnames";
import { Exercise } from "../../types";

const ExerciseBlock: React.FC<{ exercise: Exercise; order: number }> = (
  props
) => {
  return (
    <IonCard className={cn("card", "mobileWidth")}>
      <IonCardContent>
        <IonAccordionGroup>
          <IonAccordion readonly={false}>
            <IonGrid slot="header">
              <IonRow className="ion-align-items-center">
                <IonCol size="2">
                  <div className={styles.leftIcon}>{props.order}</div>
                </IonCol>
                <IonCol className={styles.exerciseTitle} size="7">
                  {props.exercise.name}
                </IonCol>
                <IonCol
                  className={cn("ion-text-end", styles.exerciseInfo)}
                  size="3"
                >
                  <div>{props.exercise.sets} sets</div>
                  <div>{props.exercise.reps} reps</div>
                  <div>{props.exercise.restTime} secs</div>
                </IonCol>
              </IonRow>
              <IonProgressBar color="light" />
            </IonGrid>

            <IonGrid slot="content">hi</IonGrid>
          </IonAccordion>
        </IonAccordionGroup>
      </IonCardContent>
    </IonCard>
  );
};

export default ExerciseBlock;
