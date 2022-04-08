import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonModal,
  IonRow,
  IonTitle,
  IonToolbar,
  IonMenuToggle,
  IonPopover,
} from "@ionic/react";
import styles from "./SetupWeek.module.css";
import BackHeader from "../../components/BackHeader/BackHeader";
import { useState, useRef } from "react";
import { Workout } from "../../types";
import cn from "classnames";
import LinkWorkout from "../LinkWorkout/LinkWorkout";

const SetupWeek: React.FC<{
  showModal: boolean;
  setShowModal: any;
  workoutList: Workout[];
}> = (props) => {
  const [showLinkWorkoutModal, setShowLinkWorkoutModal] =
    useState<boolean>(false);
  const [startDate, setStartDate] = useState<string>();
  const [duration, setDuration] = useState<number>();
  const parentModal = useRef<any>();

  const days: string[] = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const addSplit = () => {};

  return (
    <>
      <IonModal
        mode="ios"
        isOpen={props.showModal}
        onDidDismiss={() => props.setShowModal(false)}
        ref={parentModal}
      >
        <IonContent>
          <BackHeader exitFunction={props.setShowModal} />
          <IonGrid fixed={true} className={styles.paddingBottom}>
            <IonRow>
              <IonItem className={cn("fields", "mobileWidth")}>
                <IonLabel position="stacked">Start Date</IonLabel>
                <IonInput
                  value={startDate}
                  type="date"
                  onIonChange={(e) => setStartDate(e.detail.value!)}
                ></IonInput>
              </IonItem>
            </IonRow>
            <IonRow>
              <IonItem className={cn("fields", "mobileWidth")}>
                <IonLabel position="stacked"># of Weeks</IonLabel>
                <IonInput
                  type="number"
                  value={duration}
                  onIonChange={(e) => setDuration(parseInt(e.detail.value!))}
                ></IonInput>
              </IonItem>
            </IonRow>
            {days.map((day: string, i: number) => {
              return (
                <IonRow
                  className="mobileWidth ion-padding ion-align-items-center"
                  key={i}
                >
                  <IonCol size="5">{day}</IonCol>
                  <IonCol size="7">
                    <IonButton
                      color="secondary"
                      size="small"
                      onClick={() => setShowLinkWorkoutModal(true)}
                    >
                      Link Workout
                    </IonButton>
                  </IonCol>
                </IonRow>
              );
            })}
          </IonGrid>
        </IonContent>
        <IonButton
          expand="block"
          className={cn("fixedButton", "mobileWidth")}
          onClick={addSplit}
        >
          COMPLETE
        </IonButton>
      </IonModal>

      <LinkWorkout
        showModal={showLinkWorkoutModal}
        setShowModal={setShowLinkWorkoutModal}
        parentModal={parentModal}
        workoutList={props.workoutList}
      />
    </>
  );
};

export default SetupWeek;
