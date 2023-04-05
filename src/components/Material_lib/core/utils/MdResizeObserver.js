//import raf from 'raf'
import MdObserveEvent from './MdObserveEvent'

export default (el = window, observerFn) => {
  const observer = MdObserveEvent(el, 'resize', () => {
    window.requestAnimationFrame(observerFn)
  }, { passive: true })

  return {
    destroy: observer.destroy
  }
}
