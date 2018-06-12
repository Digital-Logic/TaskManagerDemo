<template>
    <div>
        <v-subheader>New Task</v-subheader>
            <TaskCard>
                <TaskEdit
                    :task="{
                        descript: ''                        
                        }"
                    @toggleMode="$emit('closeNewTask')"/>
            </TaskCard>  
    </div>
</template>

<script>
import TaskCard from './TaskCard.vue';
import TaskEdit from './TaskEdit.vue';

export default {
    components: {
        TaskCard,
        TaskEdit
    }
}
</script>