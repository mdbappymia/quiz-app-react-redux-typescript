import { initializeAuthentication } from "../auth/firebase.config";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { setError, setIsLoading, setUser } from "../redux/actions/userAction";
import { useEffect } from "react";

initializeAuthentication();
const useFirebase = () => {
  const dispatch = useDispatch();
  const auth = getAuth();
  const googleSignIn = () => {
    dispatch(setIsLoading(true));
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result: any) => {
        dispatch(setUser(result.user));
      })
      .catch((e) => {
        console.log(e.message);
      })
      .finally(() => dispatch(setIsLoading(false)));
  };
  // logout
  const logOut = () => {
    signOut(auth).then(() => {
      setUser({});
      setError("");
    });
  };
  // manage auth user
  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user));
        dispatch(setError(""));
      } else {
        dispatch(setUser({}));
      }
      dispatch(setIsLoading(false));
      return () => unsubscribed;
    });
  }, [auth, dispatch]);
  return { googleSignIn, logOut };
};

export default useFirebase;
