import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileDownloadService {

  downloadFile(response) {
    const fileName = response.headers.get('Content-Disposition').split('filename=')[1].replace(/"/g, '');

    const data = window.URL.createObjectURL(response.body);
    const link = document.createElement('a');
    link.href = data;
    link.download = fileName;
    // Firefox.
    link.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}));
    setTimeout(() => {
        window.URL.revokeObjectURL(data);
        link.remove();
    }, 100);
  }
}
