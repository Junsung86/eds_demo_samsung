/* eslint-disable */
/* global WebImporter */

/**
 * Transformer for Samsung Newsroom Singapore page cleanup
 * Purpose: Remove non-content elements (share buttons, cookie banners, navigation, footer)
 * Applies to: news.samsung.com/sg (all article templates)
 * Tested: /sg/coming-soon-a-unified-galaxy-camera-experience-built-for-confident-creation
 * Generated: 2026-02-19
 *
 * SELECTORS EXTRACTED FROM:
 * - Captured DOM during migration workflow (Playwright snapshot + HTML extraction)
 * - Source page HTML at news.samsung.com/sg
 */

const TransformHook = {
  beforeTransform: 'beforeTransform',
  afterTransform: 'afterTransform',
};

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Remove cookie consent banner
    // EXTRACTED: Found <div> with "cookies" text and "Accept" button in captured DOM snapshot
    const cookieBanner = element.querySelector('.cookie_wrap');
    if (cookieBanner) cookieBanner.remove();

    // Remove share/social buttons section
    // EXTRACTED: Found .sns_box and .share_wrap in captured HTML with share links (Twitter, Facebook, LinkedIn, etc.)
    WebImporter.DOMUtils.remove(element, [
      '.sns_box',
      '.share_wrap',
      '.btn_share_open',
      '.btn_share',
      '.btn_print',
    ]);

    // Remove top area metadata (date, share buttons wrapper)
    // EXTRACTED: Found .top_area.clearfix in captured HTML containing .meta (date) and .etc (share)
    WebImporter.DOMUtils.remove(element, [
      '.top_area',
    ]);

    // Remove tags and category sections at bottom of article
    // EXTRACTED: Found .hash (tags) and .category_list in captured HTML
    WebImporter.DOMUtils.remove(element, [
      '.hash',
      '.category_list',
    ]);

    // Remove contact info footer box
    // EXTRACTED: Found .more_box_notice with "customer service" and media inquiry text
    WebImporter.DOMUtils.remove(element, [
      '.more_box_notice',
    ]);

    // Remove "Learn More" banner at bottom
    // EXTRACTED: Found .btn_single with "Check out the latest stories" text
    WebImporter.DOMUtils.remove(element, [
      '.btn_single',
    ]);
  }

  if (hookName === TransformHook.afterTransform) {
    // Remove any remaining iframes that weren't handled by parsers
    // Standard HTML elements - safe to remove after parsing
    WebImporter.DOMUtils.remove(element, [
      'noscript',
      'link',
    ]);
  }
}
