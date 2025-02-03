// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import Constants from 'utils/constants';

import type {UserProfile} from '@mattermost/types/users';

type Props = {
    position: UserProfile['position'];
}

const ProfilePopoverPosition = ({
    position,
}: Props) => {
    const positionSubstringed = (position).substring(0, Constants.MAX_POSITION_LENGTH);

    return (
        <p
            className='user-profile-popover__non-heading'
            title={position}
        >
            {positionSubstringed}
        </p>
    );
};

export default ProfilePopoverPosition;
