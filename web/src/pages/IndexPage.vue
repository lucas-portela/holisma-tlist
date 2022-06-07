<template>
  <q-page class="q-pa-lg">
    <div class="row q-col-gutter-lg">
      <div class="col-md-4" v-for="project of projects" :key="project.id">
        <ProjectCard
          :project="project"
          @refetch-projects="fetchProjects"
          style="height: 100%"
        />
      </div>
      <div v-if="projects.length == 0" class="text-body1 text-grey-8">
        No projects created yet. Create a new project now!<br />
        <q-btn
          label="Create New Project"
          color="primary"
          icon="mdi-plus"
          class="q-mt-lg"
          @click="addProject()"
        />
      </div>
    </div>
    <q-page-sticky position="bottom-right" :offset="[40, 40]">
      <q-btn fab icon="add" color="primary" @click="addProject()" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { defineComponent, reactive, watchEffect } from "vue";
import { useQuasar } from "quasar";
import ProjectCard from "src/components/ProjectCard.vue";
import { useUserStore } from "src/stores/user-store";
import { createProject, listProjects } from "src/services/projects";
import { apiErrorOrDefault } from "src/boot/axios";

export default defineComponent({
  name: "IndexPage",
  components: { ProjectCard },
  setup() {
    const $q = useQuasar();
    const user = useUserStore();
    const projects = reactive([]);

    const fetchProjects = async () => {
      $q.loading.show();
      try {
        const fetchedProjects = (await listProjects()).sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        projects.splice(0);
        projects.push(...fetchedProjects);
      } catch (err) {
        $q.notify({
          type: "negative",
          message: apiErrorOrDefault(
            err,
            "Could not fetch project list. Please try again!"
          ),
        });
      }
      $q.loading.hide();
    };

    const addProject = () => {
      $q.dialog({
        title: "Create Project",
        prompt: {
          label: "Project Name",
          model: "",
          isValid: (val) => val.trim().length > 0,
          type: "text",
        },
        cancel: true,
        persistent: true,
      }).onOk(async (name) => {
        $q.loading.show();
        try {
          await createProject(name);
          fetchProjects();
        } catch (err) {
          console.log(err);
          $q.notify({
            type: "negative",
            message: apiErrorOrDefault(
              err,
              "Could not create project. Please try again!"
            ),
          });
        }
        $q.loading.hide();
      });
    };

    watchEffect(() => {
      if (user.isAuthenticated) fetchProjects();
    });

    return {
      user,
      projects,
      fetchProjects,
      addProject,
    };
  },
});
</script>
