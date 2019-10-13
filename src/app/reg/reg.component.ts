import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import {NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import { RegServiceService } from '../services/reg-service.service'
import * as firebase from 'firebase';


@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.scss']
})
export class RegComponent implements OnInit {
  etext: string;
  stext: string;
  selectedFile = null;
  up: firebase.storage.UploadTask

  constructor(private http: HttpClient,
              private activatedRoute: ActivatedRoute,
              private rs: RegServiceService) { }

  ngOnInit() {
    firebase.initializeApp(environment.firebase)
  }

  preview(event) {
    this.selectedFile = <File> event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e: any) {
      document.getElementById('img1').setAttribute('src', e.target.result);
    }
    reader.readAsDataURL(event.target.files[0]);
  }

  create(record: NgForm) {
    // console.log(record.value);
    if (record.value.name != null &&
      record.value.teamName != null &&
      record.value.email != null &&
      (record.value.contact > 1000000000 && record.value.contact < 9999999999) &&
      record.value.usn != null && this.selectedFile != null) {
      const formData = new FormData();
      formData.append('file', this.selectedFile)
      const reg = {
        usn: record.value.usn,
        name: record.value.name,
        teamName: record.value.teamName,
        stdEmail: record.value.email,
        contact: record.value.contact
      };
      this.rs.getData(reg).subscribe(regs => {
        console.log(regs);
        if (regs.length === 0) {
          this.stext = 'Uploading...'
          this.etext = ''
          this.rs.upload(reg)
          this.rs.getData(reg).subscribe(regs2 => {
            console.log(regs2);
            if (regs2.length === 1) {
              this.imgUpload(record.value.usn);
              this.stext = 'Your form has been uploaded successfully'
              this.etext = '';
            } else {
              this.etext = 'Oops... soomething went wrong try again'
              this.stext = '';
            }
          });
        } else {
          this.etext = 'This usn is already registered'
          this.stext = '';
        }
      });
    } else {
      this.etext = 'One or more fields are empty or invalid'
      this.stext = '';
    }
  }



  imgUpload(usn) {
    const storageRef = firebase.storage().ref().child(`uploads/Bill_${usn}`)
    storageRef.put(this.selectedFile, {contentType: this.selectedFile.type});
  }
}

