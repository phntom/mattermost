#!/usr/bin/env bash

set -ex

#nvm install 20.11

#pushd webapp/channels
#rm -rf dist
#npm run build
#./compress.sh
#find dist/ -type d -print0 | xargs -0 chmod 0755
#find dist/ -type f -print0 | xargs -0 chmod 0644
#mkdir -p dist/plugins
#chmod 755 dist/plugins
#popd

export BUILD_DATE="Sat 08 Feb 2025 12:23:39 IST"
export VERSION_FULL="10.4.1"
export BETA=""
export BUILD_HASH="ec341ab0ed04971d239288c3d80ab2c8c5c60b65"

go build -C server -tags=enterprise -ldflags="
-X 'github.com/mattermost/mattermost/server/v8/cmd/mmctl/commands.gitCommit=$BUILD_HASH'
-X 'github.com/mattermost/mattermost/server/v8/cmd/mmctl/commands.gitTreeState=clean'
-X 'github.com/mattermost/mattermost/server/v8/cmd/mmctl/commands.buildDate=$BUILD_DATE'
-X 'github.com/mattermost/mattermost/server/public/model.BuildNumber=$VERSION_FULL'
-X 'github.com/mattermost/mattermost/server/public/model.BuildDate=$BUILD_DATE'
-X github.com/mattermost/mattermost/server/public/model.BuildHash=$BUILD_HASH
-X github.com/mattermost/mattermost/server/public/model.BuildHashEnterprise=$BUILD_HASH
-X github.com/mattermost/mattermost/server/public/model.BuildEnterpriseReady=true
-X github.com/mattermost/mattermost/server/public/model.MockCWS=false
-X github.com/mattermost/mattermost/server/public/model.MattermostGiphySdkKey=
" -o mattermost github.com/mattermost/mattermost/server/v8/cmd/mattermost


docker pull mattermost/mattermost-team-edition:release-10.4
docker build . -t phntom/mattermost-team-edition:$VERSION_FULL$BETA
docker push docker.io/phntom/mattermost-team-edition:$VERSION_FULL$BETA

#9.1.0.master.5cd61beafc0e22c1d049c5db2ab461b4.true
