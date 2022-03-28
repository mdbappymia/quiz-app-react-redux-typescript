import { collection, getDocs } from "firebase/firestore";
import { db } from "../auth/firebase.config";

export const getAllQuizes = async () => {
  const quizes: any = [];
  const querySnapshot = await getDocs(collection(db, "quizes"));
  querySnapshot.forEach((doc) => {
    quizes.push(doc.data());
  });
  return quizes;
};
