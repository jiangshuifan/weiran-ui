<template>
  <div @click="handleChangeSliderState" :style="{height: height?height+'px':vertical?'100px':'8px'}"
    @mouseleave="handleSliderLeave" @mousemove="handleSliderHover" :class="{'wr-slider':true,'is-vertical':vertical}"
    ref="slider">
    <div class="wr-slider-loaded" :style="[!vertical ? { width: currentValue + '%' } : { height: currentValue + '%' }]">
      <div class="wr-slider-button" @mouseleave="handleControllerLeave" @mouseover="handleControllerOver"
        @mousedown.prevent.stop="handleControlBtn" @touchstart="handleControlBtn" @mousemove.prevent.stop=""
        @click.prevent.stop="">
        <slot>
          <div class="wr-slider-inner-btn"></div>
        </slot>
        <div v-if="firstRenderSliderBtn" v-show="controllerMousedown" class="wr-slider-tooltip">
          {{ toolTipValue }}
        </div>
      </div>
      <div v-if="(firstRenderSliderloader && !vertical)" v-show="!controllerMousedown && isloaderHover"
        :style="[!vertical ? { left: loadToolTipLeft + 'px' } : { top: loadToolTipLeft + 'px' }]"
        class="wr-slider-loader-tooltip">
        {{ loadToolTipValue }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'wrSlider',
  props: {
    step: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 100
    },
    formatTooltip: {
      type: Function
    },
    height: Number,
    value: {
      type: Number
    },
    autoChange: {
      type: Boolean,
      default: true
    },
    vertical: {
      type: Boolean,
      default: false
    }

  },
  data() {
    return {
      isControlled: false,
      isloaderHover: false,
      currentValue: 0,
      loadToolTipValue: 0,
      loadToolTipLeft: 0,
      firstRenderSliderBtn: false,
      toolTipValue: 0,
      firstRenderSliderloader: false,
      controllerMousedown: false
    }
  },
  created() {
    if (this.formatTooltip) {
      this.toolTipValue = this.formatTooltip(this.currentValue)
    }
  },
  methods: {
    handleSliderLeave() {
      this.isloaderHover = false
      this.firstRenderSliderloader = false
    },
    handleControllerLeave() {
      this.isControlled = false
    },
    handleControllerOver() {
      this.isControlled = true
      this.firstRenderSliderBtn = true
    },
    handleSliderHover(e) {
      let DOMRect = this.$refs.slider.getBoundingClientRect()
      this.loadToolTipLeft = e.offsetX
      if (this.vertical) {
        this.loadToolTipLeft = e.offsetY
      }
      this.firstRenderSliderloader = true
      this.isloaderHover = true
      let width = this.vertical ? DOMRect.height : DOMRect.width
      this.calculateProcess({ current: this.vertical ? e.offsetY : e.offsetX, width, setLoadToolTip: true, setToolTip: true })
    },
    handleChangeSliderState(e) {
      if (!this.isControlled) {
        let DOMRect = this.$refs.slider.getBoundingClientRect()
        this.controllerMousedown = true
        let width = this.vertical ? DOMRect.height : DOMRect.width
        this.currentValue = this.calculateProcess({ current: this.vertical ? width - e.offsetY : e.offsetX, width, emitInput: true, emitChange: true })
        this.controllerMousedown = false
      }
    },
    onDragging(e) {
      let DOMRect = this.$refs.slider.getBoundingClientRect()
      let left = DOMRect.left//????????????????????????
      let top = DOMRect.top//????????????????????????
      this.controllerMousedown = true
      let width = this.vertical ? DOMRect.height : DOMRect.width
      if (['touchstart', 'touchmove'].indexOf(e.type) !== -1) {
        e.clientY = e.touches[0].clientY;
        e.clientX = e.touches[0].clientX;
      }

      let v = this.vertical ? e.clientY - top : e.clientX - left
      let target = this.vertical ? width : 0
      if (v >= width) {
        target = this.vertical ? 0 : width
      } else if (v > 0) {
        target = this.vertical ? width - v : v
      }
      //???????????????
      this.currentValue = this.calculateProcess({ current: target, width, emitInput: this.autoChange, setToolTip: true })
    },
    handleControlBtn() {
      //????????????????????????
      window.addEventListener('mousemove', this.onDragging);
      window.addEventListener('touchmove', this.onDragging);
      window.addEventListener('mouseup', this.clearControlEvent);
      window.addEventListener('touchend', this.clearControlEvent);
      window.addEventListener('contextmenu', this.clearControlEvent);
    },
    //????????????
    calculateProcess({ current, width, realvalue, setToolTip = false, setLoadToolTip = false, emitInput = false, emitChange = false }) {
      let value
      //current???????????????????????????????????????
      let total = this.total
      let step = this.step
      if (realvalue) {
        value = realvalue
        if (realvalue > total) {
          value = total
        }
        if (realvalue < 0) {
          value = 0
        }
      } else {
        value = (current / width) * total
      }
      //????????????????????????????????????
      let section = Math.round(value / step)
      let target = section * step
      if (this.formatTooltip) {
        target = this.formatTooltip(target)//tooltip???
      }
      if (setToolTip) {
        this.toolTipValue = target
      }
      if (emitChange || this.controllerMousedown) {
        this.$emit('change', value)
      }
      if (this.controllerMousedown && emitInput) {
        this.$emit('input', value)
      }
      if (setLoadToolTip) {
        this.loadToolTipValue = target
      }
      return section * step / total * 100
      //???????????????
    },
    //????????????
    clearControlEvent() {
      window.removeEventListener('mousemove', this.onDragging);
      window.removeEventListener('touchmove', this.onDragging);
      window.removeEventListener('mouseup', this.clearControlEvent);
      window.removeEventListener('touchend', this.clearControlEvent);
      window.removeEventListener('contextmenu', this.clearControlEvent);
      this.isControlled = false
      this.controllerMousedown = false
    }
  },
  watch: {
    value: {
      handler(val) {
        if (val) {
          if (!this.controllerMousedown) {
            this.$nextTick(() => {
              let DOMRect = this.$refs.slider.getBoundingClientRect()
              let width = this.vertical ? DOMRect.height : DOMRect.width
              let target = this.calculateProcess({
                realvalue: val,
                width,
              })
              this.currentValue = target
            })
          }
        }
      },
      immediate: true
    },
  }
}
</script>