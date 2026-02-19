export default function decorate(block) {
  block.closest('.metadata-wrapper')?.remove();
}
