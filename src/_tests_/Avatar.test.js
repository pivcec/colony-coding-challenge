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

  it('Renders correct style when avatar image is not active, is hovered and is not selected', () => {
    const updateHoveredAvatarId = jest.fn();
    const updateSelectedAvatarId = jest.fn();
    const avatar = mount(<Avatar
      activeAvatarId={null}
      hoveredAvatarId={1}
      id={1}
      selectedAvatarId={2}
      updateHoveredAvatarId={() => updateHoveredAvatarId()}
      updateSelectedAvatarId={() => updateSelectedAvatarId()}
    />);
    const avatarImage = avatar.find(AvatarImage);
    const avatarImageStyle = avatarImage.prop('style');
    expect(avatarImageStyle).toHaveProperty('border', '3px solid rgb(155, 160, 163)');
  });

  it('Renders correct style when avatar image is not active, is hovered and is selected', () => {
    const updateHoveredAvatarId = jest.fn();
    const updateSelectedAvatarId = jest.fn();
    const avatar = mount(<Avatar
      activeAvatarId={null}
      hoveredAvatarId={1}
      id={1}
      selectedAvatarId={1}
      updateHoveredAvatarId={() => updateHoveredAvatarId()}
      updateSelectedAvatarId={() => updateSelectedAvatarId()}
    />);
    const avatarImage = avatar.find(AvatarImage);
    const avatarImageStyle = avatarImage.prop('style');
    expect(avatarImageStyle).toHaveProperty('border', '3px solid rgb(122, 161, 178)');
  });

  it('Renders correct style when avatar image is not active, is not hovered and is selected', () => {
    const updateHoveredAvatarId = jest.fn();
    const updateSelectedAvatarId = jest.fn();
    const avatar = mount(<Avatar
      activeAvatarId={null}
      hoveredAvatarId={null}
      id={1}
      selectedAvatarId={1}
      updateHoveredAvatarId={() => updateHoveredAvatarId()}
      updateSelectedAvatarId={() => updateSelectedAvatarId()}
    />);
    const avatarImage = avatar.find(AvatarImage);
    const avatarImageStyle = avatarImage.prop('style');
    expect(avatarImageStyle).toHaveProperty('border', '3px solid rgb(122, 161, 178)');
  });
});
