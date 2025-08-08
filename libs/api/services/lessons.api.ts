import { BaseResponseType } from "../../../types/BaseResponse";
import { LessonsDTO } from "../../../types/DTO/LessonDTO";
import httpHelper from "../httpAxios";

const baseAPI = "Lesson";

export const getStudentQuizAnswers = async (lessonId: number) => {
  const { data: response } = await httpHelper.get<
    BaseResponseType<
      {
        questionId: number;
        answerId: number;
        answerName: string;
      }[]
    >
  >(`${baseAPI}/get-student-quiz-answers?lessonId=${lessonId}`);
  return response;
};

export const GetLessonQuestions = async (id: number) => {
  try {
    const { data: response } = await httpHelper.get<
      BaseResponseType<LessonsDTO[]>
    >(`${baseAPI}/get-lesson-questions?lessonId=${id}`);
    return response;
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};

export const submitQuizAnswer = async (params: {
  lessonId: number;
  answers: { questionId: number; answerId: number; answerName: string }[];
  assessmentId: number;
}) => {
  const { data: response } = await httpHelper.post<BaseResponseType<boolean>>(
    `${baseAPI}/submit-quiz-answers`,
    params
  );

  return response;
};
