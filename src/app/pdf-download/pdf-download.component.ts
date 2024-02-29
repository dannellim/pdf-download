import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 

@Component({
  selector: 'app-pdf-download',
  templateUrl: './pdf-download.component.html',
  styleUrls: ['./pdf-download.component.css']
})

export class PdfDownloadComponent {
  constructor(private http: HttpClient){
    
  }
  NewTabMobile(){
    this.http.get('assets/documents/pdf.txt',{responseType: 'text' }).subscribe(data => {
      const byteCharacters = atob(data);
      const byteArrays = [];

      for (let offset = 0; offset < byteCharacters.length; offset += 512) {
        const slice = byteCharacters.slice(offset, offset + 512);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }

      const blob = new Blob(byteArrays, { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'file.pdf';
      link.target="_top";
      link.click();
      window.URL.revokeObjectURL(url);
    })
  }
  DownloadAll(){
    this.http.get('assets/documents/pdf.txt',{responseType: 'text' }).subscribe(data => {
      var element = document.createElement('a');
      element.setAttribute('href', 'data:application/octet-stream;base64,' + encodeURIComponent(data));
      element.setAttribute('download', 'file.pdf');
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element)
    })
  }
  NewTabDesktop(){
    this.http.get('assets/documents/pdf.txt',{responseType: 'text' }).subscribe(data => {
      const byteCharacters = atob(data);
      const byteArrays = [];

      for (let offset = 0; offset < byteCharacters.length; offset += 512) {
        const slice = byteCharacters.slice(offset, offset + 512);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }

      const blob = new Blob(byteArrays, { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(blob);
      window.open(fileURL, '_blank');
    })
  }
  iFrame(){
    var windowReference = window.open();
    this.http.get('assets/documents/pdf.txt',{responseType: 'text' }).subscribe(data => {

      var winHtml = "<title>Healthcare</title><iframe width='100%' style='margin: -8px;border: none;' height='100%' src='data:application/pdf;base64, " + encodeURI(data) + "'></iframe>";
      const winUrl = URL.createObjectURL(new Blob([winHtml], { type: "text/html" }));
      let pdfWindow = window.open("", "_blank");
      setTimeout(() => {
        pdfWindow?.document.write(winHtml);
      })
    })
  }
}
