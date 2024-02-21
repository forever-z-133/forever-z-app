import type { Meta, StoryObj } from '@storybook/vue3'
import { InfoList, InfoListItem } from 'common'

const meta: Meta<typeof InfoList> = {
  title: 'Example/InfoList',
  component: InfoList,
  argTypes: {
    labelWidth: { description: '介绍词宽度', control: 'text' },
    labelPosition: { description: '介绍词所在位置', options: ['left', 'right', 'top'] },
  },
}
export default meta

// 案例模板
const InfoListExampleTemplate: StoryObj<typeof InfoList> = {
  render: args => ({
    components: { InfoList, InfoListItem },
    setup: () => ({
      args,
      infos: [
        { label: '姓名', value: '张三' },
        { label: '年龄', value: '21' },
        { label: '学历', value: '全日制本科', tooltip: '北京戏剧学院' },
        { label: '办公地址', value: '湖北省武汉市江夏区腾讯研发中心' },
        { label: '长文本', value: '字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字字' },
        { label: '个人简介', value: '文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本', ellipsis: false },
      ],
    }),
    template: `
      <InfoList v-bind="args">
        <template v-for="(item, index) in infos" :key="index">
          <InfoListItem v-bind="item" />
        </template>
      </InfoList>
    `,
  }),
}

// 常规使用
export const Basic: StoryObj<typeof InfoList> = {
  args: {
    labelWidth: 'auto',
    labelPosition: 'left',
  },
  ...InfoListExampleTemplate,
}

// 介绍词右对齐
export const AlignRight: StoryObj<typeof InfoList> = {
  args: {
    labelWidth: '4em',
    labelPosition: 'right',
  },
  ...InfoListExampleTemplate,
}

// 介绍词居顶
export const AlignTop: StoryObj<typeof InfoList> = {
  args: {
    labelWidth: 'auto',
    labelPosition: 'top',
  },
  ...InfoListExampleTemplate,
}
