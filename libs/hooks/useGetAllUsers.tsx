import { getAllUsersBro } from "@/libs/api/services/user.api";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
const useGetAllUsers = () => {
  const [studentName, setStudentName] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [branchId, setBranchId] = useState<number | null>(null);

  const { refetch, isFetching, data } = useQuery({
    queryKey: ["user-list", studentName, currentPage, branchId],
    queryFn: async () => {
      const response = await getAllUsersBro({
        studentName,
        pageNumber: currentPage,
        branchId,
      });
      return response;
    },
    enabled: false,
  });

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    event.preventDefault();
    setCurrentPage(value);
  };

  useEffect(() => {
    if (studentName || branchId || currentPage) {
      refetch();
    }
  }, [studentName, currentPage, branchId]);

  return {
    isFetching,
    refetch,
    currentPage,
    handleChange,
    setBranchId,
    userList: data?.response ?? [],
  };
};

export default useGetAllUsers;
