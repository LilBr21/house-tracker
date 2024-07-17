import { getUser } from "../lib/actions/userActions";

export const useGetUser = () => {

    const fetchUserData = async () => {
        try {
          const fetchedUser = await getUser();
          return fetchedUser[0];
        } catch (e) {
          console.log(e);
        }
      };

        return { fetchUserData };
}