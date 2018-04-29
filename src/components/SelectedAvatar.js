import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import styled from 'styled-components';
import PopoverAnimation from './PopoverAnimation';
import avatar1 from '../images/avatar1.png';
import avatar2 from '../images/avatar2.png';
import avatar3 from '../images/avatar3.png';
import avatar4 from '../images/avatar4.png';
import avatar5 from '../images/avatar5.png';
import avatar6 from '../images/avatar6.png';
import availableAvatars from '../data/availableAvatars';

const avatarImages = {
  1: avatar1,
  2: avatar2,
  3: avatar3,
  4: avatar4,
  5: avatar5,
  6: avatar6,
};

export const OuterWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const AvatarWrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  margin-top: 10px;
`;

const PopoverWrapper = styled.div`
  width: 316px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  margin-top: 85px;
`;

const Image = props => <img {...props} src={props.src} alt={props.alt} />;

export const AvatarImage = styled(Image)`
  border-radius: 50%;
  height: 60px;
`;

class SelectedAvatar extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      activeAvatarId: null,
      hidePopoverAnimation: false,
      hoveredAvatarId: null,
      isActive: false,
      isHovered: false,
      selectedAvatarId: 1,
      showPopoverAnimation: false,
    };
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    this.debouncedUpdateSelectedAvatarId = debounce((id) => {
      this.setState({
        activeAvatarId: null,
        hidePopoverAnimation: true,
        hoveredAvatarId: null,
        isActive: false,
        isHovered: false,
        selectedAvatarId: id,
        showPopoverAnimation: false,
      });
    }, 1000);
  }

  getAvatarStyle = (isActive, isHovered) => {
    const avatarHoveredOrActiveStyle = { border: '1px solid rgb(155, 160, 163)' };
    const avatarNotHoveredOrActiveStyle = { border: '1px solid rgb(255, 255, 255)' };
    if (isHovered || isActive) {
      return avatarHoveredOrActiveStyle;
    }
    return avatarNotHoveredOrActiveStyle;
  };

  getAlt = (id) => {
    const avatar = availableAvatars.find(availableAvatar => availableAvatar.id === id);
    return avatar ? avatar.label : undefined;
  }

  handleMouseLeave = () => {
    this.setState({
      isHovered: false,
    });
  };

  handleMouseEnter = () => {
    this.setState({
      isHovered: true,
    });
  };

  handleOuterWrapperClick = (isActive) => {
    if (isActive) {
      this.setState({
        hidePopoverAnimation: true,
        hoveredAvatarId: null,
        isActive: false,
        showPopoverAnimation: false,
      });
    }
  };

  handleInnerWrapperClick = (e) => {
    e.stopPropagation();
  }

  handleAvatarImageClick = (isActive) => {
    if (isActive) {
      this.setState({
        hidePopoverAnimation: true,
        hoveredAvatarId: null,
        isActive: false,
        showPopoverAnimation: false,
      });
    } else {
      this.setState({
        hidePopoverAnimation: false,
        isActive: true,
        showPopoverAnimation: true,
      });
    }
  };

  updateSelectedAvatarId = (id, selectedAvatarId) => {
    if (id !== selectedAvatarId) {
      this.setState({
        activeAvatarId: id,
      });
      this.debouncedUpdateSelectedAvatarId(id);
    }
  };

  updateHoveredAvatarId = (id) => {
    this.setState({
      hoveredAvatarId: id,
    });
  };

  handleKeyDown = (e) => {
    const {
      hoveredAvatarId,
      isActive,
      isHovered,
      selectedAvatarId,
    } = this.state;
    const totalNumberOfAvatars = ('length', Object.keys(avatarImages).length);
    if (e.code === 'Space' && isHovered === false) {
      this.setState({
        isHovered: true,
      });
    }
    if (e.code === 'Space' && isHovered === true) {
      this.setState({
        isHovered: false,
      });
    }
    if (e.code === 'Enter' && isHovered === true) {
      this.setState({
        isActive: true,
        showPopoverAnimation: true,
        hidePopoverAnimation: false,
      });
    }
    if (e.code === 'Space' && isActive === true) {
      let newHoveredAvatarId = hoveredAvatarId + 1;
      if (selectedAvatarId === newHoveredAvatarId) {
        newHoveredAvatarId = newHoveredAvatarId + 1;
      }
      if (newHoveredAvatarId > totalNumberOfAvatars) {
        newHoveredAvatarId = 1;
      }
      this.setState({
        hoveredAvatarId: newHoveredAvatarId,
      });
    }
    if (e.code === 'Enter' && isActive === true) {
      this.setState({
        activeAvatarId: hoveredAvatarId,
      });
      if (hoveredAvatarId !== null) {
        this.updateSelectedAvatarId(hoveredAvatarId);
      }
    }
    if (e.code === 'Escape' && isActive === true) {
      this.setState({
        isActive: false,
        showPopoverAnimation: false,
        hidePopoverAnimation: true,
      });
    }
  }

  render() {
    const {
      activeAvatarId,
      hoveredAvatarId,
      selectedAvatarId,
      isHovered,
      isActive,
      showPopoverAnimation,
      hidePopoverAnimation,
    } = this.state;
    return (
      <OuterWrapper
        onClick={() => this.handleOuterWrapperClick(isActive)}
      >
        <div
          className="inner-wrapper"
          onClick={e => this.handleInnerWrapperClick(e)}
        >
          <AvatarWrapper>
            <AvatarImage
              alt={this.getAlt(selectedAvatarId)}
              onClick={() => this.handleAvatarImageClick(isActive)}
              onMouseEnter={this.handleMouseEnter}
              onMouseLeave={this.handleMouseLeave}
              src={avatarImages[selectedAvatarId]}
              style={this.getAvatarStyle(isActive, isHovered)}
            />
          </AvatarWrapper>
          <PopoverWrapper>
            <PopoverAnimation
              activeAvatarId={activeAvatarId}
              hide={hidePopoverAnimation}
              hoveredAvatarId={hoveredAvatarId}
              selectedAvatarId={selectedAvatarId}
              show={showPopoverAnimation}
              updateHoveredAvatarId={this.updateHoveredAvatarId}
              updateSelectedAvatarId={this.updateSelectedAvatarId}
            />
          </PopoverWrapper>
        </div>
      </OuterWrapper>
    );
  }
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default SelectedAvatar;
