import { ShallowWrapper } from 'enzyme';

export const findByTestAttr = (wrapper: ShallowWrapper, value: String) : ShallowWrapper => {
    return wrapper.find(`[data-test="${value}"]`);
}