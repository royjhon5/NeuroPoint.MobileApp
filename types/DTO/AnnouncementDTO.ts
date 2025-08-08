export type AnnoucementDTO = {
  id: number;
  name: string;
  body: string;
  userId: string;
  createdBy: string;
  courseName: any;
  curriculumName: any;
  lessonName: any;
  dateCreated: string;
  replies: any[];
  attachments: Attachment[];
};

export interface Attachment {
  id: number;
  fileType: string;
  filePath: string;
  fileName: string;
}
