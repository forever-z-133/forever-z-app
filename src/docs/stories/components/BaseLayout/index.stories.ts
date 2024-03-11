import type { Meta, StoryObj } from '@storybook/vue3'
import { BaseLayout } from 'common'
import Header from './mock/Header.vue'
import Content from './mock/Content.vue'
import Left from './mock/Left.vue'
import Right from './mock/Right.vue'
import Footer from './mock/Footer.vue'

const meta: Meta<typeof BaseLayout> = {
  title: 'Example/BaseLayout',
  component: BaseLayout,
  argTypes: {
    headerContainLeft: { description: '页首包含左侧' },
  },
}
export default meta

// 案例模板
function BaseLayoutExampleTemplate(comps: string[]): StoryObj<typeof BaseLayout> {
  const components = { header: Header, default: Content, left: Left, right: Right, footer: Footer }
  return {
    render: args => ({
      components: { BaseLayout, Header, Content, Left, Right, Footer },
      setup: () => ({ args, components, comps }),
      template: `
      <BaseLayout v-bind="args">
        <template v-for="name in comps" :key="name">
          <component :is="components[name]" />
        </template>
      </BaseLayout>
    `,
    }),
  }
}

// 常规使用
export const Basic: StoryObj<typeof BaseLayout> = {
  args: {
    headerContainLeft: true,
    headerContainRight: true,
  },
  ...BaseLayoutExampleTemplate(['header', 'default', 'left', 'right', 'footer']),
}
