import material from '@/components/Material_lib/material'
import MdBadge from './MdBadge'

export default Vue => {
  material(Vue)
  Vue.component(MdBadge.name, MdBadge)
}