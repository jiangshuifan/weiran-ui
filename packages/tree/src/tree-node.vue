<template>
  <div class="wr-tree-node" ref="treeNode">
    <div @click="nodeExpand(data[defaultProps.children], data)" class="wr-tree-expand">
      <span :class="[
        'wr-tree-pre-icon',
        data.children
          ? !isExpanded
            ? 'wr-icon-fill-right'
            : 'wr-icon-fill-bottom'
          : '',
      ]"></span>
      <span>
        <slot>{{ data[defaultProps.label] }}</slot>
      </span>
    </div>
    <div class="wr-tree-node-group" v-if="firstExpandedFinish" v-show="isExpanded">
      <wr-tree-node :defaultProps="defaultProps" v-for="(child, index) in childData" :data="child" :key="index">
      </wr-tree-node>
    </div>
  </div>
</template>

<script>
export default {
  name: 'wrTreeNode',
  componentName: 'wrTreeNode',
  data() {
    return {
      childData: null,
      isExpanded: false,
      firstExpandedFinish: false,
    }
  },
  methods: {
    nodeExpand(children, nodeData) {
      if (children) {
        if (!this.firstExpandedFinish) {
          this.childData = children
          this.firstExpandedFinish = true
        }
        this.isExpanded = !this.isExpanded
        this.$nextTick(() => {
          console.dir(this.$refs.treeNode)
        })

      }
      this.$emit('node-click', nodeData)
    },
  },
  props: {
    data: Object,
    defaultProps: {
      type: Object,
    },
  },
}
</script>
