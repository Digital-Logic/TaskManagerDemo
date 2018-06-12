<template>
    <v-layout 
        :class="{ 'px-2': $vuetify.breakpoint.smAndUp }"
        class="py-3"
        justify-start align-center>        
        <!-- Status button -->
        <v-flex 
            style="flex: 0 0 auto" 
            :class="{ 'mr-2': $vuetify.breakpoint.xsOnly,
                        'mr-3': $vuetify.breakpoint.smAndUp }">
        
            <v-checkbox
                v-model="taskState"                
                :color="completedOnTime() ? 'success' : 'error'"
                hideDetails                
                ></v-checkbox>
        </v-flex>

        <!-- Description -->
        <v-flex>
            <h2 class="grey--text text--darken-1">{{ task.descript }}</h2>
            
            <!-- Display Due Date -->
            <template  v-if="task.dueDate && !task.completed">
                <v-icon left v-if="displayWarning" color="warning">warning</v-icon>
                <v-icon left v-if="displayError" color="error">error</v-icon>  

                <span class="grey--text ml-2" style="cursor: pointer; color: red;"                   
                    v-on:click="dueDateFormat = !dueDateFormat">Due {{ formatDueDate }}</span>
            </template>

            <!-- Display Completed Date -->
            <template v-if="task.completed">                
                <span class="grey--text" style="cursor: pointer"                    
                    v-on:click="completedDateFormat = !completedDateFormat">Completed {{ formatCompletedDate }}</span>
            </template>


        </v-flex>
        <!-- Options Button -->
        <v-spacer/>
        <v-speed-dial
            v-model="optionsMenu.open"            
            direction="left"
            transition="scale-transition"
        >
        <v-btn slot="activator"
            v-model="optionsMenu.open"            
            fab
            dark
            :small="$vuetify.breakpoint.xsOnly"
            color="secondary">
            <v-icon>more_vert</v-icon>
            <v-icon>close</v-icon>   
        </v-btn>

        <v-btn
            v-for="(btn, index) of optionsMenu.menuItems"
            :key="index"
            fab
            small
            @click="taskAction(btn.action)"        
            :disabled="task.completed ? btn.disable : false"
            :color="btn.color">
            <v-icon color="white">{{ btn.icon }}</v-icon>
        </v-btn>
        </v-speed-dial>
    </v-layout>
</template>

<script>
import moment from 'moment';
import { mapState, mapActions } from 'vuex';

export default {
    props: {
        task: {
            type: Object,
            required: true
        }        
    },
    data() {
        return {
            optionsMenu: {
                open: false,
                menuItems: [
                    // {    // TODO -- add subtasks
                    //     icon: 'add',
                    //     color: 'green',
                    //     disable: true                                           
                    // }, 
                    {
                        icon: 'edit',
                        color: 'blue',
                        disable: true,
                        action: 'edit'
                    },{
                        icon: 'delete',
                        color: 'red',
                        disable: false,
                        action: 'delete'
                    }
                ]
            },
            dueDateFormat: false,
            completedDateFormat: true
        };
    },
    computed: {
        ...mapState({            
            curTime: 'curTime',
            getDueDateFormat: (state) => state.settings.dateFormat.dueDate,
            getCompletedDateFormat: (state) => state.settings.dateFormat.completedDate,
            getDisplayWarningTime: (state) => state.settings.displayWarning
        }),
        formatDueDate() {            
            if (this.dueDateFormat)            
                return moment(this.task.dueDate).format("M/D/YY - h:mm A");            
            else return moment(this.task.dueDate).from(this.curTime);            
        },
        formatCompletedDate() {
            if (this.completedDateFormat)
                return moment(this.task.completed).format("M/D/YY - h:mm A");
            else return moment(this.task.completed).from(this.curTime);
        },
        taskState: {
            set() {
                this.toggleTaskState(this.task);
            },
            get() {
                return this.task.completed ? true : false;
            }
        },
        displayWarning() {
            if (!this.task.dueDate) return false;
            let dif = moment(this.task.dueDate).valueOf() - moment(this.curTime).valueOf();            
            if (dif < 0) return false;
            if (dif < this.getDisplayWarningTime)
                return true;
            return false;
        },
        displayError() {
            if (!this.task.dueDate) return false;
            if (this.task.completed) {
                return moment(this.task.dueDate).isBefore(this.task.completed);
            } else {
                return moment(this.task.dueDate).isBefore(this.curTime);                
            }            
        }
    },
    methods: {
        ...mapActions([
            "toggleTaskState",
            "deleteTask"
        ]),
        completedOnTime(){
            return moment(this.task.dueDate).isAfter(this.task.completed);
        },
        taskAction(action) {
            switch(action) {
                case 'delete':
                    this.deleteTask(this.task);
                    break;
                case 'edit':
                    this.$emit('toggleMode');
                    break;
            }

        }
    },
    created() {
        this.dueDateFormat = this.getDueDateFormat;
        this.completedDateFormat = this.getCompletedDateFormat;
    }
}
</script>

<style lang="scss">
    h2 {
        font-size: 1.1em;
        @media(min-width: 400px)
        {
            font-size: 1.3em;
        }
        @media(min-width: 500px) {
            font-size: 1.4em;
        }
        @media(min-width: 600px) {
            font-size: 1.5em;
        }
    }
</style>
