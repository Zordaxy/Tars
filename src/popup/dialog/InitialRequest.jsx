import { DialogContentText } from "@mui/material";
import { useDialog } from "../../content-script/dialogContext";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import PersonalData from "../../data/PersonalData";
import Questions from "../../data/Questions";

export default function FeedbackRequest() {
  const { dialogHeader } = useDialog();

  const CustomTextField = styled(TextField)(({ theme }) => ({
    "& input": {
      boxShadow: "none !important",
      outlineWidth: "0 !important",
    },
    "& textarea": {
      boxShadow: "none !important",
      outlineWidth: "0 !important",
    },
  }));

  return (
    <>
      <DialogContentText>
        Set up your account
      </DialogContentText>

      {getPersonalInfo().map((question) => (
        <CustomTextField
          required
          id={question.id.toString()}
          name={question.id.toString()}
          label={question.text}
          variant="standard"
          defaultValue={question.answer}
          fullWidth
        />
      ))}

      {/* Add multiple empty lines */}
      <br />
      <br />

      <DialogContentText>
        Provide additional information
      </DialogContentText>
      {getQuestions().map((question) => (
        <CustomTextField
          id={question.id.toString()}
          name={question.id.toString()}
          label={question.text}
          defaultValue={question.answer}
          variant="standard"
          fullWidth
          multiline
        />
      ))}
    </>
  );
}

function getQuestions() {
  const storedAnswers = JSON.parse(localStorage.getItem("answers") || "[]");

  return Questions.questions.map((question) => {
    const stored = storedAnswers.find((answer) => answer.id === question.id);
    return {
      id: question.id,
      text: question.text,
      answer: stored?.answer || "",
    };
  });
}

function getPersonalInfo() {
  return PersonalData.questions.map((question) => ({
    id: question.id,
    text: question.text,
    answer: localStorage.getItem(question.id) || "",
  }));
}
