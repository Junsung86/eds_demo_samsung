/* eslint-disable */
/* global WebImporter */

/**
 * Parser for embed block (social media - Instagram reels)
 *
 * Source: https://news.samsung.com/sg/coming-soon-a-unified-galaxy-camera-experience-built-for-confident-creation
 * Base Block: embed
 *
 * Block Structure (from block library example):
 * - Row 1: Block name header ("Embed")
 * - Row 2: URL to embedded content (single cell with link)
 *
 * Source HTML Pattern (EXTRACTED from captured DOM):
 * <div align="center">
 *   <iframe class="instagram-media instagram-media-rendered"
 *     src="https://www.instagram.com/reel/{id}/embed/captioned/..."
 *     ...></iframe>
 *   <p></p>
 * </div>
 *
 * Generated: 2026-02-19
 */
export default function parse(element, { document }) {
  // Extract Instagram URL from iframe src
  // VALIDATED: Captured DOM shows iframe.instagram-media with src containing /reel/{id}/embed/captioned/
  const iframe = element.querySelector('iframe.instagram-media') ||
                 element.querySelector('iframe[src*="instagram.com"]');

  if (!iframe) return;

  const src = iframe.getAttribute('src') || '';

  // Extract the clean Instagram reel URL from the embed URL
  // Source format: https://www.instagram.com/reel/DU2BNR4FQTC/embed/captioned/?...
  // Target format: https://www.instagram.com/reel/DU2BNR4FQTC/
  let instagramUrl = src;
  const reelMatch = src.match(/(https:\/\/www\.instagram\.com\/reel\/[^/]+\/)/);
  if (reelMatch) {
    instagramUrl = reelMatch[1];
  } else {
    // Fallback: try to get clean URL from any Instagram embed pattern
    const igMatch = src.match(/(https:\/\/www\.instagram\.com\/[^?#]+)/);
    if (igMatch) {
      instagramUrl = igMatch[1].replace(/\/embed\/captioned\/?$/, '/').replace(/\/embed\/?$/, '/');
    }
  }

  // Create link element for the embed URL
  const link = document.createElement('a');
  link.href = instagramUrl;
  link.textContent = instagramUrl;

  // Build cells array matching Embed block structure
  // Row 1 (content): Single cell with the Instagram URL link
  const cells = [
    [link],
  ];

  // Create block using WebImporter utility
  const block = WebImporter.Blocks.createBlock(document, { name: 'Embed', cells });

  // Replace original element with structured block table
  element.replaceWith(block);
}
