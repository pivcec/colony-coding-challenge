import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Avatar from './Avatar';
import availableAvatars from '../data/availableAvatars';

export const Header = styled.h1`
  color: rgb(249, 249, 249);
  font-size: 16px;
  margin: 14px 0;
  font-family: 'Source Sans Pro', sans-serif;
  text-align: center;
`;

export const AvatarList = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0;
  margin: 0px;
`;

const AvatarItem = styled.li`
  list-style-type: none;
  height: 66px;
  width: 66px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 4px;
`;

class PopoverContent extends Component {
  getIndividualAvatar = (
    activeAvatarId,
    hoveredAvatarId,
    id,
    selectedAvatarId,
    updateHoveredAvatarId,
    updateSelectedAvatarId,
  ) => (
    <AvatarItem
      key={id}
    >
      <Avatar
        activeAvatarId={activeAvatarId}
        hoveredAvatarId={hoveredAvatarId}
        id={id}
        selectedAvatarId={selectedAvatarId}
        updateHoveredAvatarId={updateHoveredAvatarId}
        updateSelectedAvatarId={updateSelectedAvatarId}
      />
    </AvatarItem>
  );

  render() {
    const {
      activeAvatarId,
      hoveredAvatarId,
      selectedAvatarId,
      updateHoveredAvatarId,
      updateSelectedAvatarId,
    } = this.props;
    return (
      <div className="popover-content">
        <Header>
          Choose your avatar
        </Header>
        <AvatarList>
          {availableAvatars.map(availableAvatar =>
            this.getIndividualAvatar(
              activeAvatarId,
              hoveredAvatarId,
              availableAvatar.id,
              selectedAvatarId,
              updateHoveredAvatarId,
              updateSelectedAvatarId,
            ))
          }
        </AvatarList>
      </div>
    );
  }
}

PopoverContent.defaultProps = {
  activeAvatarId: null,
  hoveredAvatarId: null,
};

PopoverContent.propTypes = {
  activeAvatarId: PropTypes.number,
  hoveredAvatarId: PropTypes.number,
  selectedAvatarId: PropTypes.number.isRequired,
  updateHoveredAvatarId: PropTypes.func.isRequired,
  updateSelectedAvatarId: PropTypes.func.isRequired,
};

export default PopoverContent;
