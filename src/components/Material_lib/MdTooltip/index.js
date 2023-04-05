import material from '@/components/Material_lib/material'
import MdTooltip from './MdTooltip'

export default Vue => {
  material(Vue)
  Vue.component(MdTooltip.name, MdTooltip)
}
