#!/usr/bin/env bash

set -ex

#nvm install 20.11

pushd webapp/channels
rm -rf dist
npm run build
./compress.sh
find dist/ -type d -print0 | xargs -0 chmod 0755
find dist/ -type f -print0 | xargs -0 chmod 0644
mkdir -p dist/plugins
chmod 755 dist/plugins
popd

mkdir -p prepackaged_plugins
curl -L -o prepackaged_plugins/ee.l6.collab-doc-0.1.0.tar.gz https://github.com/phntom/mm-hedgedoc-plugin/raw/main/dist/ee.l6.collab-doc-0.1.0.tar.gz

export BUILD_DATE="Sun Feb 15 17:58:23 IST 2026"
export VERSION_FULL="11.3.1"
export BETA="-beta2"
export BUILD_HASH="9376067f0ca75f80863edfd6962ed3d91bc314df"

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


docker pull mattermost/mattermost-team-edition:release-11.3
docker build . --pull -t phntom/mattermost-team-edition:$VERSION_FULL$BETA
docker push docker.io/phntom/mattermost-team-edition:$VERSION_FULL$BETA

#9.1.0.master.5cd61beafc0e22c1d049c5db2ab461b4.true
