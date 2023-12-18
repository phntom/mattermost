// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import accent from 'sounds/accent.mp3';
import beacon from 'sounds/beacon.mp3';
import bing from 'sounds/bing.mp3';
import calls_calm from 'sounds/calls_calm.mp3';
import calls_cheerful from 'sounds/calls_cheerful.mp3';
import calls_dynamic from 'sounds/calls_dynamic.mp3';
import calls_urgent from 'sounds/calls_urgent.mp3';
import climb from 'sounds/climb.mp3';
import crackle from 'sounds/crackle.mp3';
import doodle from 'sounds/doodle.mp3';
import down from 'sounds/down.mp3';
import echo from 'sounds/echo.mp3';
import emerald from 'sounds/emerald.mp3';
import gravity from 'sounds/gravity.mp3';
import hello from 'sounds/hello.mp3';
import alarm from 'sounds/japanese_eas_alarm.mp3';
import nudge from 'sounds/nudge.mp3';
import phoenix from 'sounds/phoenix.mp3';
import reflection from 'sounds/reflection.mp3';
import ripple from 'sounds/ripple.mp3';
import shimmer from 'sounds/shimmer.mp3';
import swift from 'sounds/swift.mp3';
import tap from 'sounds/tap.mp3';
import tennis from 'sounds/tennis.mp3';
import twelve from 'sounds/twelve.mp3';
import up from 'sounds/up.mp3';
import upstairs from 'sounds/upstairs.mp3';
import verso from 'sounds/verso.mp3';
import volt from 'sounds/volt.mp3';
import * as UserAgent from 'utils/user_agent';

export const notificationSounds = new Map([
    ['Accent', accent],
    ['Alarm', alarm],
    ['Beacon', beacon],
    ['Bing', bing],
    ['Climb', climb],
    ['Crackle', crackle],
    ['Doodle', doodle],
    ['Down', down],
    ['Echo', echo],
    ['Emerald', emerald],
    ['Gravity', gravity],
    ['Hello', hello],
    ['Nudge', nudge],
    ['Phoenix', phoenix],
    ['Reflection', reflection],
    ['Ripple', ripple],
    ['Shimmer', shimmer],
    ['Swift', swift],
    ['Tap', tap],
    ['Tennis', tennis],
    ['Twelve', twelve],
    ['Up', up],
    ['Upstairs', upstairs],
    ['Verso', verso],
    ['Volt', volt],
]);

export const callsNotificationSounds = new Map([
    ['Dynamic', calls_dynamic],
    ['Calm', calls_calm],
    ['Urgent', calls_urgent],
    ['Cheerful', calls_cheerful],
]);

let canDing = true;
export function ding(name: string) {
    if (hasSoundOptions() && canDing) {
        tryNotificationSound(name);
        canDing = false;
        setTimeout(() => {
            canDing = true;
        }, 3000);
    }
}

export function tryNotificationSound(name: string) {
    const audio = new Audio(notificationSounds.get(name) ?? notificationSounds.get('Bing'));
    audio.play();
}

let currentRing: HTMLAudioElement | null = null;
export function ring(name: string) {
    if (!hasSoundOptions()) {
        return;
    }
    stopRing();

    currentRing = loopNotificationRing(name);
    currentRing.addEventListener('pause', () => {
        stopRing();
    });
}

export function stopRing() {
    if (currentRing) {
        currentRing.pause();
        currentRing.src = '';
        currentRing.remove();
        currentRing = null;
    }
}

let currentTryRing: HTMLAudioElement | null = null;
let currentTimer: NodeJS.Timeout;
export function tryNotificationRing(name: string) {
    if (!hasSoundOptions()) {
        return;
    }
    stopTryNotificationRing();
    clearTimeout(currentTimer);

    currentTryRing = loopNotificationRing(name);
    currentTryRing.addEventListener('pause', () => {
        stopTryNotificationRing();
    });

    currentTimer = setTimeout(() => {
        stopTryNotificationRing();
    }, 5000);
}

export function stopTryNotificationRing() {
    if (currentTryRing) {
        currentTryRing.pause();
        currentTryRing.src = '';
        currentTryRing.remove();
        currentTryRing = null;
    }
}

export function loopNotificationRing(name: string) {
    const audio = new Audio(callsNotificationSounds.get(name) ?? callsNotificationSounds.get('Calm'));
    audio.loop = true;
    audio.play();
    return audio;
}

export function hasSoundOptions() {
    return (!UserAgent.isEdge());
}
