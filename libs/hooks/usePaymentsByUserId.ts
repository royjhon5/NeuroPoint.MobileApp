import { useQuery } from "@tanstack/react-query";
import { getPaymentsByUserId } from "../api/services/payment.api";

const usePaymentsByUserId = (userId: string) => {
  const { isFetching, refetch, data } = useQuery({
    queryKey: ["payments-by-user"],
    queryFn: async () => {
      const response = await getPaymentsByUserId(userId);
      return response;
    },
    enabled: !!userId,
  });

  return {
    isFetching,
    paymentsByUserId: data?.response || [],
    refetchPaymentByUser: refetch,
  };
};
export default usePaymentsByUserId;
