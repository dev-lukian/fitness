import { IonContent, IonGrid, IonModal, IonRow } from "@ionic/react";
import styles from "./LinkWorkout.module.css";
import BackHeader from "../../components/BackHeader/BackHeader";
import { useState } from "react";
import { Workout } from "../../types";
import cn from "classnames";
import WorkoutItem from "../../components/WorkoutItem/WorkoutItem";

const LinkWorkout: React.FC<{
  showModal: boolean;
  setShowModal: any;
  parentModal: any;
  workoutList: Workout[];
  setClickedWorkout: any;
}> = (props) => {
  return (
    <>
      <IonModal
        mode="ios"
        isOpen={props.showModal}
        onDidDismiss={() => props.setShowModal(false)}
        presentingElement={props.parentModal.current}
        swipeToClose={true}
      >
        <IonContent>
          <BackHeader exitFunction={props.setShowModal} />
          <IonGrid fixed={true} className={styles.paddingBottom}>
            {props.workoutList.map((workout: Workout, i: number) => {
              return (
                <IonRow key={i} className="mobileWidth">
                  <WorkoutItem
                    workout={workout}
                    setClickedWorkout={props.setClickedWorkout}
                    setShowLinkedWorkoutModal={props.setShowModal}
                  />
                </IonRow>
              );
            })}
          </IonGrid>
        </IonContent>
      </IonModal>
    </>
  );
};

export default LinkWorkout;
