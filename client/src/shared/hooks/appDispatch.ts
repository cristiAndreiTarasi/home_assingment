import { useDispatch as reduxUseDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";

export const useAppDispatch = () => reduxUseDispatch<AppDispatch>();
