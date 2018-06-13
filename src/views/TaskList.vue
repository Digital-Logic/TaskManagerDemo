<template>
    <div>
        <transition-group         
            tag="div"            
            style="position: relative;"
            :css="false"
            @before-enter="beforeEnter"
            @enter="enter"        
            @leave="leave">
            
            <!-- New Task -->
            <NewTask key="newTask" v-if="newTask" @closeNewTask="$emit('closeNewTask')"/>                             
        
            <!-- Uncompleted Task List -->
            <template v-if="uncompletedTaskList.length !== 0">
                <v-subheader key="uncompletedHeader">Uncompleted Tasks</v-subheader>
                <template
                    v-for="(task, index) of uncompletedTaskList">
                    <Task                
                        :key="task.id"
                        :task="task"
                        :data-index="index"                               
                    />
                
                </template>
            </template>
        </transition-group>
       
        <transition-group         
            tag="div"            
            style="position: relative;"
            :css="false"
            @before-enter="beforeEnter"
            @enter="enter"        
            @leave="leave">
            <!-- Completed Task List -->
            <template v-if="completedTaskList.length !== 0">
                <v-subheader key="completedHeader">Completed Tasks</v-subheader>
                <template 
                    v-for="(task, index) of completedTaskList">
                    <Task                
                        :key="task.id"
                        :task="task"
                        :data-index="index"
                    />
                </template>
            </template>
        </transition-group> 
    </div>
</template>

<script>
import Task from "@/components/Task.vue";
import moment from "moment";
import { mapState, mapGetters } from "vuex";
import NewTask from "@/components/NewTask.vue"
import TWEEN from '@tweenjs/tween.js';

export default {
  props: {
    newTask: {
      type: Boolean
    }
  },
  methods: {
      beforeEnter(el) {
        el.style.opacity = 0;
        let styles = window.getComputedStyle(el, null);
        // Save this elements styles on the dataset property for later use.
        el.dataset.height = styles.getPropertyValue('height');
        el.dataset.margin = styles.getPropertyValue('margin-bottom');
        el.dataset.padding = styles.getPropertyValue('padding-top');
        el.style.cssText = "height: 0px; margin-bottom: 0px !important; padding: 0px !important; overflow: hidden; opacity: 0";          
      },
      enter(el, done) {        
        let height = parseInt(el.dataset.height);
        let margin = parseInt(el.dataset.margin);
        let padding = parseInt(el.dataset.padding);            
        let delay = (el.dataset.index ? el.dataset.index : 1) * 200;
        
        new TWEEN.Tween({height: 0, margin: 0, padding: 0})
            .to({ height, margin, padding }, 500)
            .delay(delay)
            .easing(TWEEN.Easing.Quadratic.Out)
            .onUpdate( 
                ({ height, margin, padding }) => 
                    el.style.cssText = `height: ${height}px; margin-bottom: ${margin}px !important; padding: ${padding}px !important; opacity: 0`
            )
            // reset inline styles, removing height, margin, and padding inline styles
            .onComplete( () => el.style.cssText='opacity: 0;')
            .chain( 
                new TWEEN.Tween({ opacity: 0})
                    .to({ opacity: 1 }, 300)
                    .onUpdate(({ opacity }) => {
                        el.style.opacity = opacity;
                    })
                    .onComplete(() => {                        
                        done();
                    })
            )
            .start();            
      },
      leave(el, done) {
          let styleObj = window.getComputedStyle(el, null);
          let margin = parseInt(styleObj.getPropertyValue('margin-bottom'));
          let height = parseInt(styleObj.getPropertyValue('height'));
          let padding = parseInt(styleObj.getPropertyValue('padding-top'));
          let delay = (el.dataset.index ? el.dataset.index : 1) * 200;

          new TWEEN.Tween({ opacity: 1})
            .to({opacity: 0}, 300)
            .delay(delay)
            .onUpdate( ({ opacity }) => el.style.opacity = opacity)            
            .chain(
                new TWEEN.Tween({ height, margin, padding })
                    .to({height: 0, margin: 0, padding: 0}, 500)
                    .easing(TWEEN.Easing.Quadratic.Out)
                    .onUpdate( ({height, margin, padding}) => 
                        el.style.cssText = `height: ${height}px; margin-bottom: ${margin}px !important; padding: ${padding}px !important; opacity: 0;`
                    )
                    .onComplete(() => done())
            )
            .start();
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
