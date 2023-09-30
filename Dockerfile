FROM mattermost/mattermost-team-edition:release-9.1

COPY server/mattermost bin/mattermost
RUN rm -rf client
COPY --chown=2000:2000 webapp/channels/dist client/
