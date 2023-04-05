import material from '@/components/Material_lib/material'
import MdRipple from '@/components/Material_lib/MdRipple/MdRipple'
import MdWave from '@/components/Material_lib/MdRipple/MdWave'

export default Vue => {
  material(Vue)
  Vue.component(MdRipple.name, MdRipple)
  Vue.component(MdWave.name, MdWave)
}
