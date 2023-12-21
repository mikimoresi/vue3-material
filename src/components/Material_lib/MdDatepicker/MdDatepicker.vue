<template>
  <md-field :class="['md-datepicker', { 'md-native': !mdOverrideNative }]" :md-clearable="mdClearable" @md-clear="onClear" >
    <md-date-icon class="md-date-icon" @click="toggleDialog" />
    <md-input :type="type" ref="input" v-model="inputDate" @focus="onFocus" @blur="onBlur($event)" :pattern="pattern" />

    <slot />
		
    <keep-alive>
      <md-datepicker-dialog
        v-if="showDialog"
        v-model:mdDate="localDate"
        :md-disabled-dates="mdDisabledDates"
        :mdImmediately="mdImmediately"
				
        @mdClosed="toggleDialog"
      />
    </keep-alive>

    <md-overlay class="md-datepicker-overlay" md-fixed :md-active="showDialog" @click="toggleDialog" />
  </md-field>
</template>

<script>
  
	
  import format from 'date-fns/format/index.js'
  import parse from 'date-fns/parse/index.js'
  import isValid from 'date-fns/isValid/index.js'
  import MdPropValidator from '../core/utils/MdPropValidator'
  import MdOverlay from '@/components/Material_lib/MdOverlay/MdOverlay.vue'
  import MdDatepickerDialog from './MdDatepickerDialog.vue'
  import MdDateIcon from '../core/icons/MdDateIcon.vue'
  import MdDebounce from '../core/utils/MdDebounce'
  import MdField from '@/components/Material_lib/MdField/MdField.vue'
  import MdInput from '@/components/Material_lib/MdField/MdInput/MdInput.vue'

  export default {
		emits: ['update:modelValue','md-opened','md-closed','md-clear'],
    name: 'MdDatepicker',
    components: {
      MdOverlay,
      MdDateIcon,
      MdField,
      MdInput,
      MdDatepickerDialog
    },
    props: {
			
      value: [String, Number, Date],
      mdDisabledDates: [Array, Function],
      mdOpenOnFocus: {
        type: Boolean,
        default: true
      },
      mdOverrideNative: {
        type: Boolean,
        default: true
      },
      mdImmediately: {
        type: Boolean,
        default: false
      },
      mdModelType: {
        type: Function,
        default: Date,
        ...MdPropValidator('md-model-type', [Date, String, Number])
      },
      MdDebounce: {
        type: Number,
        default: 1000
      },
      mdClearable: {
        type: Boolean,
        default: true
      },
			modelValue: false,
    },
    data: () => ({
      showDialog: false,
      // String for input
      inputDate: '',
      // Date for real value
      localDate: null

			
    }),
    computed: {
      
      type () {
        return this.mdOverrideNative
          ? 'text'
          : 'date'
      },
      dateFormat () {
        return 'dd/MM/yyyy';
      },
      modelType () {
        if (this.isModelTypeString) {
          return String
        } else if (this.isModelTypeNumber) {
          return Number
        } else if (this.isModelTypeDate) {
          return Date
        } else {
          return this.mdModelType
        }
      },
      isModelNull () {
        return this.value === null || this.value === undefined
      },
      isModelTypeString () {
        return typeof this.value === 'string'
      },
      isModelTypeNumber () {
        return Number.isInteger(this.value) && this.value >= 0
      },
      isModelTypeDate () {
        return typeof this.value === 'object' && this.value instanceof Date && isValid(this.value)
      },
      localString () {
        return this.localDate && format(this.localDate, this.dateFormat)
      },
      localNumber () {
        return this.localDate && Number(this.localDate)
      },
      parsedInputDate () {
        const parsedDate = parse(this.inputDate, this.dateFormat, new Date())
        return parsedDate && isValid(parsedDate) ? parsedDate : null
      },
      pattern () {
        return this.dateFormat.replace(/yyyy|MM|dd/g, match => {
          switch (match) {
          case 'yyyy':
            return '[0-9]{4}'
          case 'MM':
          case 'dd':
            return '[0-9]{2}'
          }
        })
      }
    },
    watch: {
			modelValue(value){
				if(this.inputDate != value) {
					this.inputDate = value;
				}
				
			},
      inputDate (value) {
        this.inputDateToLocalDate()
      },
      localDate () {
				//console.log(this.localDate);
				//console.log(this.localString);
        this.inputDate = this.localString
        if (this.modelType === Date) {
          this.$emit('update:modelValue', this.localDate)
        }
      },
      localString () {
        if (this.modelType === String) {
          this.$emit('update:modelValue', this.localString)
        }
      },
      localNumber () {
        if (this.modelType === Number) {
          this.$emit('update:modelValue', this.localNumber)
        }
      },
      value: {
        immediate: true,
        handler () {
					
          this.valueDateToLocalDate()
        }
      },
			
      mdModelType (type) {
        switch (type) {
        case Date:
          this.$emit('update:modelValue', this.localDate)
          break
        case String:
          this.$emit('update:modelValue', this.localString)
          break
        case Number:
          this.$emit('update:modelValue', this.localNumber)
          break
        }
      },
      dateFormat () {
        if (this.localDate) {
          this.inputDate = format(this.localDate, this.dateFormat)
        }
      }
    },
    methods: {
      toggleDialog () {
				
				var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
        if (!isFirefox || this.mdOverrideNative) {
          this.showDialog = !this.showDialog;
          if (this.showDialog) {
            this.$emit('md-opened')
          } else {
            this.$emit('md-closed')
          }
        } else {
          this.$refs.input.$el.click()
        }
      },
			onBlur (event) {
				
				if(event && !event.relatedTarget || !event) {
        	this.showDialog = false;
					this.$emit('md-closed');
				}
				
        
        
      },
      onFocus () {
        if (this.mdOpenOnFocus ) {
					
          this.toggleDialog()
        }
      },
      inputDateToLocalDate () {
        if (this.inputDate) {
          if (this.parsedInputDate) {
            this.localDate = this.parsedInputDate
          }
        } else {
          this.localDate = null
        }
      },
      valueDateToLocalDate () {
        if (this.isModelNull) {
          this.localDate = null
        } else if (this.isModelTypeNumber) {
          this.localDate = new Date(this.value)
        } else if (this.isModelTypeDate) {
          this.localDate = this.value
        } else if (this.isModelTypeString) {
          let parsedDate = parse(this.value, this.dateFormat, new Date())

          if (isValid(parsedDate)) {
            this.localDate = parse(this.value, this.dateFormat, new Date())
						
          } else {
           	console.log(`The datepicker value is not a valid date. Given value: ${this.value}, format: ${this.dateFormat}`)
          }
        } else {
          console.log(`The datepicker value is not a valid date. Given value: ${this.value}`)
        }
				
      },
      onClear () {
				
				this.inputDate = "";
        this.$emit('md-clear')
      }
    },
    created () {
      this.inputDateToLocalDate = MdDebounce(this.inputDateToLocalDate, this.MdDebounce)
			this.inputDate = this.modelValue
    }
  }
</script>

<style lang="scss">
  @import "@/components/Material_lib/MdAnimation/variables";
  @import "@/components/Material_lib/MdLayout/mixins";

  .md-datepicker-overlay {
    opacity: 0;

    @include md-layout-xsmall {
      opacity: 1;
    }
  }

  .md-datepicker {
    &.md-native {
      label {
        top: 0 !important;
      }
    }

    .md-date-icon {
      cursor: pointer;
    }

    input[type=date]::-webkit-clear-button,
    input[type=date]::-webkit-inner-spin-button,
    input[type=date]::-webkit-calendar-picker-indicator {
      display: none;
    }
  }
</style>
