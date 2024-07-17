import { IUser } from "../interfaces/users";
import { getHousehold } from "../lib/actions/householdActions";

export const useGetHousehold = () => {

    const fetchHouseholdData = async (user: IUser) => {
        try {
          if (user) {
            const households = await getHousehold(user.households);
            return households[0];
          }
        } catch (e) {
          console.log(e);
        }
      };
    
        return { fetchHouseholdData };
}