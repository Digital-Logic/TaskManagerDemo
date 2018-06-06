<template>
    <v-card flat>
        <TaskEdit v-if="edit" :task="task"/>
        <TaskDisplay v-else :task="task"/>        
    </v-card>
</template>

<script>
import TaskDisplay from './TaskDisplay.vue';
import TaskEdit from './TaskEdit.vue';

export default {
    props: {
        task: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            edit: false
        };
    },
    components: {
        TaskDisplay,
        TaskEdit
    }
}
</script>

<style lang="scss">

</style>
