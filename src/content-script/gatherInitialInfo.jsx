import showModal from "../utils/showModal";
import { DIALOG_TYPE } from "./dialogContext";

export function gatherInitialInfo() {
  const promise = new Promise((resolve) => {
    const title = "Welcome to Jobseeker Assistant";
    showModal(title, null, resolve, DIALOG_TYPE.INITIAL);
  });

  return promise;
}

export function gatherInitialQuestions() {
  const promise = new Promise((resolve) => {
    const title = "Welcome to Jobseeker Assistant";
    showModal(title, null, resolve, DIALOG_TYPE.QUESTIONS);
  });

  return promise;
}
