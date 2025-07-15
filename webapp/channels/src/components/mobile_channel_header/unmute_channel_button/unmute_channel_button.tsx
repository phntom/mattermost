// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {NotificationLevels} from 'utils/constants';

import type {ChannelNotifyProps} from '@mattermost/types/channels';

type Actions = {
    updateChannelNotifyProps: (userId: string, channelId: string, props: Pick<ChannelNotifyProps, 'mark_unread'>) => void;
};

type Props = {
    user: { id: string };
    channel: { id: string };
    actions: Actions;
};

const UnmuteChannelButton = ({user, channel, actions}: Props) => {
    const handleClick = () => {
        actions.updateChannelNotifyProps(user.id, channel.id, {mark_unread: NotificationLevels.ALL});
    };

    return (
        <button
            type='button'
            className='navbar-toggle icon icon__mute'
            onClick={handleClick}
        >
            <span className='fa fa-bell-slash-o icon'/>
        </button>
    );
};

export default React.memo(UnmuteChannelButton);
