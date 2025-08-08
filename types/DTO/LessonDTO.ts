export type LessonsDTO = {
  id: number;
  assessmentId: number;
  question: string;
  lessonId: number;
  choices: ChoicesDTO[];
};

export type ChoicesDTO = {
  id: number;
  choice: string;
  isCorrect: boolean;
};

export type StudentAnswerTypeDTO = {
  questionId: number;
  answerId: number;
  answerName: string;
};
