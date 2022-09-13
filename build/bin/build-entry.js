//根据component.json得到src/index.js，
//通过src/index这个文件可以注册所有组件。在example/main.js中有体现，Vue.use(Elements)
//注册后就可以在md文档里使用了

let Components = require('../../components.json');
let fs = require('fs');
let render = require('json-templater/string');
let uppercamelcase = require('uppercamelcase');
let path = require('path');
let endOfLine = require('os').EOL;

let OUTPUT_PATH = path.join(__dirname, '../../src/index.js');
let IMPORT_TEMPLATE = 'import {{name}} from \'../packages/{{package}}/index.js\';';
let INSTALL_COMPONENT_TEMPLATE = '  {{name}}';
let MAIN_TEMPLATE = `/* Automatically generated by './build/bin/build-entry.js' */

{{include}}
const components = [
{{install}},
];

const install = function(Vue) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
  Vue.prototype.$notify = Notify;
  Vue.prototype.$confirm = MessageBox.confirm;
  Vue.prototype.$prompt = MessageBox.prompt;
  Vue.prototype.$alert = MessageBox.alert;
  Vue.prototype.$message = Message;
};


/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
{{list}}
};
`;


var ComponentNames = Object.keys(Components);

var includeComponentTemplate = [];
var installTemplate = [];
var listTemplate = [];

ComponentNames.forEach(name => {
  var componentName = uppercamelcase(name);

  includeComponentTemplate.push(render(IMPORT_TEMPLATE, {
    name: componentName,
    package: name
  }));

  if (['Message','Loading', 'MessageBox', 'Notify', 'InfiniteScroll'].indexOf(componentName) === -1) {
    installTemplate.push(render(INSTALL_COMPONENT_TEMPLATE, {
      name: componentName,
      component: name
    }));
  }

  if (componentName !== 'Loading') listTemplate.push(`  ${componentName}`);
});

var template = render(MAIN_TEMPLATE, {
  include: includeComponentTemplate.join(endOfLine),
  install: installTemplate.join(',' + endOfLine),
  list: listTemplate.join(',' + endOfLine)
});

fs.writeFileSync(OUTPUT_PATH, template);

