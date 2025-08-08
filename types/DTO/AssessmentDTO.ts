export type AssessmentDTO = {
  id: number;
  type: string;
  title: string;
  passingScore: number;
};

export type StudentAssessmentDto = {
  id: number;
  firstName: string;
  lastName: string;
  assessmentId: number;
  completedDate: string;
  isPassed: boolean;
  score: number;
  totalQuestions: number;
  assessmentType: string;
  studentId: string;
};
