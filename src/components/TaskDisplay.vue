<template>
    <v-layout class="pa-2" justify-start align-center>
        <!-- Status button -->
        <v-flex style="flex: 0 0 auto" class="mr-3">
            <v-switch hide-details></v-switch>
        </v-flex>
        <!-- Description -->
        <v-flex>
            <h2 class="headline grey--text text--darken-2">{{ task.descript }}</h2>
            <span class="grey--text" style="cursor: pointer"
                v-if="task.dueDate"
                v-on:click="dateFormat = !dateFormat">Due {{ formatDate }}</span>
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
            color="secondary">
            <v-icon>more_vert</v-icon>
            <v-icon>close</v-icon>   
        </v-btn>

        <v-btn
            v-for="(btn, index) of optionsMenu.menuItems"
            :key="index"
            fab
            small
            dark
            :color="btn.color">
            <v-icon>{{ btn.icon }}</v-icon>
        </v-btn>
        </v-speed-dial>
    </v-layout>
</template>

<script>
import moment from 'moment';

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
                    {
                        icon: 'add',
                        color: 'green'                      
                    }, {
                        icon: 'edit',
                        color: 'blue'
                    },{
                        icon: 'delete',
                        color: 'red'
                    }
                ]
            },
            dateFormat: false           
        };
    },
    computed: {
        formatDate() {            
            if (this.dateFormat)
                return moment(this.task.dueDate).format("M/D/YY - h:m A");
            else return moment(this.task.dueDate).fromNow();
        }
    }
}
</script>

<style lang="scss">

</style>
