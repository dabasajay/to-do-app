import React from 'react';
import { TextArea, TextAreaPropTypes } from './textArea';
import { shallow, ShallowWrapper } from 'enzyme';

const setup = (props: TextAreaPropTypes) : ShallowWrapper => {
  return shallow(<TextArea {...props}/>);
}

describe('[textArea.tsx]', () => {
  it('should render TextArea without errors', () => {
    const wrapper : ShallowWrapper = setup({});
    const textArea : ShallowWrapper = wrapper.find('textarea');
    expect(textArea.length).toBe(1);
  })
  it('should call the passed callback on change', () => {
    const mockCallback = jest.fn();
    const wrapper : ShallowWrapper = setup({
      onChange: mockCallback
    });
    const textArea : ShallowWrapper = wrapper.find('textarea');
    textArea.simulate('change');
    expect(mockCallback).toBeCalledTimes(1);
  })
});