import { ShallowWrapper } from 'enzyme';

// A utility function to find a component in a
// shallow wrapper and return it
export const findByTestAttr =(wrapper: ShallowWrapper, value: String)
    :
    ShallowWrapper =>
{
    return wrapper.find(`[data-test="${value}"]`);
}