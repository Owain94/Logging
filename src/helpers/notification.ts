import * as swal from 'sweetalert';

export class Notifications {
  public static async notification(
    data: {
      type: 'success' | 'error',
      title: string,
      content: string
    }
  ) {
    return Promise.resolve(
      await new Promise((resolve, reject) => {
        swal({
          title: data.title,
          text: data.content,
          type: data.type,
          confirmButtonColor: '#900'
        }, () => {
          resolve();
        });
      })
    );
  }

  public static async confirm(
    data: {
      title: string,
      content: string
    }
  ) {
    return Promise.resolve(
      await new Promise((resolve, reject) => {
        swal({
          title: data.title,
          text: data.content,
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#900'
        }, (isConfirm) => {
          resolve(isConfirm);
        });
      })
    );
  }
}
