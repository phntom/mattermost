#!/usr/bin/env bash

set -ex

pushd webapp/channels
#nvm install 16.10
rm -rf dist
npm run build
./compress.sh
find dist/ -type d -print0 | xargs -0 chmod 0755
find dist/ -type f -print0 | xargs -0 chmod 0644
mkdir -p dist/plugins
chmod 755 dist/plugins
popd

go build -C server -ldflags="
-X 'github.com/mattermost/mattermost/server/v8/cmd/mmctl/commands.gitCommit=e43096b98b71047bd295e9c7e71e67777b470e12'
-X 'github.com/mattermost/mattermost/server/v8/cmd/mmctl/commands.gitTreeState=clean'
-X 'github.com/mattermost/mattermost/server/v8/cmd/mmctl/commands.buildDate=Sat 30 Sep 2023 23:41:54 IDT'
-X 'github.com/mattermost/mattermost/server/public/model.BuildNumber=9.0.1'
-X 'github.com/mattermost/mattermost/server/public/model.BuildDate=Mon 02 Oct 2023 13:15:57 IDT'
-X github.com/mattermost/mattermost/server/public/model.BuildHash=master
-X github.com/mattermost/mattermost/server/public/model.BuildHashEnterprise=none
-X github.com/mattermost/mattermost/server/public/model.BuildEnterpriseReady=false
-X github.com/mattermost/mattermost/server/public/model.MockCWS=false
-X github.com/mattermost/mattermost/server/public/model.MattermostGiphySdkKey=
" -o mattermost github.com/mattermost/mattermost/server/v8/cmd/mattermost


docker build . -t phntom/mattermost-team-edition:9.0.1-1
docker push docker.io/phntom/mattermost-team-edition:9.0.1-1

#9.1.0.master.5cd61beafc0e22c1d049c5db2ab461b4.true
