import { api } from "src/boot/axios";

export const listProjects = async () => {
  return (await api.get("/project")).data;
};

export const editProject = async (projectId, name) => {
  return (
    await api.put("/project/" + encodeURIComponent(projectId), {
      name,
    })
  ).data;
};

export const createProject = async (name) => {
  return (
    await api.post("/project/", {
      name,
    })
  ).data;
};

export const deleteProject = async (projectId) => {
  await api.delete("/project/" + encodeURIComponent(projectId));
};
