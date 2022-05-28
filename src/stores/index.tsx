import { createContext } from "react";
import { AttendeesStore } from "./store";

export const rootStoreContext = createContext({
    attendeesStore: new AttendeesStore()
});
