import type { Meta, StoryObj } from '@storybook/vue3'
import { InfoListItem } from 'common'
import ItemDefaultSlot from './examples/ItemDefaultSlot.vue'

const meta: Meta<typeof InfoListItem> = {
  title: 'Example/InfoListItem',
  component: InfoListItem,
  tags: ['autodocs'],
  argTypes: {
    // 由于 props 与 slots 有重名，需特殊处理
    'label': { description: '介绍词', control: 'text', table: { category: 'props', defaultValue: { summary: '\'\'' } } },
    'value': { description: '内容', control: 'text' },
    'tooltip': { description: '鼠标在内容上悬停时显示的内容', control: 'text' },
    'labelWidth': { description: '介绍词宽度，会覆盖 InfoList 父组件的值', control: 'text' },
    'ellipsis': { description: '内容超长时是否显示省略号', control: 'boolean' },
    // @ts-expect-error: Unreachable code error
    'slot:label': { name: 'label', table: { category: 'slots' } },
  },
}
export default meta

// 常规使用
export const Basic: StoryObj<typeof InfoListItem> = {
  args: {
    label: '姓名',
    value: '张三',
    tooltip: '张三',
    labelWidth: 'auto',
    ellipsis: true,
  },
}

// 自定义内容
export const DefaultSlot: StoryObj<typeof InfoListItem> = {
  args: {
    label: '场景ID',
    value: '129031213',
  },
  render: args => ({
    components: { ItemDefaultSlot },
    setup: () => ({ args }),
    template: `
      <ItemDefaultSlot v-bind="args" />
    `,
  }),
}
