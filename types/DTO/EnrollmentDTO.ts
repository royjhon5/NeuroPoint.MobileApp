export type EnrollmentDTO = {
  id: number;
  courseId: number;
  dateCreated: string;
  name: string;
  description: string;
  thumbnailUrl: string;
  isEnrolled: boolean;
  curriculum: number;
  totalLesson: number;
  totalCompletedLesson: number;
  totalTopics: number;
  isFree: boolean;
  isCourseDeleted: boolean;
};
