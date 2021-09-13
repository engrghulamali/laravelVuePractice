/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
// import Vue from 'vue';
// import VueRouter from 'vue-router';
// /axios validation issues
// import Form from 'vform'

import Vue from 'vue';
import axios from 'axios';
import Form from 'vform';
import HasError from 'vform';
import AlertError from 'vform';
window.Form = Form;
// Vue.component(HasError.name, HasError)
// Vue.component(AlertError.name, AlertError)

import VueRouter from 'vue-router';
// import routes from './routes';


Vue.use(VueRouter);
const routes = [
    { path: '/profile', component:  require('./components/Profile.vue').default },
    { path: '/dashboard', component:  require('./components/Dashboard.vue').default },
    { path: '/users', component:  require('./components/User.vue').default }
  ]

const router =new VueRouter({
    mode:'history',
    routes
})

Vue.filter('upText',function(text){
   return text.toUpperCase();
});
///progressbar
import VueProgressBar from 'vue-progressbar'
const options = {
    color: '#bffaf3',
    failedColor: '#874b4b',
    thickness: '5px',
    transition: {
      speed: '0.2s',
      opacity: '0.6s',
      termination: 300
    },
    autoRevert: true,
    location: 'left',
    inverse: false
  }
  Vue.use(VueProgressBar, options)

  ///sweet alert
  import swal from 'sweetalert2';
  window.swal = swal;
  const toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
   
  
  });

  window.toastr = toast;
   
  //////////////event and lister
 
  window.Fire = new Vue();
  
/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('example-component', require('./components/ExampleComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    router
});
