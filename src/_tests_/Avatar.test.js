import React from 'react'
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Avatar, { PieWrapper, AvatarImage } from '../components/Avatar';

Enzyme.configure({ adapter: new Adapter() });

describe('Renders...', () => {
  it('Renders PieWrapper when activeAvatarId === id', () => {
    const avatar = mount(<Avatar
      activeAvatarId={1}
      hoveredAvatarId={1}
      id={1}
      selectedAvatarId={2}
      updateHoveredAvatarId={id => updateHoveredAvatarId(id)}
      updateSelectedAvatarId={id => updateSelectedAvatarId(id)}
    />);
    const pieWrapper = avatar.find(PieWrapper);
    expect(pieWrapper.instance()).toBeInstanceOf(PieWrapper);
  })

  it('Renders AvatarImage when activeAvatarId !== id', () => {
    const avatar = mount(<Avatar
      activeAvatarId={1}
      hoveredAvatarId={3}
      id={3}
      selectedAvatarId={2}
      updateHoveredAvatarId={id => updateHoveredAvatarId(id)}
      updateSelectedAvatarId={id => updateSelectedAvatarId(id)}
    />);
    const avatarImage = avatar.find(AvatarImage);
    expect(avatarImage.instance()).toBeInstanceOf(React.Component);
  })

  it('Renders correct style when hoveredAvatarId === id && activeAvatarId !== id', () => {
    const avatar = mount(<Avatar
      activeAvatarId={null}
      hoveredAvatarId={1}
      id={1}
      selectedAvatarId={3}
      updateHoveredAvatarId={id => updateHoveredAvatarId(id)}
      updateSelectedAvatarId={id => updateSelectedAvatarId(id)}
    />);
    const avatarImageStyle = avatar.find(AvatarImage).prop('style');
    expect(avatarImageStyle).toHaveProperty('border', '3px solid rgb(155, 160, 163)');
    expect(avatarImageStyle).toHaveProperty('opacity', '0.8');
  })

  it('Renders correct style when id === selectedAvatarId', () => {
    const avatar = mount(<Avatar
      activeAvatarId={null}
      hoveredAvatarId={null}
      id={1}
      selectedAvatarId={1}
      updateHoveredAvatarId={id => updateHoveredAvatarId(id)}
      updateSelectedAvatarId={id => updateSelectedAvatarId(id)}
    />);
    const avatarImageStyle = avatar.find(AvatarImage).prop('style');
    expect(avatarImageStyle).toHaveProperty('border', '3px solid rgb(122, 161, 178)');
  })  
});
