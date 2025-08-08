export type StudentScheduleDto = {
  id: number;
  dateStart: string;
  dateEnd: string;
  lessonId: number;
  title: string;
  studentId: string;
}

export type InstructorScheduleDto = {
  id: number;
  dateStart: Date;
  dateEnd: Date;
  lessonId: number;
  title: string;
  instructorId: string;
}