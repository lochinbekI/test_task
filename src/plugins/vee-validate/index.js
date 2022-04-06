import {extend, ValidationProvider, ValidationObserver} from 'vee-validate';
import {required, alpha, alpha_dash, email} from 'vee-validate/dist/rules';

extend('alpha', alpha);
extend('email', email);
extend('alpha_dash', alpha_dash);
extend('required', required);

export default {
  install(Vue) {
    Vue.component('ValidationProvider', ValidationProvider)
    Vue.component('ValidationObserver', ValidationObserver)
  }
}
