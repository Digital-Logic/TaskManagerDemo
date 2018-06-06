<template>
    <div>
        <v-subheader>Task List</v-subheader>
        <template 
            v-for="(task, index) of getTaskList">
            <Task                
                :key="task.id"
                :task="task"
            />
            <v-divider :key="`divider-${index}`" v-if="index < getTaskList.length-1"/>
        </template>
    </div>
</template>

<script>
import Task from './Task.vue';
import moment from 'moment';
import { mapGetters } from 'vuex';

export default {    
    data() {
        return {

        };
    },
    computed: {
        ...mapGetters([
            "getTaskList"
        ])
    },
    components: {
        Task
    }
}
</script>

<style>

</style>
