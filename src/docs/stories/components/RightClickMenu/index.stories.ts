import type { Meta, StoryObj } from '@storybook/vue3'
import { RightClickMenu } from 'common'

const meta: Meta<typeof RightClickMenu> = {
  title: 'Example/RightClickMenu',
  component: RightClickMenu,
  tags: ['autodocs'],
  argTypes: {
    menus: {},
    onClick: {},
  },
}
export default meta

export const Basic: StoryObj<typeof RightClickMenu> = {
  args: {
    menus: ['A', 'B'],
  },
}
