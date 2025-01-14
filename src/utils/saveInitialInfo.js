import PersonalData from "../data/PersonalData";
import Questions from "../data/Questions";

export function saveInitialInfo(formJson) {
  PersonalData.questions.forEach((question) => {
    localStorage.setItem(question.id, formJson[question.id]);
  });

  localStorage.setItem("info", formJson.info);
}

export function saveInitialQuestions(formJson) {
  const answers = Questions.questions.map((question) => ({
    id: question.id,
    answer: formJson[question.id],
  }));

  localStorage.setItem("answers", JSON.stringify(answers));
}
