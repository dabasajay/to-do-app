import React from 'react';
import { ProviderWrapper } from '../../App';
import { Writer } from './writer';
import { mount, ReactWrapper } from 'enzyme';

const setup = () : ReactWrapper => {
  return mount(
    <ProviderWrapper>
      <Writer/>
    </ProviderWrapper>
  );
}

describe('[writer.tsx]', () => {
  const wrapper : ReactWrapper = setup();
  it('should render Writer form without errors', () => {
    const form : ReactWrapper = wrapper.find('form');
    const textarea : ReactWrapper = wrapper.find('textarea');
    const addButton : ReactWrapper = wrapper.find('button');
    expect(form.length).toBe(1);
    expect(textarea.length).toBe(1);
    expect(addButton.length).toBe(1);
  })
  it('should update controlled textarea value on change', () => {
    const textarea : ReactWrapper = wrapper.find('textarea');
    textarea.simulate('change', { target: { value: 'Hello' } })
    textarea.update(); // Let state update
    const updatedtextarea : ReactWrapper = wrapper.find('textarea');
    expect(updatedtextarea.prop('value')).toBe('Hello');
  })
  it('should reset controlled textarea value on submit', () => {
    const form : ReactWrapper = wrapper.find('form');
    form.simulate('submit')
    form.update(); // Let state update
    const updatedtextarea : ReactWrapper = wrapper.find('textarea');
    expect(updatedtextarea.prop('value')).toBe('');
  })
});