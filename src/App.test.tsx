import React from 'react';
import { App, ProviderWrapper, sleep } from './App';
import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';

const setup = () : ReactWrapper => {
  return mount(
    <ProviderWrapper>
      <App />
    </ProviderWrapper>
  );
}

const API_CALL_WAIT_TIME : number = 20 * 1000;

describe('[App.tsx]', () => {
  it('should render App without errors', () => {
    setup();
  })
  it('should contain have spinner initially', () => {
    const wrapper : ReactWrapper = setup();
    const spinner = wrapper.find('div[className="loading-spinner-container"]');
    expect(spinner.length).toBe(1);
  })
  it('should contain 3 chuck norris jokes as todos initially, after loading', async () => {
    await act(async () => {
      const wrapper : ReactWrapper = setup();
      // sleep for a while to let API call finish and state update
      await sleep(API_CALL_WAIT_TIME / 2);
      wrapper.update(); // let the dom update
      const textarea = wrapper.find('textarea');
      expect(textarea.length).toBe(4); // 1 extra for todo addition form textarea
    })
  }, API_CALL_WAIT_TIME)
});