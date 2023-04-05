<script>
	import { h } from 'vue'
  export default {
    functional: true,
    props: {
      mdTag: {
        type: String,
        default: 'div'
      }
    },
    render ( ) {
      return h(this.mdTag)
    }
  }
</script>
