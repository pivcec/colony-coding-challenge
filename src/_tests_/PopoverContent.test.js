import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PopoverContent, { Header, AvatarList } from '../components/PopoverContent';
import availableAvatars from '../data/availableAvatars';

Enzyme.configure({ adapter: new Adapter() });

describe('Renders...', () => {
  it('Renders div.popover-content', () => {
    const updateHoveredAvatarId = jest.fn();
    const updateSelectedAvatarId = jest.fn();
    const popoverContent = mount(<PopoverContent
      activeAvatarId={null}
      hoveredAvatarId={null}
      selectedAvatarId={1}
      updateHoveredAvatarId={() => updateHoveredAvatarId()}
      updateSelectedAvatarId={() => updateSelectedAvatarId()}
    />);
    const divPopoverContent = popoverContent.find('div.popover-content');
    expect(divPopoverContent).toHaveLength(1);
  });

  it('Renders n number of Avatar child components', () => {
    const updateHoveredAvatarId = jest.fn();
    const updateSelectedAvatarId = jest.fn();
    const totalNumberOfAvatars = availableAvatars.length;
    const popoverContent = mount(<PopoverContent
      activeAvatarId={null}
      hoveredAvatarId={null}
      selectedAvatarId={1}
      updateHoveredAvatarId={() => updateHoveredAvatarId()}
      updateSelectedAvatarId={() => updateSelectedAvatarId()}
    />);
    const avatarList = popoverContent.find(AvatarList);
    const avatarListLi = avatarList.find('ul').children();
    expect(avatarListLi).toHaveLength(totalNumberOfAvatars);
  });

  it('Renders Header with correct text', () => {
    const updateHoveredAvatarId = jest.fn();
    const updateSelectedAvatarId = jest.fn();
    const popoverContent = mount(<PopoverContent
      activeAvatarId={null}
      hoveredAvatarId={null}
      selectedAvatarId={1}
      updateHoveredAvatarId={() => updateHoveredAvatarId()}
      updateSelectedAvatarId={() => updateSelectedAvatarId()}
    />);
    const header = popoverContent.find(Header);
    const headerText = header.text();
    expect(headerText).toEqual('Choose your avatar');
  });
});
