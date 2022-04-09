import {
  IonButton,
  IonContent,
  IonGrid,
  IonIcon,
  IonModal,
  IonReorder,
  IonReorderGroup,
  IonToast,
} from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import cn from "classnames";
import { v4 as uuidv4 } from "uuid";
import styles from "./CreateExerciseBlock.module.css";
import BackHeader from "../../components/BackHeader/BackHeader";
import { Exercise, formsFunctions } from "../../types";
import ExerciseForm from "../../components/ExerciseForm/ExerciseForm";
import { swapVertical } from "ionicons/icons";

const CreateExerciseBlock: React.FC<{
  parentModal: any;
  showModal: boolean;
  setShowModal: any;
  exerciseBlockList: Exercise[][];
  setExerciseBlockList: any;
  editBlock: [Exercise[], number] | undefined;
  setEditBlock: any;
}> = (props) => {
  const [error, setError] = useState<string>();
  const [forms, setForms] = useState<string[]>([uuidv4()]);
  const formsRef = useRef<formsFunctions[]>([]);

  const resetState = () => {
    if (props.editBlock) {
      setForms([uuidv4()]);
      console.log("Reset forms");
      for (let i = 0; i < formsRef.current.length; i++) {
        formsRef.current[i].resetState();
      }
      formsRef.current = [];
    }

    setError("");
    props.setEditBlock();
  };

  const addExercise = (edit: boolean) => {
    let stop = false;

    for (let i = 0; i < formsRef.current.length; i++) {
      try {
        formsRef.current[i].errorCheck();
      } catch (e) {
        console.log(e);
        stop = true;
        break;
      }
    }

    if (stop) return;

    let exercise;
    let exerciseBlock: Exercise[] = [];

    for (let i = 0; i < formsRef.current.length; i++) {
      exercise = formsRef.current[i].createExercise();
      exerciseBlock = [...exerciseBlock, exercise];
    }

    let newList;

    if (edit) {
      newList = [...props.exerciseBlockList];
      newList[props.editBlock![1]] = exerciseBlock;
    } else {
      newList = [...props.exerciseBlockList, exerciseBlock];
    }

    console.log(newList);
    props.setExerciseBlockList(newList);
    props.setShowModal(false);
    resetState();
  };

  useEffect(() => {
    formsRef.current = formsRef.current.slice(0, forms.length);
  }, [forms]);

  useEffect(() => {
    if (props.editBlock) {
      let newForms: string[] = [];
      for (let i = 0; i < props.editBlock[0].length; i++) {
        newForms = [...newForms, props.editBlock[0][i]._id];
      }
      console.log(newForms);
      setForms(newForms);
    }
    return () => {
      setForms([uuidv4()]);
    };
  }, [props.showModal]);

  return (
    <IonModal
      mode="ios"
      isOpen={props.showModal}
      onDidDismiss={() => props.setShowModal(false)}
      presentingElement={props.parentModal.current}
      swipeToClose={true}
    >
      <IonContent>
        <BackHeader
          exitFunction={props.setShowModal}
          resetFunction={resetState}
        />
        <IonGrid fixed={true} className={styles.paddingBottom}>
          {forms.map((uuid: string, i: number) => {
            return (
              <ExerciseForm
                key={uuid}
                ref={(formRef: formsFunctions) => {
                  formsRef.current[i] = formRef;
                }}
                forms={forms}
                setForms={setForms}
                setError={setError}
                i={i}
                edit={props.editBlock ? props.editBlock[0][i] : props.editBlock}
              />
            );
          })}
        </IonGrid>
      </IonContent>
      <IonButton
        expand="block"
        className={cn("fixedButton", "mobileWidth")}
        onClick={
          props.editBlock ? () => addExercise(true) : () => addExercise(false)
        }
      >
        {props.editBlock ? "EDIT" : "ADD"}
      </IonButton>

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

export default CreateExerciseBlock;
