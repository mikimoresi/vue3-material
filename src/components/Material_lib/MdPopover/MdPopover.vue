<script>
	
  import { nextTick, h, resolveComponent } from 'vue'
	import Popper from 'popper.js'
  import deepmerge from 'deepmerge'

  import MdPortal from '@/components/Material_lib/MdPortal/MdPortal'

  export default {
    name: 'MdPopover',
		emits:['md-active'],
    abstract: true,
    components: {
      MdPortal
    },
    props: {
			
      mdActive: Boolean,
      mdSettings: {
        type: Object,
        default: () => ({})
      }
    },
    data: () => ({
      popperInstance: null,
      originalParentEl: null,
      shouldRender: false,
      shouldActivate: false
    }),
    computed: {
      popoverClasses () {
        if (this.shouldActivate) {
          return 'md-active'
        } else if (this.shouldRender) {
          return 'md-rendering'
        }
      }
    },
    watch: {
      mdActive: {
        immediate: true,
        handler (shouldRender) {
          this.shouldRender = shouldRender

          if (shouldRender) {
						
            this.bindPopper()
          } else {
            this.shouldActivate = false
          }
        }
      },
      mdSettings () {
        if (this.popperInstance) {
          this.createPopper()
        }
      }
			
    },
    methods: {
      getPopperOptions () {
        return {
          placement: 'bottom',
          modifiers: {
            preventOverflow: {
              boundariesElement: 'viewport',
              padding: 16
            },
            computeStyle: {
              gpuAcceleration: false
            }
          },
          onCreate: () => {
            this.shouldActivate = true
            this.$emit('md-active')
          }
        }
      },
      setOriginalParent (el) {
        if (!this.originalParentEl) {
					//console.log(el.classList.contains('md-checkbox-label'))
					if(el.classList.contains('md-checkbox-label')) {
						
						if(el.closest('.all_selector')) {
							el = el.closest('.all_selector');
						}
					}
          this.originalParentEl = el
        }
      },
      killPopper () {
        if (this.popperInstance) {
          this.popperInstance.destroy()
          this.popperInstance = null
        }
      },
      bindPopper () {
        this.$nextTick().then(() => {
          if (this.originalParentEl) {
            this.createPopper()
          }
        })
      },
      createPopper () {
				
        if (this.mdSettings) {
          const options = deepmerge(this.getPopperOptions(), this.mdSettings)
					
          if (this.$el.nodeType !== Node.COMMENT_NODE) {
						//console.log(this.originalParentEl)
						//console.log(this.$el)
            this.popperInstance = new Popper(this.originalParentEl, this.$el, options);
						var _this = this;
						nextTick(function(){
							var left = _this.$el.style && _this.$el.style.left ? _this.$el.style.left : false;
							
							if(left && left.charAt(0) == "-") {
								_this.$el.style.left = '10px';
							}

							
						});
						
						//console.log(this.$el.cloneNode(true));
          }
        }
      },
      resetPopper () {
				
        if (this.popperInstance) {
					
          this.killPopper()
          this.createPopper()
        }
      }
    },
    beforeUnmount () {
			
      this.killPopper()
    },
    mounted () {
			
      this.resetPopper()
    },
    render () {
			
			const MdPortal = resolveComponent('md-portal')
      return h(MdPortal, {
        ...this.$attrs,
				onMdInitialParent :  this.setOriginalParent,
				onMdDestroy :  this.killPopper,

       
      }, this.$slots.default)
    }
  }
</script>

<style lang="scss">
  .md-popover {
    &.md-rendering {
      opacity: 0;
      transition: none !important;
    }
  }
</style>
