export type LessonDTO = {
  id: number;
  name: string;
  description: string | null;
  curriculumId: number;
  filePath: string | null;
  fileName: string | null;
  isDraft: boolean;
  typeName: "File" | "Video" | "Lecture" | string;
  typeId: number;
  isActive: boolean;
  instructorName: string | null;
  instructorId: number | null;
  zoomSchedule: string | null;
  isCompleted: boolean;
};

export type TopicDTO = {
  id: number;
  name: string;
  instructorId: number | null;
  isPostpone: boolean;
  dateStart: string;
  lessons: LessonDTO[];
};

export type CurriculumDTO = {
  id: number;
  name: string;
  courseId: number;
  topics: TopicDTO[];
};

export type CourseDTO = {
  id: number;
  name: string;
  description: string;
  filePath: string | null;
  thumbnailUrl: string;
  fileName: string | null;
  landingPageUrl: string | null;
  status: number;
  curriculums: number;
  lessons: number;
  isEnrolled: boolean;
  isFree: boolean;
  packages: any;
};

export type CourseContentDTO = {
  course: CourseDTO;
  curriculum: CurriculumDTO[];
  lesson: LessonDTO[];
};

export type PublishedDTO = {
  id: number;
  dateCreated: string;
  name: string;
  description: string;
  thumbnailUrl: string;
  filePath: any;
  fileName: string;
  status: number;
  landingPageUrl: any;
  isEnrolled: boolean;
  curriculum: number;
  lessons: number;
  totalTopics: number;
  totalLesson: number;
  isFree: boolean;
  packages: string;
};
