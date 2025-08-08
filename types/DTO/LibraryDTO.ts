export type GetVideoByPackageDTO = {
  id: number;
  fileName: string;
  videoUrl: string;
  thumbnailUrl: string;
};

export type GetFileAndHandoutByPackageDTO = {
  id: number;
  fileName: string;
  filePath: string;
  type: number;
  thumbnail: string;
};
