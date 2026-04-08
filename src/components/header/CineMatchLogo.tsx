import React from 'react';
import Svg, {
  Circle,
  ClipPath,
  Defs,
  G,
  Path,
  Polygon,
  Rect,
} from 'react-native-svg';

// Faithful SVG recreation of the CinéMatch logo icon.
// viewBox 80×80 — heart centered, left half = film reel, right half = clapperboard.

const HEART =
  'M40 70 C16 54 5 44 5 28 C5 16 13 8 24 8 C31 8 37 12 40 17 C43 12 49 8 56 8 C67 8 75 16 75 28 C75 44 64 54 40 70Z';

interface Props {
  size?: number;
}

export default function CineMatchLogo({ size = 38 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 80 80">
      <Defs>
        {/* Heart clip — everything painted through this */}
        <ClipPath id="hc">
          <Path d={HEART} />
        </ClipPath>
        {/* Left half clip */}
        <ClipPath id="lc">
          <Rect x="0" y="0" width="40" height="80" />
        </ClipPath>
        {/* Right half clip */}
        <ClipPath id="rc">
          <Rect x="40" y="0" width="40" height="80" />
        </ClipPath>
      </Defs>

      {/* ── Left half : deep red + film sprocket holes ── */}
      <G clipPath="url(#hc)">
        <Rect x="0" y="0" width="40" height="80" fill="#8B1A1A" />
        {/* Sprocket holes down the left lobe */}
        <Circle cx="19" cy="19" r="4" fill="#5a0f0f" />
        <Circle cx="13" cy="31" r="3.2" fill="#5a0f0f" />
        <Circle cx="10" cy="43" r="2.8" fill="#5a0f0f" />
      </G>

      {/* ── Right half : clapperboard (dark + white diagonal stripes) ── */}
      <G clipPath="url(#hc)">
        <Rect x="40" y="0" width="40" height="80" fill="#1a1a1a" />
        {/* Diagonal stripes — clapperboard pattern */}
        <Path d="M40 8 L75 16 L75 8Z" fill="#ffffff" />
        <Path d="M40 8 L75 22 L75 16 L40 8Z" fill="#1a1a1a" />
        <Path d="M40 8 L75 28 L75 22 L40 8Z" fill="#ffffff" />
        <Path d="M40 8 L75 34 L75 28 L40 8Z" fill="#1a1a1a" />
        <Path d="M40 8 L75 40 L75 34 L40 8Z" fill="#ffffff" />
        {/* Vertical divider between left and right */}
        <Rect x="39" y="0" width="2" height="80" fill="#ffffff" opacity="0.15" />
      </G>

      {/* ── Play triangle : centered on the heart ── */}
      <Polygon
        points="31,38 31,56 51,47"
        fill="#ffffff"
        opacity="0.95"
      />
    </Svg>
  );
}
