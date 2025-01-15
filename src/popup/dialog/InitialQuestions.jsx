import { DialogContentText } from "@mui/material";
import { useDialog } from "../../content-script/dialogContext";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import PersonalData from "../../data/PersonalData";
import Questions from "../../data/Questions";

export default function InitialQuestions() {
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
    "& label": {
      fontSize: "16px !important",
      marginTop: "7px !important",
    },
  }));

  return (
    <>
      <DialogContentText>
        Jobseeker Assistant automates conversations with recruiters on your behalf, learning about your writing style and job preferences over time.
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

      <CustomTextField
        id="info"
        name="info"
        label="Is there anything else you’d like to share?"
        fullWidth
        variant="standard"
        defaultValue={localStorage.getItem("info") || ""}
        multiline
      />
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
