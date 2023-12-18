// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {useIntl} from 'react-intl';

export default function LoginLinkedInIcon(props: React.HTMLAttributes<HTMLSpanElement>) {
    const {formatMessage} = useIntl();

    return (
        <span {...props}>
            <svg
                width='16'
                height='16'
                viewBox='0 0 256 256'
                version='1.1'
                xmlns='http://www.w3.org/2000/svg'
                preserveAspectRatio='xMidYMid'
                aria-label={formatMessage({id: 'generic_icons.login.facebook', defaultMessage: 'Facebook Icon'})}
            >
                <g>
                    <path
                        d='M241.871,256.001 C249.673,256.001 256,249.675 256,241.872 L256,14.129 C256,6.325 249.673,0 241.871,0 L14.129,0 C6.324,0 0,6.325 0,14.129 L0,241.872 C0,249.675 6.324,256.001 14.129,256.001 L241.871,256.001'
                        fill='#395185'
                    />
                    <path
                        d='M176.635,256.001 L176.635,156.864 L209.912,156.864 L214.894,118.229 L176.635,118.229 L176.635,93.561 C176.635,82.375 179.742,74.752 195.783,74.752 L216.242,74.743 L216.242,40.188 C212.702,39.717 200.558,38.665 186.43,38.665 C156.932,38.665 136.738,56.67 136.738,89.736 L136.738,118.229 L103.376,118.229 L103.376,156.864 L136.738,156.864 L136.738,256.001 L176.635,256.001'
                        fill='#FFFFFF'
                    />
                </g>
            </svg>
        </span>
    );
}
