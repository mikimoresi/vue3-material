import material from '@/components/Material_lib/material'
import MdButton from './MdButton'

export default Vue => {
  material(Vue)
  Vue.component(MdButton.name, MdButton)
}
