/* global hexo */
var babel = require('babel-core')
var React = require('react')
var ReactDOMServer = require('react-dom/server')
var reval = require('eval')

require('babel-core/register')

hexo.extend.renderer.register('jsx', 'html', function (data, locals) {
  var js = babel.transform(data.text, { filename: data.path })
  var { propsFunc, Component } = reval(js.code, data.path, null, true)

  var props = propsFunc(locals)
  if (props.type === 'layout') {
    return ReactDOMServer.renderToStaticMarkup(
      React.createElement(Component, props.data)
    )
  }
  return props
}, true)
