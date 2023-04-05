import material from '@/components/Material_lib/material'
import MdIcon from '@/components/Material_lib/MdIcon'
import MdSelect from './MdSelect'
import MdField from './MdField'
import MdFile from './MdFile/MdFile'
import MdInput from './MdInput/MdInput'
import MdTextarea from './MdTextarea/MdTextarea'

export default Vue => {
  material(Vue)
  Vue.use(MdIcon)
  Vue.use(MdSelect)
  Vue.component(MdField.name, MdField)
  Vue.component(MdFile.name, MdFile)
  Vue.component(MdInput.name, MdInput)
  Vue.component(MdTextarea.name, MdTextarea)
}
