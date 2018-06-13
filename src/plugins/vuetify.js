import Vue from 'vue';
import App from '../App.vue';

import {
  Vuetify,
  VApp,
  VCard,
  VCheckbox,
  VDivider,
  VDatePicker,
  VTimePicker,
  //VNavigationDrawer,
  VFooter,
  VForm,
  VList,  
  VMenu,
  VBtn,
  VIcon,
  VGrid,
  VToolbar,
  VTooltip,
  VTextField,
  VSubheader,
  VSwitch,
  VSpeedDial,
  VSnackbar,
  transitions
} from 'vuetify';

import 'vuetify/src/stylus/app.styl';

Vue.use(Vuetify, {
  components: {
    VApp,
    VCard,
    VCheckbox,
    VDivider,
    VDatePicker,
    VTimePicker,
   // VNavigationDrawer,
    VFooter,
    VForm,
    VList,
    VMenu,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    VTooltip,
    VTextField,
    VSubheader,
    VSwitch,
    VSpeedDial,
    VSnackbar,
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
