<template>
  <div class="md-badge-content" v-if="hasDefaultSlot">
    <slot />
    <md-badge-standalone :class="badgeClasses" :style="styles">
      <div>
        {{ mdContent }}
      </div>
    </md-badge-standalone>
  </div>
  <md-badge-standalone :class="badgeClasses" :style="styles" v-else>
    {{ mdContent }}
  </md-badge-standalone>
</template>

<script>
	import { getCurrentInstance } from "vue";
  import MdComponent from '../core/MdComponent'
  import MdPropValidator from '../core/utils/MdPropValidator'

  import MdBadgeStandalone from './MdBadgeStandalone.vue'

  export default new MdComponent({
		setup() {
			

			const instance = getCurrentInstance();
			

			return {
				
				instance
				
			}
		},
    name: 'MdBadge',
    components: {
      MdBadgeStandalone
    },
    props: {
      mdContent: [String, Number],
      mdPosition: {
        type: String,
        default: 'top',
        ...MdPropValidator('md-position', [
          'top',
          'bottom'
        ])
      },
      mdDense: Boolean
    },
    computed: {
      hasDefaultSlot () {
        return !!this.$slots.default
      },
      badgeClasses () {
        const staticClass = this.getStaticClass()
        const dynamicClass = this.instance.attrs.class

        return {
          ['md-position-' + this.mdPosition]: true,
          'md-dense': this.mdDense,
          ...staticClass,
          ...dynamicClass
        }
      },
      styles () {
        const staticStyle = this.instance.attrs.staticStyle
        const style = this.instance.attrs.style
        return {
          ...staticStyle,
          ...style
        }
      }
    },
    methods: {
      getStaticClass () {
				
        const staticClass = this.instance.attrs.class

        function filterClasses () {
          return staticClass.split(' ').filter(val => val).reduce((result, key) => {
            result[key] = true
            return result
          }, {})
        }

        return staticClass ? filterClasses() : {}
      }
    }
  })
</script>

<style lang="scss">
  @import "@/components/Material_lib/MdAnimation/variables";

  .md-badge-content {
    position: relative;
    display: inline-block;
    .md-position {
      &-top {
        top: -4px;
      }
      &-bottom {
        bottom: -4px;
      }
    }
  }
</style>
