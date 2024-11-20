#!/bin/bash

# Ensure the script exits on error
set -e

# Increment the patch version in package.json
echo "Incrementing patch version in package.json..."

# Extract the current version
CURRENT_VERSION=$(jq -r '.version' package.json)

# Split the version into parts (major, minor, patch)
IFS='.' read -r MAJOR MINOR PATCH <<< "$CURRENT_VERSION"

# Increment the patch version
NEW_PATCH=$((PATCH + 1))
NEW_VERSION="$MAJOR.$MINOR.$NEW_PATCH"

# Update the package.json with the new version
jq ".version = \"$NEW_VERSION\"" package.json > package.json.tmp && mv package.json.tmp package.json

echo "Updated version to $NEW_VERSION."

# Run the Rollup build
echo "Running Rollup build..."
npx rollup -c

echo "Build completed successfully."
