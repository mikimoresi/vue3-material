import material from '@/components/Material/material'
import MdRipple from '@/components/Material/MdRipple/MdRipple'
import MdWave from '@/components/Material/MdRipple/MdWave'

export default Vue => {
  material(Vue)
  Vue.component(MdRipple.name, MdRipple)
  Vue.component(MdWave.name, MdWave)
}
