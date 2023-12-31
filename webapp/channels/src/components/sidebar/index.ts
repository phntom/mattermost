// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators, Dispatch, ActionCreatorsMapObject} from 'redux';

import {fetchMyCategories} from 'mattermost-redux/actions/channel_categories';
import Permissions from 'mattermost-redux/constants/permissions';
import {isCustomGroupsEnabled} from 'mattermost-redux/selectors/entities/preferences';
import {haveICurrentChannelPermission, haveISystemPermission} from 'mattermost-redux/selectors/entities/roles';
import {getCurrentTeam} from 'mattermost-redux/selectors/entities/teams';
import {GenericAction} from 'mattermost-redux/types/actions';
import {clearChannelSelection} from 'actions/views/channel_sidebar';
import {isUnreadFilterEnabled} from 'selectors/views/channel_sidebar';
import {closeModal, openModal} from 'actions/views/modals';
import {closeRightHandSide} from 'actions/views/rhs';
import {ModalData} from 'types/actions';
import {GlobalState} from 'types/store';
import {getIsLhsOpen} from 'selectors/lhs';
import {getIsRhsOpen, getRhsState} from 'selectors/rhs';
import {getIsMobileView} from 'selectors/views/browser';
import {isModalOpen} from 'selectors/views/modals';
import {ModalIdentifiers} from 'utils/constants';

import Sidebar from './sidebar';

function mapStateToProps(state: GlobalState) {
    const currentTeam = getCurrentTeam(state);
    const unreadFilterEnabled = isUnreadFilterEnabled(state);
    const userGroupsEnabled = isCustomGroupsEnabled(state);

    let canCreatePublicChannel = false;
    let canCreatePrivateChannel = false;
    let canJoinPublicChannel = false;

    if (currentTeam) {
        canCreatePublicChannel = haveICurrentChannelPermission(state, Permissions.CREATE_PUBLIC_CHANNEL);
        canCreatePrivateChannel = haveICurrentChannelPermission(state, Permissions.CREATE_PRIVATE_CHANNEL);
        canJoinPublicChannel = haveICurrentChannelPermission(state, Permissions.JOIN_PUBLIC_CHANNELS);
    }

    const canCreateCustomGroups = haveISystemPermission(state, {permission: Permissions.CREATE_CUSTOM_GROUP}) && isCustomGroupsEnabled(state);

    return {
        teamId: currentTeam ? currentTeam.id : '',
        canCreatePrivateChannel,
        canCreatePublicChannel,
        canJoinPublicChannel,
        isOpen: getIsLhsOpen(state),
        unreadFilterEnabled,
        isMobileView: getIsMobileView(state),
        isKeyBoardShortcutModalOpen: isModalOpen(state, ModalIdentifiers.KEYBOARD_SHORTCUTS_MODAL),
        userGroupsEnabled,
        canCreateCustomGroups,
        rhsState: getRhsState(state),
        rhsOpen: getIsRhsOpen(state),
    };
}

type Actions = {
    fetchMyCategories: (teamId: string) => {data: boolean};
    openModal: <P>(modalData: ModalData<P>) => void;
    clearChannelSelection: () => void;
    closeModal: (modalId: string) => void;
    closeRightHandSide: () => void;
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject, Actions>({
            clearChannelSelection,
            fetchMyCategories,
            openModal,
            closeModal,
            closeRightHandSide,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
