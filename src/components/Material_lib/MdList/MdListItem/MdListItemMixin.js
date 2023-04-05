import MdRipple from '../../core/mixins/MdRipple/MdRipple'
import MdListItemContent from './MdListItemContent.vue'

export default {
  mixins: [MdRipple],
  components: {
    MdListItemContent
  },
  props: {
    disabled: Boolean
  },
  computed: {
    isDisabled () {
      return !this.mdRipple || this.disabled
    }
  }
}
