

export default (name, options) => {
  return {
    validator: value => {
      if (options.includes(value)) {
        return true
      }

      

      return false
    }
  }
}
