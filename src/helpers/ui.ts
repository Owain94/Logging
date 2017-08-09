export class Ui {
  public static scroll(
    data: [number, number, ScrollBehavior]
  ) {
    window.scroll({top: data[0], left: data[1], behavior: data[2]});
    return Promise.resolve();
  }
}
