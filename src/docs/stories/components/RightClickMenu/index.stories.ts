import type { Meta, StoryObj } from '@storybook/vue3'
import { RightClickMenu } from 'common'

const meta: Meta<typeof RightClickMenu> = {
  title: 'Example/RightClickMenu',
  component: RightClickMenu,
  tags: ['autodocs'],
  argTypes: {
    menus: {
      description: '插件菜单数据',
    },
    valueKey: {
      description: '菜单数据的唯一标识',
    },
    labelKey: {
      description: '菜单数据在显示时所使用的值键',
    },
    clickable: {
      description: '同时支持左键点击',
    },
    // @ts-expect-error: Unreachable code error
    onCommand: {},
  },
}
export default meta

// 常规使用
export const Basic: StoryObj<typeof RightClickMenu> = {
  args: {
    menus: ['Action 1', 'Action 2'],
  },
}

// 数据为 json 格式
export const JsonDataMenus: StoryObj<typeof RightClickMenu> = {
  args: {
    menus: [
      { id: 1, name: 'Action 1' },
      { id: 2, name: 'Action 2', disabled: true },
      { id: 3, name: 'Action 3' },
    ],
    valueKey: 'id',
    labelKey: 'name',
  },
}

// 自定义触发元素
export const DefaultSlot: StoryObj<typeof RightClickMenu> = {
  args: {
    menus: ['Action 1', 'Action 2'],
  },
  render: args => ({
    components: { RightClickMenu },
    setup: () => ({ ...args }),
    template: `
      <RightClickMenu :menus="menus" @command="onCommand">
        右键点击我
      </RightClickMenu>
    `,
  }),
}

// 自定义菜单项
export const ItemSlot: StoryObj<typeof RightClickMenu> = {
  args: {
    menus: [{ key: 'A' }, { key: 'B' }],
    valueKey: 'key',
    labelKey: 'key',
  },
  render: args => ({
    components: { RightClickMenu },
    setup: () => ({ ...args }),
    template: `
      <RightClickMenu
        :menus="menus"
        :value-key="valueKey"
        :label-key="labelKey"
        @command="onCommand"
      >
        <template #item="{ row, label }">
          <div :style="{ color: row.key === 'A' ? 'red' : '' }">
            {{ label }}
          </div>
        </template>
      </RightClickMenu>
    `,
  }),
}
