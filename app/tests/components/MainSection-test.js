import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import MainSection from 'components/MainSection';
import ResourceItem from 'components/ResourceItem';

const emptyData = [];
const resourceItemData = [{
  text: '',
  id: '',
  index: 0,
  onIncrement: () => {},
  onDecrement: () => {},
  onDestroy: () => {}
}];
const stubFunctions = {
  onIncrement: () => {},
  onDecrement: () => {},
  onDestroy: () => {}
};

describe('<MainSection />', () => {
  describe('With Resources', () => {
    it('should render <ResourceItem> list items', () => {
      expect(mount(<MainSection resources={resourceItemData} {...stubFunctions} />).find(ResourceItem).length).toBe(1);
    });
  });

  describe('Without Resources', () => {
    it('should not render <ResourceItem> list items', () => {
      expect(mount(<MainSection resources={emptyData} {...stubFunctions} />).find(ResourceItem).length).toBe(0);
    });
  });
});
