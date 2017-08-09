import * as FileSaver from 'file-saver';

export class Export {
  public static export(
    data: [any, string]
  ) {
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

    const blob: Blob = new Blob([data[0]], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(blob,
      `${data[1]}_logs_export_${new Date().toLocaleDateString()}_${new Date().toLocaleTimeString()}.xlsx`
    );

    return Promise.resolve();
  }
}
