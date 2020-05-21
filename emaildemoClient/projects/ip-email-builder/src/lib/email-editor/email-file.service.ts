import {Injectable, Inject} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import {IEmailTemplate} from './iemail-template';
import {IP_CONFIG} from '../tokens';

import {GenericApiService, ILibraryRootConfg, ISearchField, ServiceUtils} from 'projects/fast-code-core/src/public_api';

@Injectable({
  providedIn: 'root'
})
export class EmailFileService extends GenericApiService<IEmailTemplate> {
  urlPath;

  constructor(private httpclient: HttpClient, @Inject(IP_CONFIG)  config: ILibraryRootConfg) {
    super(httpclient, {apiUrl: config.apiPath}, 'email');
    this.urlPath = config.apiPath;

  }

  createFileMetadata(fileMetadata) {
    return this.httpclient.post<any>(this.urlPath + '/files', fileMetadata);

  }

  uploadFile(id, myForm) {
    const fileData = new FormData();
    fileData.append('file', myForm.get('fileSource').value);
    this.httpclient.put(this.urlPath + '/files/' + id, fileData)
      .subscribe(res => {
        console.log(res);
      });
  }

}
