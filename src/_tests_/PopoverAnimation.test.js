import React from 'react'
import Enzyme, { mount } from 'enzyme';
import styled from 'styled-components'
import Adapter from 'enzyme-adapter-react-16';
import PopoverAnimation, { ShowPopoverAnimation, HidePopoverAnimation } from '../components/PopoverAnimation';

Enzyme.configure({ adapter: new Adapter() });

describe('Renders...', () => {
  it('Renders ShowPopoverAnimation when show === true', () => {
    const popoverAnimation = mount(<PopoverAnimation
      activeAvatarId={null}
      hide={true}
      hoveredAvatarId={null}
      selectedAvatarId={1}
      show={true}
      updateHoveredAvatarId={id => this.updateHoveredAvatarId(id)}
      updateSelectedAvatarId={id => this.updateSelectedAvatarId(id)}
    />);
    const showPopoverAnimation = popoverAnimation.find(ShowPopoverAnimation);
    expect(showPopoverAnimation.instance()).toBeInstanceOf(ShowPopoverAnimation);
  })

  it('Renders HidePopoverAnimation when show !== true', () => {
    const popoverAnimation = mount(<PopoverAnimation
      activeAvatarId={null}
      hide={true}
      hoveredAvatarId={null}
      selectedAvatarId={1}
      show={false}
      updateHoveredAvatarId={id => this.updateHoveredAvatarId(id)}
      updateSelectedAvatarId={id => this.updateSelectedAvatarId(id)}
    />);
    const hidePopoverAnimation = popoverAnimation.find(HidePopoverAnimation);
    expect(hidePopoverAnimation.instance()).toBeInstanceOf(HidePopoverAnimation);
  })
});
