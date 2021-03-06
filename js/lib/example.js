var widgets = require('@jupyter-widgets/base');
var _ = require('lodash');
var $ = require('jquery');
require('./sticky.css');
//require('./materialize.css');
//require('materialize-loader!./materialize.config.js');
//let Materialize = require('./materialize.js');
let toast = require('jquery-toast-plugin');
let circleProgress = require('jquery-circle-progress');

// Custom Model. Custom widgets models must at least provide default values
// for model attributes, including
//
//  - `_view_name`
//  - `_view_module`
//  - `_view_module_version`
//
//  - `_model_name`
//  - `_model_module`
//  - `_model_module_version`
//
//  when different from the base class.

// When serialiazing the entire widget state for embedding, only values that
// differ from the defaults will be specified.
var HelloModel = widgets.DOMWidgetModel.extend({
    defaults: _.extend(widgets.DOMWidgetModel.prototype.defaults(), {
        _model_name : 'HelloModel',
        _view_name : 'HelloView',
        _model_module : 'jnc',
        _view_module : 'jnc',
        _model_module_version : '0.0.1',
        _view_module_version : '0.0.1',
        value : 'Hello World'
    })
});

function addCss(fileName) {

    var head = document.head
      , link = document.createElement("link")

    link.type = "text/css"
    link.rel = "stylesheet"
    link.href = fileName

    head.appendChild(link)
  }


// Custom View. Renders the widget model.
var HelloView = widgets.DOMWidgetView.extend({
    render: function() {
        addCss(document.querySelector('body').getAttribute('data-base-url') + 'nbextensions/jnc/styles.css');
        this.value_changed();
        this.model.on('change:value', this.value_changed, this);
        this.make_center();
        this.add_notification();
        this.add_notification();
        console.log('javascript is working');
        $( document ).ready(function() {
          $('#circle').circleProgress({
            value: 0.75,
            size: 75,
            fill: {
              gradient: ["#746c66", "#e3ae24"]
            }
          });
        });
    },


    make_center: function() {
      this.container = document.createElement('div');
      this.container.className = 'sticky__sticky';
      this.container.style.position = 'fixed';
      this.container.style.right = '20px';
      this.container.style.width = '100px';
      this.el.appendChild(this.container);
    },

    add_notification: function() {
      var note = document.createElement('div');
      note.className = 'note';
      note.style.width = '80px';
      note.style.marginLeft = 'auto';
      note.style.marginRight = 'auto';
      note.style.minHeight = '80px';
      note.style.backgroundColor = '#cccccc';
      let s = `
      <div id="circle"></div>
      `;
      note.innerHTML = s;
      this.container.appendChild(note);
    },

    value_changed: function() {
        this.el.textContent = this.model.get('value');
    }
});


module.exports = {
    HelloModel : HelloModel,
    HelloView : HelloView
};
