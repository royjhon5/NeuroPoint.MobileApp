import { useQuery } from "@tanstack/react-query";
import { GetAnnouncement } from "../api/services/announcement.api";

const useGetAnnouncement = () => {
  const { refetch, data, isPending } = useQuery({
    queryKey: ["announcement"],
    queryFn: async () => {
      const response = await GetAnnouncement();
      return response;
    },
  });

  return {
    isPending,
    refetchData: refetch,
    announcementdata: data?.response ? data.response : [],
  };
};

export default useGetAnnouncement;
