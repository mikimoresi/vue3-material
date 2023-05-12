import MdRipple from '@/components/Material_lib/MdRipple/MdRipple.vue'


export default {
	emits:['update:modelValue'],
  components: {
    MdRipple
  },
  props: {
    model: [String, Boolean, Object, Number, Array],
    value: {
      type: [String, Boolean, Object, Number],
    },
    name: [String, Number],
    required: Boolean,
    disabled: Boolean,
    indeterminate: Boolean,
    trueValue: {
      default: true
    },
    falseValue: {
      default: false
    },
		modelValue:false
  },
  model: {
    prop: 'model',
    event: 'change'
  },
  data: () => ({
    rippleActive: false,
		innervalue: false,
  }),
  computed: {
    attrs () {
      const attrs = {
        id: this.id,
        name: this.name,
        disabled: this.disabled,
        required: this.required,
        'true-value': this.trueValue,
        'false-value': this.falseValue
      }
			attrs.modelValue = this.$attrs.modelValue;
      

      return attrs
    },
    
    
    checkClasses () {
      return {
        'md-checked': this.innervalue,
        'md-disabled': this.disabled,
        'md-required': this.required,
        'md-indeterminate': this.indeterminate
      }
    },
    
  },
	watch: {
		modelValue(value){
			var innerValue = this.innervalue === undefined ? false : this.innervalue;
			var valueParsed = value === undefined ? false : value;
			
			if(innerValue != valueParsed) {
				
				this.toggleCheck();
			}
			
		},
	},
  methods: {
    
    toggleCheck () {
			
      if (!this.disabled) {
        this.rippleActive = true
				
        this.innervalue = !this.innervalue;
      	this.$emit('update:modelValue', this.innervalue)
				var _this = this;
				this.$nextTick(function(){
					if(_this.innervalue != _this.modelValue) {
						_this.innervalue = _this.modelValue;
					}
					_this.rippleActive = false
				});
      }
    }
  },
	mounted () {
		
		
    this.innervalue = this.$attrs.modelValue
		if(this.modelValue) {
			
			this.innervalue = true;
		}
  },
}
