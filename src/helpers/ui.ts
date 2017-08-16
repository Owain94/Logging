export class Ui {
  public static scroll(
    data: [number, number, ScrollBehavior]
  ): void {
    window.scroll({top: data[0], left: data[1], behavior: data[2]});
  }

  public static onScroll(): Promise<boolean> {
    const doc = document.documentElement;
    const top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);

    return Promise.resolve(top > 0)
  }

  public static disableScroll(data: boolean): void {
    if (data) {
      document.body.classList.add('stop-scrolling');
    } else {
      document.body.classList.remove('stop-scrolling');
    }
  }

  public static removeStyleTags(transitionId: string): void {
    setTimeout(() => {
      const styles: HTMLElement[] =
        Array.prototype.slice.apply(document.querySelectorAll('style[ng-transition]'));

      styles.filter(el => el.getAttribute('ng-transition') === transitionId)
        .forEach(el => el.parentNode.removeChild(el));
    }, 50);
  }
}
