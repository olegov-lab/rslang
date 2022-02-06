export class Component {
  public element: HTMLElement;

  constructor(
    parentNode: HTMLElement,
    tagName = 'div',
    className: string[] = [],
    content = '',
  ) {
    this.element = document.createElement(tagName);
    this.element.classList.add(...className);
    this.element.textContent = content;

    if (parentNode) {
      parentNode.append(this.element);
    }
  }

  destroy(): void {
    this.element.remove();
  }
}
