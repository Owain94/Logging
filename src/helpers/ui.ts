export class Ui {
  public static scroll(
    data: [number, number, ScrollBehavior]
  ) {
    window.scroll({top: data[0], left: data[1], behavior: data[2]});
  }

  public static removeStyleTags(transitionId: string) {
    setTimeout(() => {
      const styles: HTMLElement[] =
        Array.prototype.slice.apply(document.querySelectorAll('style[ng-transition]'));

      styles.filter(el => el.getAttribute('ng-transition') === transitionId)
        .forEach(el => el.parentNode.removeChild(el));
    }, 50);
  }
}
