import { api } from "src/boot/axios";

export const listTasks = async (projectId) => {
  return (await api.get("/task?projectId=" + encodeURIComponent(projectId)))
    .data;
};

export const setTaskDone = async (taskId, done) => {
  return (
    await api.put("/task/" + encodeURIComponent(taskId), {
      doneAt: done ? new Date() : null,
    })
  ).data;
};

export const editTask = async (taskId, description) => {
  return (
    await api.put("/task/" + encodeURIComponent(taskId), {
      description,
    })
  ).data;
};

export const createTask = async (projectId, description) => {
  return (
    await api.post("/task/", {
      projectId,
      description,
    })
  ).data;
};

export const deleteTask = async (taskId) => {
  await api.delete("/task/" + encodeURIComponent(taskId));
};
