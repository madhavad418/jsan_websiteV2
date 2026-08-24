#!/usr/bin/env bash
# Compress all images in public/ in place using ImageMagick.
# - JPG/JPEG: max 1920px wide, quality 82, strip metadata, progressive
# - PNG: strip metadata, max compression
# - Skip files smaller than MIN_BYTES (logos already optimized)
# - Only overwrite when the new file is smaller than the original

set -euo pipefail

MAGICK="/c/Program Files/ImageMagick-7.1.2-Q16-HDRI/magick.exe"
ROOT="public"
MIN_BYTES=$((50 * 1024))   # skip anything under 50KB
MAX_WIDTH=1920
JPEG_QUALITY=82

if [ ! -x "$MAGICK" ]; then
  echo "ERROR: magick.exe not found at $MAGICK" >&2
  exit 1
fi

total_before=0
total_after=0
processed=0
skipped=0

while IFS= read -r -d '' file; do
  size=$(stat -c%s "$file")

  if [ "$size" -lt "$MIN_BYTES" ]; then
    skipped=$((skipped + 1))
    continue
  fi

  ext="${file##*.}"
  ext_lower=$(echo "$ext" | tr '[:upper:]' '[:lower:]')
  tmp="${file}.tmp"

  case "$ext_lower" in
    jpg|jpeg)
      "$MAGICK" "$file" \
        -auto-orient \
        -strip \
        -resize "${MAX_WIDTH}x${MAX_WIDTH}>" \
        -sampling-factor 4:2:0 \
        -interlace JPEG \
        -colorspace sRGB \
        -quality "$JPEG_QUALITY" \
        "$tmp"
      ;;
    png)
      "$MAGICK" "$file" \
        -strip \
        -resize "${MAX_WIDTH}x${MAX_WIDTH}>" \
        -define png:compression-level=9 \
        -define png:compression-filter=5 \
        -define png:compression-strategy=1 \
        "$tmp"
      ;;
    *)
      continue
      ;;
  esac

  if [ ! -f "$tmp" ]; then
    echo "  ! conversion failed: $file" >&2
    continue
  fi

  new_size=$(stat -c%s "$tmp")

  if [ "$new_size" -lt "$size" ] && [ "$new_size" -gt 0 ]; then
    mv -f "$tmp" "$file"
    pct=$(( (size - new_size) * 100 / size ))
    printf "  %4d KB -> %4d KB (-%2d%%)  %s\n" $((size/1024)) $((new_size/1024)) "$pct" "$file"
    total_before=$((total_before + size))
    total_after=$((total_after + new_size))
    processed=$((processed + 1))
  else
    rm -f "$tmp"
    printf "  no improvement, kept original: %s\n" "$file"
    total_before=$((total_before + size))
    total_after=$((total_after + size))
  fi
done < <(find "$ROOT" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) -print0)

echo ""
echo "============================================="
echo "Processed: $processed files"
echo "Skipped (under threshold): $skipped files"
printf "Before: %.2f MB\n" "$(echo "scale=2; $total_before/1024/1024" | bc)"
printf "After:  %.2f MB\n" "$(echo "scale=2; $total_after/1024/1024" | bc)"
if [ "$total_before" -gt 0 ]; then
  pct=$(( (total_before - total_after) * 100 / total_before ))
  echo "Saved: ${pct}%"
fi
