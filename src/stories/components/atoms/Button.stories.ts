import React from 'react';
import { Button as ButtonComponent } from '@components/atoms';
import { ButtonDesignTypes } from '@components/atoms/button/ButtonEnums.ts';
import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Example/Button',
  component: ButtonComponent,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    design: {
      description: 'design type',
      table: { type: ButtonDesignTypes },
    },
  },
} satisfies Meta<typeof ButtonComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Button: Story = {
  args: { design: ButtonDesignTypes.Button, children: React.createElement('span', null, 'click me!') },
};
export const Link: Story = {
  args: { design: ButtonDesignTypes.Link, children: React.createElement('span', null, 'click me!') },
};
