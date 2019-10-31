import { bootstrap } from '@scoutgg/widgets'
import { vdom as renderer } from '@scoutgg/widgets/cjs/renderers/vdom'
import rerenderPlugin from '@scoutgg/widgets/cjs/plugins/rerender.js'
import { emit } from './utils'
import patch from 'virtual-dom/patch'
import h from 'virtual-dom/h'
import diff from 'virtual-dom/diff'


// Import the components you want to use
import './components/stats-table/stats-table'

if(module.hot) {
  module.hot.accept()
}

// Bootstrap Widgets (Start it)
bootstrap([
  emit,
  renderer({ patch, VNode: h, diff}),
  rerenderPlugin({}),
])
