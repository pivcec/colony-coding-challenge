import React from 'react'
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PopoverContent, { AvatarList } from '../components/PopoverContent';
import availableAvatars from '../data/availableAvatars';

Enzyme.configure({ adapter: new Adapter() });

describe('Renders...', () => {
  it('Renders div.popover-content', () => {
    const popoverContent = mount(<PopoverContent
      activeAvatarId={null}
      hoveredAvatarId={null}
      selectedAvatarId={1}
      updateHoveredAvatarId={id => updateHoveredAvatarId(id)}
      updateSelectedAvatarId={id => updateSelectedAvatarId(id)}
    />);
    const divPopoverContent = popoverContent.find('div.popover-content');
    expect(popoverContent).toHaveLength(1);
  })

  it('Renders n number of Avatar child components', () => {
    const totalNumberOfAvatars = availableAvatars.length;
    const popoverContent = mount(<PopoverContent
      activeAvatarId={null}
      hoveredAvatarId={null}
      selectedAvatarId={1}
      updateHoveredAvatarId={id => updateHoveredAvatarId(id)}
      updateSelectedAvatarId={id => updateSelectedAvatarId(id)}
    />);
    const avatarList = popoverContent.find(AvatarList);
    const avatarListLi = avatarList.find('ul').children();
    expect(avatarListLi).toHaveLength(totalNumberOfAvatars);
  })
});
