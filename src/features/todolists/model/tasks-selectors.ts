import {RootState} from "../../../app/store.ts";
import {tasksState} from "../../../app/App.tsx";

export const selectTasks = (state: RootState): tasksState => state.tasks