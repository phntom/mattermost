// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const CookieConsent: React.FC = () => {
    const [isShown, setIsShown] = useState(false);

    useEffect(() => {
        // Check for existing cookie on component mount
        const existingCookie = document.cookie.split('; ').find((row) => row.startsWith('CookieConsent='));
        if (!existingCookie) {
            setIsShown(true);
        }
    }, []);

    const setCookie = (value: string) => {
        // Create a new cookie with path, domain, and SameSite attributes
        document.cookie = `CookieConsent=${value}; domain=${document.domain}; path=/; SameSite=Strict`;
        setIsShown(false);
    };

    const handleAcceptAll = () => {
        setCookie('all');
    };

    const handleAcceptNecessary = () => {
        setCookie('strict');
    };

    return (
        <React.Fragment>
            {isShown && (
                <div
                    style={{
                        position: 'fixed',
                        bottom: '20px',
                        right: '20px',
                        width: '700px',
                        backgroundColor: '#fff',
                        padding: '15px',
                        borderRadius: '5px',
                        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
                        zIndex: '3',
                    }}
                    className='cookie-consent-popup'
                >
                    <h4>Cookie settings</h4>
                    <p>
                        We use cookies to personalize content and analyze traffic to our
                        website. You can choose to accept only cookies that are necessary for
                        the website to function or to also allow tracking cookies. For more
                        information, please see our privacy policy.
                    </p>
                    <button
                        className='btn btn-default'
                        style={{marginRight: '10px'}}
                        onClick={handleAcceptNecessary}
                    >
                        Accept technically necessary cookies
                    </button>
                    <button
                        className='btn btn-primary'
                        onClick={handleAcceptAll}
                    >
                        Accept all cookies
                    </button>
                </div>
            )}
        </React.Fragment>
    );
};

export default CookieConsent;
