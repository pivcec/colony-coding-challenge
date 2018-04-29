import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SelectedAvatar, { AvatarImage, OuterWrapper } from '../components/SelectedAvatar';
import { ShowPopoverAnimation, HidePopoverAnimation } from '../components/PopoverAnimation';
import { AvatarImageWrapper } from '../components/Avatar';

Enzyme.configure({ adapter: new Adapter() });

describe('Renders...', () => {
  it('Renders ShowPopoverAnimation when SelectedAvatar is clicked once', () => {
    const selectedAvatar = mount(<SelectedAvatar />);
    selectedAvatar.find(AvatarImage).simulate('click');
    const showPopoverAnimation = selectedAvatar.find(ShowPopoverAnimation);
    expect(showPopoverAnimation.instance()).toBeInstanceOf(ShowPopoverAnimation);
  });

  it('Renders HidePopoverAnimation when SelectedAvatar is clicked twice', () => {
    const selectedAvatar = mount(<SelectedAvatar />);
    selectedAvatar.find(AvatarImage).simulate('click');
    selectedAvatar.find(AvatarImage).simulate('click');
    const hidePopoverAnimation = selectedAvatar.find(HidePopoverAnimation);
    expect(hidePopoverAnimation.instance()).toBeInstanceOf(HidePopoverAnimation);
  });

  it('Renders HidePopoverAnimation when SelectedAvatar is clicked once, and then OuterWrapper is clicked', () => {
    const selectedAvatar = mount(<SelectedAvatar />);
    selectedAvatar.find(AvatarImage).simulate('click');
    selectedAvatar.find(OuterWrapper).simulate('click');
    const hidePopoverAnimation = selectedAvatar.find(HidePopoverAnimation);
    expect(hidePopoverAnimation.instance()).toBeInstanceOf(HidePopoverAnimation);
  });

  it('Renders correct style when AvatarImage is clicked', () => {
    const selectedAvatar = mount(<SelectedAvatar />);
    selectedAvatar.find(AvatarImage).simulate('click');
    const avatarImageStyle = selectedAvatar.find(AvatarImage).prop('style');
    expect(avatarImageStyle).toHaveProperty('border', '1px solid rgb(155, 160, 163)');
  });

  it('Renders correct style when AvatarImage is hovered', () => {
    const selectedAvatar = mount(<SelectedAvatar />);
    selectedAvatar.find(AvatarImage).simulate('mouseEnter');
    const avatarImageStyle = selectedAvatar.find(AvatarImage).prop('style');
    expect(avatarImageStyle).toHaveProperty('border', '1px solid rgb(155, 160, 163)');
  });

  it('Renders correct style when AvatarImage hover is exited', () => {
    const selectedAvatar = mount(<SelectedAvatar />);
    selectedAvatar.find(AvatarImage).simulate('mouseEnter');
    selectedAvatar.find(AvatarImage).simulate('mouseLeave');
    const avatarImageStyle = selectedAvatar.find(AvatarImage).prop('style');
    expect(avatarImageStyle).toHaveProperty('border', '1px solid rgb(255, 255, 255)');
  });

  it('Renders correct SelectedAvatar after new avatar is selected', done => {
      const selectedAvatar = mount(<SelectedAvatar />);
      selectedAvatar.find(AvatarImage).simulate('click');
      const avatarImageWrapper = selectedAvatar.find(AvatarImageWrapper).at(3);
      avatarImageWrapper.simulate('click');
      const mockTimer = done => {
        setTimeout(
          function() {
            selectedAvatar.update();
            const selectedAvatarAlt = selectedAvatar.find(AvatarImage).prop('alt');
            expect(selectedAvatarAlt).toEqual('Avatar 4');
            done();
          }, 1500);
      };
      mockTimer(done);
    });
});
