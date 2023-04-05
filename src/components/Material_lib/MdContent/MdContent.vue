<script>
	import {h} from 'vue'
  import MdComponent from '../core/MdComponent'

  export default new MdComponent({
    name: 'MdContent',
    props: {
      mdTag: {
        type: String,
        default: 'div'
      }
    },
    render () {
			
      return h(this.mdTag, {
        class: [this.$mdActiveTheme,'md-content'],
        attrs: this.$attrs,
        //on: this.$listeners
      }, this.$slots.default())
    }
  })
</script>
