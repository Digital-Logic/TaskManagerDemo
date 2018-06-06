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
      <v-toolbar-items>
        <v-menu offset-y>
          <v-btn slot="activator" 
            flat>{{ filters[curFilter] }}<v-icon right>arrow_drop_down</v-icon></v-btn>

          <v-list>      
            <v-list-tile          
              v-for="(filter, index) of filters"                          
              :key="index">
              <v-list-tile-title>{{ filter }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-toolbar-items>
      

      <v-spacer/>
      <v-toolbar-title>Task Manager</v-toolbar-title>     
      <v-toolbar-side-icon v-on:click="drawer = !drawer"/>      
    </v-toolbar>

    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align center>
          <v-flex xs12>
            <router-view/>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer :fixed="fixed" color="secondary" dark app class="pa-2">
      <span>&copy; {{ getYear }}</span>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      fixed: true,
      drawer: false,
      curFilter: 0,
      filters: [
        "All Task",
        "Today's Task",
        "Tomorrow's Task",
        "Overdue Task",
        "Completed Task"
      ],
      menu: [
        {
          icon: 'home',
          link: 'home',
          text: 'Home'
        },{
          icon: 'info',
          link: 'about',
          text: 'About'
        }
      ]
    }
  },
  computed: {
    getYear() {
      return (new Date()).getFullYear();
    }
  },
  created() {
    this.$store.dispatch('setInterval');
  },
  beforeDestory() {
    this.$store.dispatch('destoryInterval');
  }
}
</script>
