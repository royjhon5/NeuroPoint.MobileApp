import { useQuery } from "@tanstack/react-query";
import { getEbookByPackage } from "../api/services/library.api";

const useGetEbookByPackage = (id: number) => {
  const { refetch, data, isPending } = useQuery({
    queryKey: ["getebookbypackage", id],
    queryFn: async () => {
      const response = await getEbookByPackage(id);
      return response;
    },
  });

  return {
    isPending,
    refetchData: refetch,
    ebookbypackage: data?.response ? data.response : [],
  };
};

export default useGetEbookByPackage;
