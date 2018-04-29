import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Avatar, { PieWrapper, AvatarImage } from '../components/Avatar';

Enzyme.configure({ adapter: new Adapter() });

describe('Renders...', () => {
  it('Renders PieWrapper when activeAvatarId === id', () => {
    const updateHoveredAvatarId = jest.fn();
    const updateSelectedAvatarId = jest.fn();
    const avatar = mount(<Avatar
      activeAvatarId={1}
      hoveredAvatarId={1}
      id={1}
      selectedAvatarId={2}
      updateHoveredAvatarId={() => updateHoveredAvatarId()}
      updateSelectedAvatarId={() => updateSelectedAvatarId()}
    />);
    const pieWrapper = avatar.find(PieWrapper);
    expect(pieWrapper.instance()).toBeInstanceOf(PieWrapper);
  });

  it('Renders AvatarImage when activeAvatarId !== id', () => {
    const updateHoveredAvatarId = jest.fn();
    const updateSelectedAvatarId = jest.fn();
    const avatar = mount(<Avatar
      activeAvatarId={null}
      hoveredAvatarId={null}
      id={1}
      selectedAvatarId={2}
      updateHoveredAvatarId={() => updateHoveredAvatarId()}
      updateSelectedAvatarId={() => updateSelectedAvatarId()}
    />);
    const avatarImage = avatar.find(AvatarImage);
    expect(avatarImage.instance()).toBeInstanceOf(React.Component);
  });
});
