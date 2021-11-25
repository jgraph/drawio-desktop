#!/bin/bash

set -eo pipefail

# Config
SOURCE_FILE_PATH='./1024x1024.png' # has to be of size 1024x1024 px
OUT_ICON_NAME='icon'


# The "design" and magic numbers below are derived from Apple's macOS app icon
# guidelines and design templates:
# https://developer.apple.com/design/human-interface-guidelines/macos/icons-and-images/app-icon/
# https://developer.apple.com/design/resources/#macos-apps
#
# Specifically, for an icon of 1024x:
# - outer bounding box: 1024x1024 px
# - border radius: ~22,85% (= 234 px)
# - icon grid size: 824x824 px
# - icon grid shadow size: x: 0px, y: 10px, blur: 10px, 30% black


# Make sure ImageMagick's convert and iconutil are available.
if ! hash convert 2>/dev/null || ! hash iconutil 2>/dev/null; then
    echo "ERROR: This script requires ImageMagick and iconutil."
    exit 1
fi


# Prepare an iconset folder
mkdir "./${OUT_ICON_NAME}.iconset"


# Add rounded corners to the 1024px image.
#
# This works by:
# 1. Generating a black square (1024 px) with rounded corners (radius 234 px)
#    on transparent background, via `-size [...] xc:none -draw [...]`
# 2. Applying the square as a mask to the the source image, via `-matte [...]`
convert "${SOURCE_FILE_PATH}" \
    -matte \( \
        -size 1024x1024 xc:none -draw "roundrectangle 0,0,1024,1024,234,234" \
    \) \
    -compose DstIn -composite \
    "./${OUT_ICON_NAME}.iconset/temp_1024_rounded.png"


# Apply sizing and add shadow to the 1024px image.
#
# This works by:
# 1. Resizing to 'icon grid size' (824px), via `-resize`
# 2. Adding padding (100px) to get 'outer bounding box' size,
#    via `-bordercolor none -border [...]`
# 3. Adding shadow, via `+clone -background black -shadow [...]`
convert "./${OUT_ICON_NAME}.iconset/temp_1024_rounded.png" \
    -resize 824x824 \
    -bordercolor none -border 100x100 \
    \( +clone -background black -shadow 30x10+0+10 -background none \) \
    -compose DstOver -flatten \
    "./${OUT_ICON_NAME}.iconset/icon_512x512@2x.png"

# Remove temporary file
rm "./${OUT_ICON_NAME}.iconset/temp_1024_rounded.png"

# Generate all sizes.
# 16/32/128/256/512, each single & double resolution
cd "./${OUT_ICON_NAME}.iconset/"
convert './icon_512x512@2x.png' \
    \( +clone -resize  x16 -write './icon_16x16.png'      +delete \) \
    \( +clone -resize  x32 -write './icon_16x16@2x.png'   +delete \) \
    \( +clone -resize  x32 -write './icon_32x32.png'      +delete \) \
    \( +clone -resize  x64 -write './icon_32x32@2x.png'   +delete \) \
    \( +clone -resize x128 -write './icon_128x128.png'    +delete \) \
    \( +clone -resize x256 -write './icon_128x128@2x.png' +delete \) \
    \( +clone -resize x256 -write './icon_256x256.png'    +delete \) \
    \( +clone -resize x512 -write './icon_256x256@2x.png' +delete \) \
              -resize x512        './icon_512x512.png'
cd '..'

# Convert to .icns format and remove iconset
iconutil -c icns "./${OUT_ICON_NAME}.iconset"
rm -r "./${OUT_ICON_NAME}.iconset"
