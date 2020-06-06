import React from 'react';
import { TextArea, TextAreaPropTypes } from './textArea';
import { shallow, ShallowWrapper } from 'enzyme';

import { findByTestAttr } from '../../utilities/testUtils';

const setup = (props: TextAreaPropTypes) : ShallowWrapper => {
  return shallow(<TextArea {...props}/>);
}

describe('[textArea.tsx]', () => {
  it('should render TextArea without errors', () => {
    const wrapper : ShallowWrapper = setup({});
    const textArea : ShallowWrapper = findByTestAttr(wrapper, 'component-textarea');
    expect(textArea.length).toBe(1);
  })
});