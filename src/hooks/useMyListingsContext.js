import { useContext } from "react";
import MyListingsContext from "../context/MyListingsContext";

export default function useMyListingsContext() {
    return useContext(MyListingsContext);
}
