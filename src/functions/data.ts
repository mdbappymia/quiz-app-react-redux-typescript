import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../auth/firebase.config";

export const getAllQuizes = async (approve: boolean) => {
  const quizes: any = [];
  const q = query(collection(db, "quizes"), where("approve", "==", approve));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    quizes.push({ ...doc.data(), qid: doc.id });
  });
  return quizes;
};

export const getManageQuestion = async () => {
  const quizes: any = [];
  const q = query(collection(db, "quizes"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    quizes.push({ ...doc.data(), qid: doc.id });
  });
  return quizes;
};
