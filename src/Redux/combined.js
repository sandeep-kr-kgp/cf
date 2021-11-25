import { combineReducers } from "redux";
import { updateColor } from "./reducer";
export const allReducers = combineReducers(
    {
        color: updateColor
    }
)