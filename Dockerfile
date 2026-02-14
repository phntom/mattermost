FROM mattermost/mattermost-team-edition:release-11.3

COPY server/mattermost bin/mattermost
COPY --chown=2000:2000 webapp/channels/dist client/
