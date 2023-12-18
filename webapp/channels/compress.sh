#!/bin/bash

# Loop over all files in dist directory and its subdirectories
find dist -type f ! -name "*.gz" ! -name "*.br" -exec bash -c 'gzip -k -9 "$0"' {} \;
find dist -type f ! -name "*.gz" ! -name "*.br" -exec bash -c 'brotli -Z -k "$0"' {} \;

echo "Compression complete."
