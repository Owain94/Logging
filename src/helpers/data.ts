export class Data {
  public static setHtmlText(
    data: {
      'i': number,
      'where': string,
      'what': string,
      'why': string,
      'how': string,
      'with': string,
      'result': string,
    }
  ) {
    if (document.getElementById('where-' + data.i)) {
      document.getElementById('where-' + data.i).innerHTML = data.where;
      document.getElementById('what-' + data.i).innerHTML = data.what;
      document.getElementById('why-' + data.i).innerHTML = data.why;
      document.getElementById('how-' + data.i).innerHTML = data.how;
      document.getElementById('with-' + data.i).innerHTML = data.with;
      document.getElementById('result-' + data.i).innerHTML = data.result;
    }
  }
}
