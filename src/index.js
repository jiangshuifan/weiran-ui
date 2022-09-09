/* Automatically generated by './build/bin/build-entry.js' */

import Badge from '../packages/badge/index.js';
import Button from '../packages/button/index.js';
import Checkbox from '../packages/checkbox/index.js';
import CheckboxGroup from '../packages/checkbox-group/index.js';
import Container from '../packages/container/index.js';
import Drag from '../packages/drag/index.js';
import Dropdown from '../packages/dropdown/index.js';
import Input from '../packages/input/index.js';
import Notify from '../packages/notify/index.js';
import Progress from '../packages/progress/index.js';
import Radio from '../packages/radio/index.js';
import Select from '../packages/select/index.js';
import Table from '../packages/table/index.js';
import Tag from '../packages/tag/index.js';
import Test from '../packages/test/index.js';
import Tree from '../packages/tree/index.js';
import Video from '../packages/video/index.js';
const components = [
  Badge,
  Button,
  Checkbox,
  CheckboxGroup,
  Container,
  Drag,
  Dropdown,
  Input,
  Progress,
  Radio,
  Select,
  Table,
  Tag,
  Tree,
  Video,
];

const install = function(Vue) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
  
  Vue.prototype.$test = Test;
  Vue.prototype.$notify = Notify;
};


/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  Badge,
  Button,
  Checkbox,
  CheckboxGroup,
  Container,
  Drag,
  Dropdown,
  Input,
  Notify,
  Progress,
  Radio,
  Select,
  Table,
  Tag,
  Test,
  Tree,
  Video
};
