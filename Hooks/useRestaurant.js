import { useContext } from "react";
import RestaurantContext from "@/Context/RestaurantProvider";

const useRestaurant = () => {
    return useContext(RestaurantContext)
}

export default useRestaurant;