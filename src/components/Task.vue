<template>
    <TaskCard>
        <TaskEdit v-if="editMode" 
            :task="task"
            @toggleMode="toggleMode"/>
        <TaskDisplay v-if="!editMode"
            :task="task"
            @toggleMode="toggleMode"/>
    </TaskCard>
</template>

<script>
import TaskDisplay from './TaskDisplay.vue';
import TaskEdit from './TaskEdit.vue';
import TaskCard from './TaskCard.vue';

export default {
    props: {
        task: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            editMode: false
        };
    },
    methods: {
        toggleMode() {
            this.editMode = !this.editMode;
        }
    },
    components: {
        TaskDisplay,
        TaskEdit,
        TaskCard
    }
}
</script>

<style lang="scss">

</style>
