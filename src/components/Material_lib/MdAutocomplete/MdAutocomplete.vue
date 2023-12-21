<template>
  <md-field class="md-autocomplete" :class="fieldClasses" md-clearable :md-inline="isBoxLayout"  @mdClear="clearField()">
		
    <md-menu md-direction="bottom-start" :md-dense="mdDense" md-align-trigger md-full-width v-model:mdActive="showMenu">
      <md-input
				v-model="searchTerm"
        
    		@input="searchTerm = $event.target.value"
        
        :id="mdInputId"
        :name="mdInputName"
        :maxlength="mdInputMaxlength"
        :placeholder="mdInputPlaceholder"
        @focus.stop="openOnFocus"
        @blur="hideOptions"
       
        @click.prevent="openOnFocus" />

      <md-menu-content :class="contentClasses" v-show="hasScopedEmptySlot || hasFilteredItems" :show="showMenu">
        <div class="md-autocomplete-loading" v-if="isPromisePending">
          <md-progress-spinner :md-diameter="40" :md-stroke="4" md-mode="indeterminate" />
        </div>

        <div class="md-autocomplete-items" v-if="hasFilteredItems ">
          <md-menu-item v-for="(item, index) in getOptionsComputed" :key="index" @click="selectItem(item, $event)">
            <span v-html="$options.filters.highlight(item,[searchTerm])"></span>
          </md-menu-item>
        </div>

        <md-menu-item v-else-if="hasScopedEmptySlot">
          <div class="md-autocomplete-empty">
            <slot name="md-autocomplete-empty" :term="searchTerm" />
          </div>
        </md-menu-item>
      </md-menu-content>
    </md-menu>

    <slot />
  </md-field>
</template>

<script>
	import localConfig  from '@localconfig/config.json';

  import fuzzy from 'fuzzysearch'
  import isPromise from 'is-promise'
  import MdPropValidator from '../core/utils/MdPropValidator'
	import MdField from "@/components/Material_lib/MdField/MdField.vue"
	import MdInput from "@/components/Material_lib/MdField/MdInput/MdInput.vue"
	import MdProgressSpinner from "@/components/Material_lib/MdProgress/MdProgressSpinner.vue"
	import MdMenuItem from "@/components/Material_lib/MdMenu/MdMenuItem.vue"
	import MdMenuContent from "@/components/Material_lib/MdMenu/MdMenuContent.vue"
	import MdMenu from "@/components/Material_lib/MdMenu/MdMenu.vue"

  export default {
		components: {
			MdField,
			MdInput,
			MdProgressSpinner,
			MdMenuItem,
			MdMenuContent,
			MdMenu
		},

		emits:['md-selected','update:modelValue','md-opened','md-changed','md-closed'],
    name: 'MdAutocomplete',
    props: {
      modelValue: {
        type: null,
        required: true
      },
      mdDense: Boolean,
      mdLayout: {
        type: String,
        default: 'floating',
        ...MdPropValidator('md-layout', [
          'floating',
          'box'
        ])
      },
      mdOpenOnFocus: {
        type: Boolean,
        default: true
      },
      mdFuzzySearch: {
        type: Boolean,
        default: true
      },
      mdOptions: {
        type: [Array, Promise],
        required: true
      },
      mdInputName: String,
      mdInputId: String,
      mdInputMaxlength: [String, Number],
      mdInputPlaceholder: [String, Number]
    },
    data () {
      return {
        searchTerm: this.modelValue,
				
        showMenu: false,
        triggerPopover: false,
        isPromisePending: false,
        filteredAsyncOptions: [],
				
      }
    },
    computed: {
      isBoxLayout () {
        return this.mdLayout === 'box'
      },
      fieldClasses () {
        if (this.isBoxLayout) {
          return 'md-autocomplete-box'
        }
      },
      contentClasses () {
        if (this.isBoxLayout) {
          return 'md-autocomplete-box-content'
        }
      },
      shouldFilter () {
        return this.mdOptions[0] && this.searchTerm
      },
      filteredStaticOptions () {
        if (this.isPromise(this.mdOptions)) {
          return false
        }

        const firstItem = this.mdOptions[0]

        if (this.shouldFilter) {
          if (typeof firstItem === 'string') {
            return this.filterByString()
          } else if (typeof firstItem === 'object') {
            return this.filterByObject()
          }
        }

        return this.mdOptions
      },
      hasFilteredItems () {
				if(this.showMenu) {
        	return this.filteredStaticOptions.length > 0 || this.filteredAsyncOptions.length > 0
				} else {
					return false;
				}
      },
      hasScopedEmptySlot () {
        return this.$slots['md-autocomplete-empty']
      },
			getOptionsComputed () {
				return this.showMenu ? this.getOptions() : [];
			}
			
    },
    watch: {
      mdOptions: {
        deep: true,
        immediate: true,
        handler () {
          if (this.isPromise(this.mdOptions)) {
            this.isPromisePending = true
            this.mdOptions.then(options => {
              this.filteredAsyncOptions = options
              this.isPromisePending = false
            })
          }
        }
      },

      modelValue (val) {
				
        this.searchTerm = val
				
      },
			searchTerm(){
				
				this.onInput();
				
			}
    },
		filters: {
			highlight: function (text, words) {
				var newText = text;
				for(var i in words) {
					var query = words[i];
					//visoDebug(query, (new Error));
					if(query) {
						query = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
						//visoDebug(query, (new Error));
						
						var check = new RegExp(query, "ig");
						if(newText) {
							newText = newText.toString().replace(check, function(matchedText){
								
								return ('<strong>' + matchedText + '</strong>');
								
								
							});
						}
					}
				}
				
				return newText;
			}
		},
    methods: {
			clearField () {
				this.searchTerm = "";
				this.$emit('md-changed', this.searchTerm)
				
				
			},
      getOptions () {
				
				var options = false;

        if (this.isPromise(this.mdOptions)) {
          options =  this.filteredAsyncOptions
        } else {
					options = this.filteredStaticOptions
				}
				if(localConfig.debugMd && !localConfig.prod && options) {
					
					options = options.slice(0,6);
					
				}
				

        return options;
      },
      isPromise (obj) {
				//console.log('uu')
        return isPromise(obj)
      },
      matchText (item) {
				//console.log('ll')
        const target = item.toLowerCase()
        const search = this.searchTerm.toLowerCase()

        if (this.mdFuzzySearch) {
          return fuzzy(search, target)
        }

        return target.includes(search)
      },
      filterByString () {
				
        return this.mdOptions.filter(item => this.matchText(item))
      },
      filterByObject () {
				
				//return this.mdOptions;
				//console.log('jj')
				const filteredOptions = this.mdOptions.filter(item => this.matchText(item.descrizione));
				const sortedOptions = this.sortSearchedOptions(filteredOptions) 

  			return sortedOptions;
				
        
      },
			sortSearchedOptions: function(filteredOptions) {
				filteredOptions.sort((a, b) => {
					const aStartsWithSearch = a.descrizione.toLowerCase().startsWith(this.searchTerm.toLowerCase());
					const bStartsWithSearch = b.descrizione.toLowerCase().startsWith(this.searchTerm.toLowerCase());

					// Options starting with the search term come first
					if (aStartsWithSearch && !bStartsWithSearch) {
						return -1;
					} else if (!aStartsWithSearch && bStartsWithSearch) {
						return 1;
					} else {
						// For options with equal priority or when none starts with the search term, maintain the original order
						return 0;
					}
				});
				return filteredOptions;
			},
      openOnFocus () {
        if (this.mdOpenOnFocus) {
          this.showOptions()
        }
      },
      onInput (value) {
				
        //this.$emit('update:modelValue', value)
				if(value == "") {
					this.hideOptions();
				} else {
					if (!this.mdOpenOnFocus) {
						this.showOptions()
					}
					
					if (this.searchTerm.constructor.toString().match(/function (\w*)/)[1].toLowerCase() !== 'inputevent') {
						this.$emit('md-changed', this.searchTerm)
					}
				}
      },
      showOptions () {
				
        if (this.showMenu) {
          return false
        }

        this.showMenu = true
        this.$nextTick(() => {
          this.triggerPopover = true
          this.$emit('md-opened')
        })
      },
      hideOptions () {
				
				this.showMenu = false
				
        this.$nextTick(() => {
          this.triggerPopover = false
          this.$emit('md-closed')
					
        })
      },
      selectItem (item, $event) {
				
        const content = $event.target.textContent.trim()

        this.searchTerm = content
				
        this.$emit('update:modelValue', item)
        this.$emit('md-selected', item, $event)
        this.hideOptions()
      }
    }
  }
</script>

<style lang="scss">
  @import "@/components/Material_lib/MdAnimation/variables";
  @import "@/components/Material_lib/MdElevation/mixins";
  @import "@/components/Material_lib/MdLayout/mixins";

  .md-autocomplete {
    .md-menu {
      width: 100%;
      display: flex;
    }
  }

  .md-autocomplete-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
  }

  .md-field.md-inline.md-autocomplete-box {
    @include md-elevation(2);
    padding-top: 2px;
    border-radius: 2px;

    &.md-focused {
      z-index: 120;
    }

    &:before,
    &:after {
      display: none;
    }

    .md-toolbar & {
      min-height: 40px;
      height: 40px;
      margin: 0;
      box-shadow: none;
    }

    .md-menu {
      align-items: center;
    }

    .md-input {
      padding-left: 16px;
    }

    &.md-focused label,
    label,
    .md-input-action {
      top: 50%;
      transform: translateY(-50%);
    }

    .md-input-action {
      right: 8px;
    }

    &.md-focused label,
    label {
      margin-top: 2px;
      left: 16px;
    }
  }

  .md-autocomplete-box-content:after {
    height: 6px;
    position: absolute;
    top: -6px;
    right: 0;
    left: 0;
    z-index: 120;
    border-bottom: 1px solid;
    content: "";
  }
</style>
