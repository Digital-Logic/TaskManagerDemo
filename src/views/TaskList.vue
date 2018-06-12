<template>    
    <transition-group name="list" tag="div"  style="position: relative;">
        
        <!-- New Task -->
        <NewTask key="newTask" v-if="newTask" @closeNewTask="$emit('closeNewTask')"/>                             
    
        <!-- Uncompleted Task List -->
        <template v-if="uncompletedTaskList.length !== 0">
            <v-subheader key="uncompletedHeader">Uncompleted Tasks</v-subheader>
            <template
                v-for="task of uncompletedTaskList">
                <Task                
                    :key="task.id"
                    :task="task"                                   
                />
            
            </template>
        </template>
        
        
        <!-- Completed Task List -->
        <template v-if="completedTaskList.length !== 0">
            <v-subheader key="completedHeader">Completed Tasks</v-subheader>
            <template 
                v-for="task of completedTaskList">
                <Task                
                    :key="task.id"
                    :task="task"
                />
            
            </template>
        </template>
           
    </transition-group> 
</template>

<script>
import Task from "@/components/Task.vue";
import moment from "moment";
import { mapState, mapGetters } from "vuex";
import NewTask from "@/components/NewTask.vue"


export default {
  props: {
    newTask: {
      type: Boolean
    }
  },
  computed: {
    ...mapState({
      selectedFilter: state => state.filters.selected
    }),
    ...mapGetters([
      "getUncompletedTaskList",
      "getCompletedTaskList",
      "getOverdueTaskList",
      "getTodaysUncompletedTasks",
      "getTodaysCompletedTasks",
      "getTomorrowsUncompletedTasks",
      "getTomorrowsCompletedTasks"
    ]),
    uncompletedTaskList() {
      switch (this.selectedFilter) {
        case 0: // all task
          return this.getUncompletedTaskList;
        case 1: // todays task
          return this.getTodaysUncompletedTasks;
        case 2: // tomorrows task
          return this.getTomorrowsUncompletedTasks;
        case 3: // overdue task
          return this.getOverdueTaskList;
        case 4: // Completed task
          return [];
      }
    },
    completedTaskList() {
      switch (this.selectedFilter) {
        case 0: // all task
          return this.getCompletedTaskList;
        case 1: // todays task
          return this.getTodaysCompletedTasks;
        case 2: // tomorrows task
          return this.getTomorrowsCompletedTasks;
        case 3:
          return [];
        case 4: // Completed task
          return this.getCompletedTaskList;
      }
    }
  },
  components: {
    Task,
    NewTask
  }
};
</script>

<style lang="scss">

    .list-enter, .list-leave-to
    {
        opacity: 0;
        display: block;      
    }
    .list-leave-active {     
        transition: opacity 0.5s;
        position: absolute;
        left: 0;
        right: 0;         
    }    
    .list-enter-active {
        transition: opacity 0.5s 0.5s, transform 1s;
    }
    .list-move {
        transition: all 1s;
    }

</style>
