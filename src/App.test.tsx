import React from 'react';
import { App, ProviderWrapper } from './App';
import { shallow, ShallowWrapper } from 'enzyme';

const setup = () : ShallowWrapper => {
  return shallow(
    <ProviderWrapper>
      <App />
    </ProviderWrapper>
  );
}

describe('[App.tsx]', () => {
  it('should render App without errors', () => {
    setup();
  })
});