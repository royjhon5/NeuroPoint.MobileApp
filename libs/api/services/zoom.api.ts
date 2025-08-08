import { BaseResponseType } from "../../../types/BaseResponse";
import { GetZoomScheduleByLessonDto } from "../../../types/DTO/GetZoomScheduleByLesson.dto";
import {
  InstructorScheduleDto,
  StudentScheduleDto,
} from "../../../types/DTO/Schedule.dto";
import httpHelper from "../httpAxios";

const baseAPI = "Zoom";

export const getVideoSdkSignature = async (params: {
  meetingNumber: string;
  role: number;
}) => {
  const { data: response } = await httpHelper.get<BaseResponseType<string>>(
    `${baseAPI}/get-signature?meetingNumber=${params.meetingNumber}&role=${params.role}`
  );
  return response;
};

export const saveZoomSchedule = async (params: {
  startTime: string;
  lessonId: number;
}) => {
  const { data: response } = await httpHelper.put<BaseResponseType<boolean>>(
    `${baseAPI}/schedule-zoom`,
    params
  );
  return response;
};

export const createStudentCoachingSchedule = async (params: {
  curriculumTopicId: number;
  title: string;
  studentId: string;
  instructorId: string;
  dateStart: string;
  dateEnd: string;
}) => {
  console.log("instructorId: ", params);
  const { data: response } = await httpHelper.post<BaseResponseType<number>>(
    `${baseAPI}/create-student-schedule`,
    params
  );
  return response;
};

export const getStudentSchedules = async (curriculumTopicId: number) => {
  const { data: response } = await httpHelper.get<
    BaseResponseType<StudentScheduleDto[]>
  >(`${baseAPI}/student-zoom-schedule?curriculumTopicId=${curriculumTopicId}`);
  return response;
};

export const getInstructorSchedules = async (instructorId: string) => {
  const { data: response } = await httpHelper.get<
    BaseResponseType<InstructorScheduleDto[]>
  >(`${baseAPI}/instructor-zoom-schedule?userId=${instructorId}`);
  return response;
};
export const getCourseStudents = async (courseId: number) => {
  const { data: response } = await httpHelper.get<
    BaseResponseType<{ name: string; id: string }[]>
  >(`${baseAPI}/get-course-students?courseId=${courseId}`);
  return response;
};

export const getZoomScheduleByLesson = async (lessonId: number) => {
  const { data: response } = await httpHelper.get<
    BaseResponseType<GetZoomScheduleByLessonDto>
  >(`${baseAPI}/get-zoom-schedule-by-lesson/${lessonId}`);

  return response;
};
