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
-X 'github.com/mattermost/mattermost/server/v8/cmd/mmctl/commands.gitCommit=70aa85fe60f7d626a6a4b72b791cc0829192a0a9'
-X 'github.com/mattermost/mattermost/server/v8/cmd/mmctl/commands.gitTreeState=clean'
-X 'github.com/mattermost/mattermost/server/v8/cmd/mmctl/commands.buildDate=Sun 22 Oct 2023 11:54:31 IDT'
-X 'github.com/mattermost/mattermost/server/public/model.BuildNumber=9.0.3'
-X 'github.com/mattermost/mattermost/server/public/model.BuildDate=Sun 22 Oct 2023 11:54:31 IDT'
-X github.com/mattermost/mattermost/server/public/model.BuildHash=master
-X github.com/mattermost/mattermost/server/public/model.BuildHashEnterprise=none
-X github.com/mattermost/mattermost/server/public/model.BuildEnterpriseReady=false
-X github.com/mattermost/mattermost/server/public/model.MockCWS=false
-X github.com/mattermost/mattermost/server/public/model.MattermostGiphySdkKey=
" -o mattermost github.com/mattermost/mattermost/server/v8/cmd/mattermost


docker build . -t phntom/mattermost-team-edition:9.0.3
docker push docker.io/phntom/mattermost-team-edition:9.0.3
docker tag docker.io/phntom/mattermost-team-edition:9.0.3 docker.io/phntom/mattermost-team-edition:9.0.3-beta1
docker push docker.io/phntom/mattermost-team-edition:9.0.3-beta1

#9.1.0.master.5cd61beafc0e22c1d049c5db2ab461b4.true
