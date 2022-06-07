<template>
  <q-card bordered class="project-card">
    <q-card-section class="row">
      <div class="text-h6">{{ project.name }}</div>
      <q-space></q-space>
      <div class="row project-actions">
        <q-btn
          round
          flat
          color="grey-8"
          size="sm"
          icon="mdi-plus-circle"
          @click="addTask()"
        />
        <q-btn
          round
          flat
          color="grey-8"
          size="sm"
          icon="mdi-pencil"
          @click="editProjectNameDescription()"
        />
        <q-btn
          round
          flat
          color="grey-8"
          size="sm"
          icon="delete"
          @click="removeProject()"
        />
      </div>
    </q-card-section>

    <q-separator inset />

    <q-card-section>
      <q-list separator>
        <template v-for="list in lists" :key="list.label">
          <q-item-label header>{{ list.label }}</q-item-label>
          <q-item
            v-for="task in tasks.filter(list.filter).sort(taskSorter)"
            :key="task.id"
            tag="label"
            class="task"
          >
            <q-tooltip v-if="task.doneAt">
              completed {{ momentsAgo(task.doneAt) }}
            </q-tooltip>
            <q-item-section side top>
              <q-checkbox
                v-model="task.done"
                color="cyan-9"
                @click="syncTasks()"
              />
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ task.description }}</q-item-label>
              <q-item-label caption lines="1">
                created {{ dateToStr(task.createdAt) }}
              </q-item-label>
            </q-item-section>

            <q-item-section side>
              <div class="row task-actions">
                <q-btn
                  round
                  flat
                  color="cyan-9"
                  size="sm"
                  icon="mdi-pencil"
                  @click="editTaskDescription(task)"
                />
                <q-btn
                  round
                  flat
                  color="negative"
                  size="sm"
                  icon="delete"
                  @click="removeTask(task)"
                />
              </div>
            </q-item-section>
          </q-item>
          <q-item
            tag="label"
            :disable="true"
            v-if="tasks.filter(list.filter).length == 0"
          >
            <q-item-section>
              <q-item-label class="text-caption">No tasks</q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<style lang="scss">
.project-card {
  .project-actions {
    opacity: 0;
  }
  &:hover .project-actions {
    opacity: 1;
  }
  .task {
    .task-actions {
      opacity: 0;
    }
    &:hover .task-actions {
      opacity: 1;
    }
  }
}
</style>

<script>
import moment from "moment";
import { useQuasar } from "quasar";
import { apiErrorOrDefault } from "src/boot/axios";
import { deleteProject, editProject } from "src/services/projects";
import {
  createTask,
  deleteTask,
  editTask,
  setTaskDone,
} from "src/services/task";
import { defineComponent, reactive } from "vue";

const lists = [
  { label: "To Do", filter: (task) => !task.doneAt, done: false },
  { label: "Done", filter: (task) => task.doneAt, done: true },
];

export default defineComponent({
  name: "ProjectCard",
  props: {
    project: {
      required: true,
      type: Object,
    },
  },
  emits: ["refetch-projects"],
  setup(props, ctx) {
    const $q = useQuasar();
    const tasks = reactive([]);

    const setTasks = (taskList) => {
      tasks.splice(0);
      tasks.push(...taskList);
      lists.forEach((list) => {
        tasks.filter(list.filter).forEach((task) => (task.done = list.done));
      });
    };

    const syncTasks = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 10));
        for (let task of tasks) {
          if (task.done && !task.doneAt)
            task.doneAt = (await setTaskDone(task.id, true)).doneAt;
          if (!task.done && task.doneAt)
            task.doneAt = (await setTaskDone(task.id, false)).doneAt;
        }
        setTasks([...tasks]);
      } catch (err) {
        console.log(err);
        $q.notify({
          type: "negative",
          message: apiErrorOrDefault(
            err,
            "Could not update task status. Please try again!"
          ),
        });
      }
    };

    const removeTask = (task) => {
      $q.dialog({
        title: "Delete Confirmation",
        message: "Are you sure you want to delete this task?",
        cancel: true,
        persistent: true,
      }).onOk(async () => {
        $q.loading.show();
        try {
          await deleteTask(task.id);
          tasks.splice(
            tasks.findIndex((t) => t.id == task.id),
            1
          );
        } catch (err) {
          console.log(err);
          $q.notify({
            type: "negative",
            message: apiErrorOrDefault(
              err,
              "Could not delete task. Please try again!"
            ),
          });
        }
        $q.loading.hide();
      });
    };

    const addTask = () => {
      $q.dialog({
        title: "Create Task",
        prompt: {
          label: "Description",
          model: "",
          isValid: (val) => val.trim().length > 0,
          type: "text",
        },
        cancel: true,
        persistent: true,
      }).onOk(async (description) => {
        $q.loading.show();
        try {
          const task = await createTask(props.project.id, description);
          task.done = false;
          tasks.push(task);
        } catch (err) {
          console.log(err);
          $q.notify({
            type: "negative",
            message: apiErrorOrDefault(
              err,
              "Could not create task. Please try again!"
            ),
          });
        }
        $q.loading.hide();
      });
    };

    const editTaskDescription = (task) => {
      $q.dialog({
        title: "Edit Task Description",
        prompt: {
          label: "Description",
          model: task.description,
          isValid: (val) => val.trim().length > 0,
          type: "text",
        },
        cancel: true,
        persistent: true,
      }).onOk(async (description) => {
        $q.loading.show();
        try {
          const updatedTask = await editTask(task.id, description);
          updatedTask.done = task.done;
          tasks.splice(
            tasks.findIndex((t) => t.id == task.id),
            1,
            updatedTask
          );
        } catch (err) {
          console.log(err);
          $q.notify({
            type: "negative",
            message: apiErrorOrDefault(
              err,
              "Could not edit task description. Please try again!"
            ),
          });
        }
        $q.loading.hide();
      });
    };

    const editProjectNameDescription = () => {
      $q.dialog({
        title: "Edit Project Name",
        prompt: {
          label: "Project Name",
          model: props.project.name,
          isValid: (val) => val.trim().length > 0,
          type: "text",
        },
        cancel: true,
        persistent: true,
      }).onOk(async (name) => {
        $q.loading.show();
        try {
          await editProject(props.project.id, name);
          ctx.emit("refetch-projects");
        } catch (err) {
          console.log(err);
          $q.notify({
            type: "negative",
            message: apiErrorOrDefault(
              err,
              "Could not edit project name. Please try again!"
            ),
          });
        }
        $q.loading.hide();
      });
    };

    const removeProject = () => {
      $q.dialog({
        title: "Delete Confirmation",
        message: `Are you sure you want to delete the project "${props.project.name}"?`,
        cancel: true,
        persistent: true,
      }).onOk(async () => {
        $q.loading.show();
        try {
          await deleteProject(props.project.id);
          ctx.emit("refetch-projects");
        } catch (err) {
          console.log(err);
          $q.notify({
            type: "negative",
            message: apiErrorOrDefault(
              err,
              "Could not delete project. Please try again!"
            ),
          });
        }
        $q.loading.hide();
      });
    };

    const taskSorter = (a, b) =>
      new Date(a.doneAt ?? a.createdAt).getTime() -
      new Date(b.doneAt ?? b.createdAt).getTime();

    setTasks(props.project?.tasks ?? []);

    const momentsAgo = (date) => moment(date).fromNow();
    const dateToStr = (date) => moment(date).format("MMMM Do, YYYY h:mma");

    return {
      syncTasks,
      removeTask,
      addTask,
      editTaskDescription,
      editProjectNameDescription,
      removeProject,
      taskSorter,
      momentsAgo,
      dateToStr,
      lists,
      tasks,
    };
  },
});
</script>
