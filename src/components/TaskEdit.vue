<template ref="editForm">
    <v-form
        ref="form"        
        v-model="valid"
        lazy-validation>
        <v-layout 
            :column="$vuetify.breakpoint.xsOnly" 
            justify-space-between>
            <v-flex>
                <v-layout justify-space-between wrap align-center class="pr-2 pl-3">           
                    <v-flex xs12>                
                        <!-- Task Description -->
                        <v-text-field
                            label="Task Description" 
                            v-model="taskDescript"
                            v-bind:rules="taskDescriptRules"
                            v-bind:counter="50" />  
                    </v-flex>
                    <v-flex xs12>
                        <v-layout wrap>
                            <!-- Date Picker -->
                            <v-flex xs12 sm6>
                                <v-menu
                                    full-width
                                    v-model="dateMenu"
                                    ref="dateMenu"
                                    v-bind:return-value.sync="computeDate"
                                    lazy
                                    transition="scale-transition"
                                    offset-y
                                    max-width="290px">
                                    <v-text-field
                                        slot="activator"
                                        :value="formatDate"
                                        label="Due Date"
                                        prepend-icon="event"
                                        readonly
                                    />                            

                                    <v-date-picker
                                        v-model="computeDate"
                                        v-bind:allowed-dates="allowedDates"                         
                                        v-on:input="$refs.dateMenu.save(computeDate)"
                                    />                            

                                </v-menu>
                            </v-flex>
                            <v-flex xs12 sm6>
                            <!-- Time Picker -->
                                <v-menu
                                    full-width
                                    v-model="timeMenu"
                                    ref="timeMenu"
                                    :return-value.sync="computeTime"
                                    :closeOnContentClick="false"
                                    lazy
                                    offset-y
                                    transition="scale-transition"                        
                                    max-width="290px"
                                    min-width="290px">
                                    <v-text-field
                                        slot="activator"
                                        :value="formatTime"
                                        label="Time Due"
                                        prepend-icon="access_time"
                                        readonly
                                    />
                                    
                                    <v-time-picker
                                        v-model="computeTime"                          
                                        @change="$refs.timeMenu.save(computeTime)"
                                    />
                                </v-menu>                                
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-flex>                                                     
                <!-- Save/Cancel Buttons -->                           
                <v-layout                     
                    :justify-space-between="$vuetify.breakpoint.xsOnly"
                    :row="$vuetify.breakpoint.xsOnly"
                    :reverse="$vuetify.breakpoint.xsOnly"
                    :justify-space-around="$vuetify.breakpoint.smAndUp"
                    :column="$vuetify.breakpoint.smAndUp"
                    align-end>             
                    <v-btn color="primary"
                        :disabled="!valid"
                        @click="save">
                        <v-icon small left>save</v-icon>Save</v-btn>                                            
                    
                    <v-btn color="accent lighten-1"
                        @click="cancel"><v-icon small left>cancel</v-icon>Cancel</v-btn>                    
                </v-layout>
            </v-flex>
        </v-layout>
    </v-form>
</template>
    
<script>
import moment from 'moment';
import { mapActions } from 'vuex';


export default {
    props: {
        task: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
        dateMenu: false,
        timeMenu: false,        
        taskDescript: "",
        taskDueDate: null,
        valid: true,
        taskDescriptRules: [
            v => !!v || 'Task name is required.',
            v => v.length <= 50
            ]
        };
    },
    methods: {
        ...mapActions([
            "saveTask"
        ]),
        allowedDates(selectedDate) {            
            return moment().isSameOrBefore(selectedDate, 'day');            
        },
        save() {
            if (this.$refs.form.validate()) {
                // Save the modified task object
                this.saveTask({
                    descript: this.taskDescript,
                    dueDate: this.taskDueDate,
                    id: this.task.id
                });

                this.$emit("toggleMode");
            }
        },
        cancel() {
            this.$emit("toggleMode");
        }
    },
    computed: {
        formatDate() {
            if (this.taskDueDate)                 
                return moment(this.taskDueDate).format('M/D/YY');
        },
        formatTime() {
            if (this.taskDueDate)
                return moment(this.taskDueDate).format('h:mm A');
        },   
        computeDate: {
            get() {
                if (this.taskDueDate)
                    return moment(this.taskDueDate).format("YYYY-MM-DD");
            },
            set(newDate) {
                let curTime = moment(this.taskDueDate);
                this.taskDueDate = moment(newDate)
                    .hour(curTime.hour())  // set hour
                    .minute(curTime.minute()) // set minute
                    .toISOString();
            }
        },
        computeTime: {
            get() {
                if (this.taskDueDate)
                    return moment(this.taskDueDate).format("HH:mm")
            },
            set(newTime) {                
                if (typeof newTime === 'string')
                {
                    let time = newTime.split(':');                    
                    this.taskDueDate = moment(this.taskDueDate)
                        .hour(time[0])
                        .minute(time[1])
                        .toISOString();
                }               
            }
        }
    },
    created() {
        this.taskDescript = this.task.descript;
        this.taskDueDate = this.task.dueDate;
    }    
};
</script>


<style lang="scss">
</style>

