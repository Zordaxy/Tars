import showModal from "../utils/showModal";
import { DIALOG_TYPE } from "./dialogContext";

export default function gatherInitialInfo() {
  const promise = new Promise((resolve) => {
    const title = "Message from your chat bot";
    showModal(title, null, resolve, DIALOG_TYPE.INITIAL);
  });

  return promise;
}
