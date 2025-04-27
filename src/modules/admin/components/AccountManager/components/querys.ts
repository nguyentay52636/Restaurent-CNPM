import { getAllUserAPI } from '@/lib/apis/userApi';
import { useQuery } from '@tanstack/react-query';

export const useGetAllUserQuery = () => {
  const handleGetAllUser = async () => {
    try {
      const data = await getAllUserAPI();
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
    }
  };

  const query = useQuery({
    queryKey: ['users'],
    queryFn: handleGetAllUser,
  });

  return query;
};
