import React from 'react';
import { todoType } from '../../providers/application';
import { ProviderWrapper } from '../../App';
import { TodoBox } from './todoBox';
import { mount, ReactWrapper } from 'enzyme';

const setup = (props: todoType) : ReactWrapper => {
  return mount(
    <ProviderWrapper>
      <TodoBox {...props}/>
    </ProviderWrapper>
  );
};

const sampleActiveTodo : todoType = {
  id: 0,
  status: true,
  text: 'test active'
};

const sampleCompletedTodo : todoType = {
  id: 0,
  status: false,
  text: 'test completed'
};

describe('[todoBox.tsx]', () => {
  it('should render TodoBox without errors', () => {
    setup(sampleActiveTodo);
    setup(sampleCompletedTodo);
  })
  it('should contain 1 textarea and 3 buttons (Edit,Mark,Remove) for active todo in view mode', () => {
    const wrapper : ReactWrapper = setup(sampleActiveTodo);
    const textarea = wrapper.find('textarea');
    const buttons = wrapper.find('button > span');
    expect(textarea.length).toBe(1);
    expect(buttons.length).toBe(3);
    expect(buttons.at(0).text()).toBe('Edit');
    expect(buttons.at(1).text()).toBe('Mark');
    expect(buttons.at(2).text()).toBe('Remove');
  })
  it('should contain 1 textarea and 2 buttons (Unmark,Remove) for completed todo', () => {
    const wrapper : ReactWrapper = setup(sampleCompletedTodo);
    const textarea = wrapper.find('textarea');
    const buttons = wrapper.find('button');
    expect(textarea.length).toBe(1);
    expect(buttons.length).toBe(2);
    expect(buttons.at(0).text()).toBe('Unmark');
    expect(buttons.at(1).text()).toBe('Remove');
  })
  it('should contain 1 textarea and 3 buttons (Save,Mark,Remove) for active todo in edit mode', () => {
    const wrapper : ReactWrapper = setup(sampleActiveTodo);
    const buttons = wrapper.find('button > span');
    const editButton = buttons.at(0).simulate('click');
    editButton.update();
    const textarea = wrapper.find('textarea');
    const updatedButtons = wrapper.find('button > span');
    expect(textarea.length).toBe(1);
    expect(updatedButtons.length).toBe(3);
    expect(updatedButtons.at(0).text()).toBe('Save');
    expect(updatedButtons.at(1).text()).toBe('Mark');
    expect(updatedButtons.at(2).text()).toBe('Remove');
  })
  it('should update controlled textarea value on change', () => {
    const wrapper : ReactWrapper = setup(sampleActiveTodo);
    const textarea : ReactWrapper = wrapper.find('textarea');
    textarea.simulate('change', { target: { value: 'Hello' } })
    textarea.update(); // Let state update
    const updatedtextarea : ReactWrapper = wrapper.find('textarea');
    expect(updatedtextarea.prop('value')).toBe('Hello');
  })
  it('should focus on textarea when edit button is clicked', () => {
    const wrapper : ReactWrapper = setup(sampleActiveTodo);
    const buttons = wrapper.find('button > span');
    const editButton = buttons.at(0).simulate('click');
    editButton.update();
    const isTextareaElementSelected = document?.activeElement instanceof HTMLTextAreaElement || false;
    expect(isTextareaElementSelected).toBe(true);
    // @ts-ignore
    expect(document?.activeElement?.dataset?.test).toBe('component-textarea');
  })
});