import { addNewEvent } from "../../../gateway/apiEndpoints";

const upLoadNewTask = async (newTask) => {
  try {
    await addNewEvent(newTask);
  } catch (error) {
    throw new Error(error);
  }
};

export { upLoadNewTask };
