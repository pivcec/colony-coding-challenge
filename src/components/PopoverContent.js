import React, { Component } from 'react';
import styled from 'styled-components';
import Avatar from './Avatar';
import availableAvatars from '../data/availableAvatars';

const AvatarList = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0;
`;

const AvatarItem = styled.li`
  list-style-type: none;
  height: 70px;
  width: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

class PopoverContent extends Component {
  getIndividualAvatar = id => (
    <AvatarItem
      key={id}
    >
      <Avatar
        id={id}
      />
    </AvatarItem>
  );

  render() {
    return (
      <AvatarList>
        {availableAvatars.map((availableAvatar) => this.getIndividualAvatar(availableAvatar.id))}
      </AvatarList>
    );
  }
}

export default PopoverContent;
