//import MdTheme from './MdTheme'
import deepmerge from 'deepmerge'

export default function (newComponent) {
  const defaults = {
    props: {
      mdTheme: 'md-theme-default'
    },
    computed: {
      $mdActiveTheme () {
        return 'md-theme-default'
      }
    }
  }

  return deepmerge(defaults, newComponent)
}
