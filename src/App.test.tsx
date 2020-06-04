import React from 'react';
import App from './App';
import { shallow, ShallowWrapper } from 'enzyme';
import { findByTestAttr } from './utilities/testUtils';

const setup = (props: Object = {}, state: Object = {}) : ShallowWrapper => {
  return shallow(<App {...props} />);
}

describe('[App.tsx]', () => {
  it('should render App correctly', () => {
    const wrapper = setup();
    const appComponent = findByTestAttr(wrapper, 'component-app');
    expect(appComponent.length).toBe(1);
  })
});
