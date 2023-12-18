// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {Accessibility} from 'accessibility';
import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AccessibilityRoundel: React.FC = () => {
    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {
        setIsVisible(false);
    };

    const handleWheelchairClick = () => {
        const accessibility = new Accessibility({
            icon: {
                position: {
                    bottom: {size: 10, units: 'px'},
                    right: {size: 10, units: 'px'},
                    type: 'fixed',
                },
                dimensions: {
                    width: {size: 60, units: 'px'},
                    height: {size: 60, units: 'px'},
                },
                zIndex: '9999',
                backgroundColor: '#0976be',
                color: '#fff',
                img: 'accessible',
                circular: true,
                circularBorder: false,
                fontClass: 'material-icons',
                useEmojis: false,
            },
            textEmlMode: true,
        });
        setIsVisible(false);
        setTimeout(() => {
            accessibility.toggleMenu();
        }, 2000);
    };

    return (
        <React.Fragment>
            {isVisible && (
                <div
                    aria-live='polite'
                    aria-label='Open accessibility options'
                    style={{
                        position: 'fixed',
                        bottom: '10px',
                        right: '14px',
                        backgroundColor: '#4054b2',
                        color: 'white',
                        borderRadius: '50%',
                        width: '60px',
                        height: '60px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
                        zIndex: 4,
                    }}
                >
                    <button
                        style={{
                            position: 'absolute',
                            top: '0',
                            right: '0',
                            backgroundColor: 'transparent',
                            border: 'none',
                            fontSize: '16px',
                            cursor: 'pointer',
                        }}
                        aria-label='Close accessibility options'
                        onClick={handleClose}
                    >
                        <i className='fa fa-times-circle'/>
                    </button>
                    <i
                        className='fa fa-wheelchair'
                        style={{fontSize: '24px', cursor: 'pointer'}}
                        onClick={handleWheelchairClick}
                    />
                </div>
            )}
        </React.Fragment>
    );
};

export default AccessibilityRoundel;
