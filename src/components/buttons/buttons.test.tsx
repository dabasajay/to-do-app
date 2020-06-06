import React from 'react';
import { Button, ButtonPropTypes } from './buttons';
import { shallow, ShallowWrapper } from 'enzyme';

const setup = (props: ButtonPropTypes = {type: 'button', text: 'test'}) : ShallowWrapper => {
  return shallow(<Button {...props}/>);
}

describe('[buttons.tsx]', () => {
  it('should render Button without errors', () => {
    const wrapper : ShallowWrapper = setup();
    const button : ShallowWrapper = wrapper.find('button');
    expect(button.length).toBe(1);
  })
  it('should call the passed callback on click', () => {
    const mockCallback = jest.fn();
    const wrapper : ShallowWrapper = setup({
      type: 'button',
      text: 'test',
      onClick: mockCallback
    });
    const button : ShallowWrapper = wrapper.find('button');
    button.simulate('click');
    expect(mockCallback).toBeCalledTimes(1);
  })
});