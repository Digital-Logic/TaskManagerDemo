import Vue from 'vue';
import App from '../App.vue';

import {
  Vuetify,
  VApp,
  VCard,
  VDivider,
  VNavigationDrawer,
  VFooter,
  VList,  
  VMenu,
  VBtn,
  VIcon,
  VGrid,
  VToolbar,
  VSubheader,
  VSwitch,
  VSpeedDial,
  transitions
} from 'vuetify';

import 'vuetify/src/stylus/app.styl';

Vue.use(Vuetify, {
  components: {
    VApp,
    VCard,
    VDivider,
    VNavigationDrawer,
    VFooter,
    VList,
    VMenu,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    VSubheader,
    VSwitch,
    VSpeedDial,
    transitions
  },
  theme: {
    primary: '#607D8B',
    secondary: '#455A64',
    accent: '#FF5252',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  },
});
