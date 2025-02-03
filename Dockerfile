FROM mattermost/mattermost-team-edition:release-10.4

COPY server/mattermost bin/mattermost
RUN rm -rf client
COPY --chown=2000:2000 webapp/channels/dist client/
