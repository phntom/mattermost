#!/usr/bin/env bash

set -ex

#nvm install 18.17

pushd webapp/channels
rm -rf dist
npm run build
./compress.sh
find dist/ -type d -print0 | xargs -0 chmod 0755
find dist/ -type f -print0 | xargs -0 chmod 0644
mkdir -p dist/plugins
chmod 755 dist/plugins
popd

go build -C server -ldflags="
-X 'github.com/mattermost/mattermost/server/v8/cmd/mmctl/commands.gitCommit=eb6b9214bdd36613743b93dbe9bcf5e10b0d9041'
-X 'github.com/mattermost/mattermost/server/v8/cmd/mmctl/commands.gitTreeState=clean'
-X 'github.com/mattermost/mattermost/server/v8/cmd/mmctl/commands.buildDate=Sun 25 Feb 2024 13:12:28 IST'
-X 'github.com/mattermost/mattermost/server/public/model.BuildNumber=9.5.0'
-X 'github.com/mattermost/mattermost/server/public/model.BuildDate=Sun 25 Feb 2024 13:12:28 IST'
-X github.com/mattermost/mattermost/server/public/model.BuildHash=eb6b9214bdd36613743b93dbe9bcf5e10b0d9041
-X github.com/mattermost/mattermost/server/public/model.BuildHashEnterprise=none
-X github.com/mattermost/mattermost/server/public/model.BuildEnterpriseReady=false
-X github.com/mattermost/mattermost/server/public/model.MockCWS=false
-X github.com/mattermost/mattermost/server/public/model.MattermostGiphySdkKey=
" -o mattermost github.com/mattermost/mattermost/server/v8/cmd/mattermost


docker pull mattermost/mattermost-team-edition:release-9.5
docker build . -t phntom/mattermost-team-edition:9.5.0
docker push docker.io/phntom/mattermost-team-edition:9.5.0

#9.1.0.master.5cd61beafc0e22c1d049c5db2ab461b4.true
