import React from 'react';
import { Button, ButtonPropTypes } from './buttons';
import { shallow, ShallowWrapper } from 'enzyme';

import { findByTestAttr } from '../../utilities/testUtils';

const setup = (props: ButtonPropTypes) : ShallowWrapper => {
  return shallow(<Button {...props}/>);
}

describe('[buttons.tsx]', () => {
  it('should render Button without errors', () => {
    const wrapper : ShallowWrapper = setup({
      type: 'button',
      text: 'test'
    });
    const button : ShallowWrapper = findByTestAttr(wrapper, 'component-button');
    expect(button.length).toBe(1);
  })
});