import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../auth/firebase.config";

export const approveQuiz = async (id: string) => {
  const quizRef = doc(db, "quizes", id);
  const updateField = {
    approve: true,
  };
  await updateDoc(quizRef, updateField);
  return { message: "OK" };
};

export const deleteQuiz = async (id: string) => {
  await deleteDoc(doc(db, "quizes", id));
  return { message: "OK" };
};
