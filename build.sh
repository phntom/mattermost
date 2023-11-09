#!/usr/bin/env bash

set -ex

pushd webapp/channels
#nvm install 18.17
rm -rf dist
npm run build
./compress.sh
find dist/ -type d -print0 | xargs -0 chmod 0755
find dist/ -type f -print0 | xargs -0 chmod 0644
mkdir -p dist/plugins
chmod 755 dist/plugins
popd

go build -C server -ldflags="
-X 'github.com/mattermost/mattermost/server/v8/cmd/mmctl/commands.gitCommit=f859999849aa083e16903cba421546e541889f7e'
-X 'github.com/mattermost/mattermost/server/v8/cmd/mmctl/commands.gitTreeState=clean'
-X 'github.com/mattermost/mattermost/server/v8/cmd/mmctl/commands.buildDate=Thu 09 Nov 2023 12:30:19 IST'
-X 'github.com/mattermost/mattermost/server/public/model.BuildNumber=9.1.0'
-X 'github.com/mattermost/mattermost/server/public/model.BuildDate=Thu 09 Nov 2023 12:30:19 IST'
-X github.com/mattermost/mattermost/server/public/model.BuildHash=master
-X github.com/mattermost/mattermost/server/public/model.BuildHashEnterprise=none
-X github.com/mattermost/mattermost/server/public/model.BuildEnterpriseReady=false
-X github.com/mattermost/mattermost/server/public/model.MockCWS=false
-X github.com/mattermost/mattermost/server/public/model.MattermostGiphySdkKey=
" -o mattermost github.com/mattermost/mattermost/server/v8/cmd/mattermost


docker pull mattermost/mattermost-team-edition:release-9.1
docker build . -t phntom/mattermost-team-edition:9.1.0
docker push docker.io/phntom/mattermost-team-edition:9.1.0

#9.1.0.master.5cd61beafc0e22c1d049c5db2ab461b4.true
