import React from "react";
import List from "./List";

export default {
  title: "Example",
  component: List,
  argTypes: {
    itemCount: {
      control: {
        type: "radio",
        options: [5, 10, 20, 50]
      }
    }
  }
}

const Template = (args) => <List {...args}/>

export const Default = Template.bind({});

Default.args = {
  itemCount: 20,
}
