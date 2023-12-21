<template>
  <md-menu
    class="md-select"
    :class="{ 'md-disabled': disabled }"
    :md-close-on-select="false"

    
		v-model:mdActive="showSelect"
    :md-offset-x="offset.x"
    :md-offset-y="offset.y"
    :md-dense="mdDense"
		
    @mdClosed="onClose"
		>
    <md-input
      class="md-input md-select-value"
      v-model="MdSelect.label"
			
      ref="input"
      readonly
      :disabled="disabled"
      :required="required"
      :placeholder="placeholder"
      v-on="inputListeners"
			
			
			
      @focus.prevent="onFocus"
      @blur.prevent="removeHighlight"
      @click="openSelect"
      @keydown.down="openSelect"
      @keydown.enter="openSelect"
      @keydown.space="openSelect"  />
    <md-drop-down-icon @click="openSelect" />

    
			<md-menu-content
				ref="menu"
				class="md-select-menu "
				:class="!showSelect ? 'hide':''"
				:md-content-class="mdClass"
				:listenTyping="true"
				:id="id"
				:show="showSelect"
				:style="menuStyles"
				
				@setParentOffsets="setOffsets"
				@enter="onMenuEnter">
				
				
				<md-option v-for="(option, index) in dropdown_options_parsed" v-if="showSelect"
					:key="index"
					:value="index">{{option}}
				</md-option>
			</md-menu-content>
		
   

   

    <input class="md-input-fake" v-model="model" :disabled="disabled" readonly tabindex="-1" />
    <select readonly v-model="model" v-bind="attributes" tabindex="-1" ></select>
  </md-menu>
</template>

<script>
  import localConfig  from '@localconfig/config.json';

  import MdDropDownIcon from '../../core/icons/MdDropDownIcon.vue'
  import MdMenu from '@/components/Material_lib/MdMenu/MdMenu.vue'
  import MdMenuContent from '@/components/Material_lib/MdMenu/MdMenuContent.vue'
  import MdInput from '../MdInput/MdInput.vue'
  import MdFieldMixin from '../MdFieldMixin'
	import MdOption from "@/components/Material_lib/MdField/MdSelect/MdOption.vue"


  const defaultOffset = {
    x: -15,
    y: -48
  }

  export default {
    name: 'MdSelect',
		emits:['md-closed','md-selected','md-opened'],
    components: {
      MdInput,
      MdMenu,
      MdMenuContent,
      MdDropDownIcon,
			MdOption
    },
    mixins: [MdFieldMixin],
    props: {
      mdDense: Boolean,
      mdClass: String,
      multiple: Boolean,
      id: String,
      name: String,
			modelValue:false,
			dropdown_options:Object
    },
    inject: ['MdField'],
    data () {
      return {
        menuStyles: {},
        offset: {
          x: defaultOffset.x,
          y: 0
        },
        showSelect: false,
				avoidLocalValueWatch:false,
				//removeHighlightshowSelectTimeout:false,
        didMount: false,
        MdSelect: {
          items: {},
          label: null,
          multiple: false,
          modelValue: this.localValue,
          setValue: this.setValue,
          setContent: this.setContent,
          setMultipleValue: this.setMultipleValue,
          setMultipleContent: this.setMultipleContent
        }
				
				
      }
    },
    provide () {
      const MdSelect = this.MdSelect

      return { MdSelect }
    },
    computed: {
			dropdown_options_parsed (){
				if(localConfig.debugMd && !localConfig.prod) {
					var ret = {};
					var tot = 0;
					for (const key in this.dropdown_options) {
						if (Object.hasOwnProperty.call(this.dropdown_options, key)) {
							ret[key] = this.dropdown_options[key];
							tot++;
							if(tot>=6) {
								break;
							}
							
						}
					}
					return ret;

				} else  {
					return this.dropdown_options;
				}
			},
      attrs () {
        return {
          ...this.$attrs,
          name: this.name,
          id: undefined
        }
      },
      inputListeners () {
        return {
          //...this.$listeners,
          input: undefined
        }
      }
    },
    watch: {
			dropdown_options_parsed(value){
				//console.log(value);
				var _this = this;
				this.$nextTick(()=>{
					_this.setFieldContent()
					_this.MdSelect.modelValue = _this.modelValue
					
					var textContent = _this.dropdown_options[_this.modelValue];
					
					
					_this.setContent(textContent);
					
				});
			},
			modelValue(value){
				
				//console.log('local-> '+this.localValue);
				//console.log('val-> '+value);
				var settingEmpty = !this.localValue && !value;
				var settingEmptyFromFull = this.localValue && !value;
				if(this.localValue != value || settingEmpty) {
					var _this = this;
					this.$nextTick(()=>{
						_this.setFieldContent()
          	_this.MdSelect.modelValue = settingEmpty ? '' : value
						
						var textContent = settingEmpty ? '' : _this.dropdown_options[ value ];
					
						_this.setContent(textContent);

						if(settingEmpty ) {
							if(settingEmptyFromFull) {
								_this.avoidLocalValueWatch = true;
							}
							_this.localValue = "";
							//console.log('emptyLocalValue-> '+_this.localValue);
						}
						
					});
					
					

          
					//this.model = value;
				} 
				
			
			},
			model (val) {
			
      	//console.log('watch model->'+val)
				this.localValue = val
				
			
    	},
      localValue: {
        immediate: true,
        handler (val) {
					//console.log('watch localValue->'+val)
					if(val === undefined && this.MdSelect.modelValue === undefined) {
						return false;
					}
          this.setFieldContent()
					//console.log('watch localValue mv->'+this.MdSelect.modelValue)
					//console.log('watch localValue lv->'+this.localValue)
          this.MdSelect.modelValue = this.localValue

          if (this.didMount) {
            this.emitSelected(val)
          }
        }
      },
      multiple: {
        immediate: true,
        handler (isMultiple) {
          this.MdSelect.multiple = isMultiple
          this.$nextTick(this.initialLocalValueByDefault)
        }
      }
    },
    methods: {
			
      elHasScroll (el) {
        return el.scrollHeight > el.offsetHeight
      },
      scrollToSelectedOption (el, menu) {
        const top = el.offsetTop
        const elHeight = el.offsetHeight
        const menuHeight = menu.offsetHeight

        menu.scrollTop = top - ((menuHeight - elHeight) / 2)
      },
      setOffsets (target) {
				
        if (!this.$isServer) {
          const menu = this.$refs.menu.$refs.container

          if (menu) {
            const selected = target || menu.querySelector('.md-selected')
						
            if (selected) {
              this.scrollToSelectedOption(selected, menu)
              this.offset.y = defaultOffset.y - selected.offsetTop + menu.scrollTop + 8
              this.menuStyles = {
                'transform-origin': `0 ${Math.abs(this.offset.y)}px`
              }
            } else {
              this.offset.y = defaultOffset.y + 1
              this.menuStyles = {}
            }
          }
        }
      },
      onMenuEnter () {
				
        if (!this.didMount) {
          return
        }

        this.setOffsets()
        this.MdField.focused = true
        this.$emit('md-opened')
      },
      applyHighlight () {
        this.MdField.focused = false
        this.MdField.highlighted = true
        this.$refs.input.$el.focus()
      },
      onClose () {
        this.$emit('md-closed')
				this.removeHighlight();
        //if (this.didMount) {
        //  this.applyHighlight()
        //}
      },
      onFocus () {
        if (this.didMount) {
          this.applyHighlight()
        }
				if(!this.showSelect) {
					this.openSelect();
				}
      },
      removeHighlight () {
				//console.log('hivhviviv')
				//return false //TOGLI
				this.MdField.focused = false
        this.MdField.highlighted = false
				/*
				var _this = this;
				if(this.removeHighlightshowSelectTimeout) {
					clearTimeout(this.removeHighlightshowSelectTimeout);
				}
				this.removeHighlightshowSelectTimeout = setTimeout(function(){
					nextTick(function(){
						//_this.showSelect = false
					});
				},200)*/
				
				//
      },
      openSelect () {
				
        if (!this.disabled) {
					//this.test();
          this.showSelect = true
        }
      },
      arrayAccessorRemove (arr, index) {
        let before = arr.slice(0, index)
        let after = arr.slice(index + 1, arr.length)
        return before.concat(after)
      },
      toggleArrayValue (value) {
        let index = this.localValue.indexOf(value)
        let includes = index > -1
        if (!includes) {
          this.localValue = this.localValue.concat([value])
        } else {
          this.localValue = this.arrayAccessorRemove(this.localValue, index)
        }
      },
      setValue (newValue) {
				//console.log('setValue newvalue->'+newValue)
				//console.log('setValue modelValu->'+this.modelValue)
				//console.log('setValue localValue->'+this.localValue)
				if(newValue == this.localValue && this.modelValue != newValue) {
					this.localValue = "";
				}
				if(newValue != this.modelValue) {
					this.model = newValue
					//console.log('setValue model->'+this.model)
					this.setFieldValue()
					this.showSelect = false
				}
      },
      setContent (newLabel) {
        this.MdSelect.label = newLabel
      },
      setContentByValue () {
				
        const textContent = this.dropdown_options[this.localValue]

        if (textContent) {
          this.setContent(textContent)
        } else {
          this.setContent('')
        }
      },
      setMultipleValue (value) {
        const newValue = value
        this.toggleArrayValue(newValue)
        this.setFieldValue()
      },
      setMultipleContentByValue () {
        if (!this.localValue) {
          this.initialLocalValueByDefault()
        }

        let content = []

        this.localValue.forEach(item => {
          const textContent = this.MdSelect.items[item]

          if (textContent) {
            content.push(textContent)
          }
        })

        this.setContent(content.join(', '))
      },
      setFieldContent () {
        if (this.multiple) {
          this.setMultipleContentByValue()
        } else {
          this.setContentByValue()
        }
      },
      isLocalValueSet () {
        return this.localValue !== undefined && this.localValue !== null
      },
      setLocalValueIfMultiple () {
        if (this.isLocalValueSet()) {
          this.localValue = [this.localValue]
        } else {
          this.localValue = []
        }
      },
      setLocalValueIfNotMultiple () {
        if (this.localValue.length > 0) {
          this.localValue = this.localValue[0]
        } else {
          this.localValue = null
        }
      },
      initialLocalValueByDefault () {
        let isArray = Array.isArray(this.localValue)

        if (this.multiple && !isArray) {
          this.setLocalValueIfMultiple()
        } else if (!this.multiple && isArray) {
          this.setLocalValueIfNotMultiple()
        }
      },
      emitSelected (value) {
        this.$emit('md-selected', value)
      }
    },
    mounted () {
			
      this.showSelect = false
			this.localValue = this.modelValue;
			
      this.setFieldContent()

      this.$nextTick().then(() => {
        this.didMount = true
      })
    },
    vnodeUpdated () {
			//console.log('watch vnodeUpdated->'+val)
		
      this.setFieldContent()
    }
  }
</script>

<style lang="scss">
  @import "@/components/Material_lib/MdAnimation/variables";

  .md-menu.md-select {
    display: flex;
    flex: 1;
    overflow: auto;

    &:not(.md-disabled) {
      .md-input,
      .md-icon {
        cursor: pointer;
        outline: none;
      }
    }

    .md-input {
      flex: 1;
      min-width: 0;
    }

    select,
    .md-input-fake {
      width: 1px;
      height: 1px;
      margin: -1px;
      padding: 0;
      overflow: hidden;
      position: absolute;
      clip: rect(0 0 0 0);
      border: 0;
    }
  }
  .md-menu-content.md-select-menu {
    z-index: 111;
    width: 100%;

    &.md-menu-content-enter {
      transform: translate3d(0, -8px, 0) scaleY(.3);
    }

    .md-list {
      transition: opacity .3s $md-transition-drop-timing;
    }
  }
	.hide {
		opacity:0;
		pointer-events:none
	}
</style>
