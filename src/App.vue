<template>
  <v-app>
    <v-navigation-drawer      
      v-model="drawer"
      app
      :fixed="fixed"
      right>
      <v-list dense>        
          <v-list-tile 
            v-for="item of menu" 
            :key="item.text"
            :to="{ name: item.link }">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.text }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <!-- Toolbar -->
    <v-toolbar dark color="primary" app :fixed="fixed">
      <!-- Filter Selector -->
      <v-toolbar-items v-if="$route.name == 'taskList'">
        <v-menu offset-y>
          <v-btn slot="activator"            
            flat>{{ filterList[selectedFilter] }}<v-icon right>arrow_drop_down</v-icon></v-btn>

          <v-list>      
            <v-list-tile          
              v-for="(filter, index) of filterList"
              v-on:click="setSelectedFilter(index)"
              :key="filter">
              <v-list-tile-title>{{ filter }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-toolbar-items>
      

      <v-spacer/>
      <v-toolbar-title>Task Manager</v-toolbar-title>     
      <v-toolbar-side-icon v-on:click="drawer = !drawer"/>      
    </v-toolbar>

    <v-content ref="appContent">
      <v-container fluid fill-height>
        <v-layout justify-center align center>
          <v-flex xs12>
            <router-view :newTask="newTask" @closeNewTask="newTask=false"/>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>

    <!-- Queued Snackbar -->
    <snackbar />

    
    <!-- Footer -->
    <v-footer :fixed="fixed" app dark color="primary" style="height: auto" class="pa-2">
      <v-fab-transition>
        <!-- Add New Task Button -->
        <v-btn
          v-show="$route.name == 'taskList'"
          @click="newTaskBtn"
          color="accent"
          absolute
          top
          right
          fab><v-icon dark>add</v-icon>
        </v-btn>
      </v-fab-transition>

      <span>&copy; {{ getYear }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import snackbar from '@/components/QueuedSnackbar.vue';
import TWEEN from '@tweenjs/tween.js';

function animate(time) {
  requestAnimationFrame(animate);
  TWEEN.update(time);
}

export default {
  name: 'App',
  data () {
    return {
      fixed: true,
      drawer: false,
      menu: [
        {
          icon: 'home',
          link: 'taskList',
          text: 'Task List'
        },{
          icon: 'info',
          link: 'about',
          text: 'About'
        }
      ],
      newTask: false
    }
  },
  methods: {
    ...mapActions(["setSelectedFilter", "setInterval", "destoryInterval"]),
    newTaskBtn() {
      this.newTask = true;
      let duration = window.pageYOffset + 200;            
      this.$vuetify.goTo(0, { duration, easing: 'easeInOutCubic'})
    }
  },
  computed: {
    ...mapState({
      selectedFilter: (state) => state.filters.selected,
      filterList: (state) => state.filters.names
    }),
    getYear() {
      return (new Date()).getFullYear();
    }
  },
  components: {
    snackbar
  },
  created() {
    this.setInterval();
    requestAnimationFrame(animate);
  },
  beforeDestory() {
    this.destoryInterval();
  }
}
</script>

<style lang="scss">
  .container {
    padding: 16px !important;
    @media(min-width: 600px)
    {
      padding: 24px !important;
    }
  }
  body {
    font: 16px;
  }
</style>
