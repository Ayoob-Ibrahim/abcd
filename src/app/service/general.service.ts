import { DOCUMENT } from '@angular/common';
import { Inject, inject, Injectable, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import Swal from "sweetalert2";
@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private route: Router,
    @Inject(DOCUMENT) private document: HTMLDocument,

  ) {

  }
  private translate: TranslateService = inject(TranslateService)


  setvalueinsession(res) {
    sessionStorage['language'] = res['language']
    sessionStorage['token'] = res['token']
  }



  private updateLanguageDir = new BehaviorSubject('');
  languagetter() {
    return this.updateLanguageDir.asObservable();
  }
  languagesetter(): void {
    this.updateLanguageDir.next(sessionStorage.getItem('language'));
  }

  languageInitilazation(renderer: Renderer2): void {
    let dir = sessionStorage['language']
    let body = document.getElementsByTagName("body")[0];
    renderer.setAttribute(body, 'dir', dir == 'ar' ? 'rtl' : 'ltr');
  }


  logout() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn-popup', //btnMarginLeft added in styles.scss
        cancelButton: 'btn-popup btn-cancel'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      html: `
      <div style="padding: 1rem 0 0 0">
        <i style="font-size: 3.5rem; border: 5px solid; border-radius: 50%; padding: 0.2rem 0.4rem 0 0.9rem; margin-bottom: 1rem;color:purple;" class="bi bi-box-arrow-right"></i>
        <h5 style="margin-top: 1rem; margin-bottom: 0.5rem">Are you sure you want to logout ?</h5>
        <p style="margin-bottom: 0; font-weight: 500"> You will redirected to Log-in page</p>
      </div>
      `,

      showCancelButton: true,
      confirmButtonText: 'Logout',
      cancelButtonText: 'Cancel',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.clearstorage();
        // this.dismissLoader();
      }
    })
  }



  sessionExpired() {
    if (this.route.url === '/login') return;
    this.dismissloader()
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn-popup",
        // cancelButton: "btn btn-warning",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        html: `
      <div style="padding: 1rem 0 0 0">
        <i style="font-size: 4.2rem; border: 5px solid; border-radius: 50%; padding: 0.5rem 1rem; margin-bottom: 1rem; color: green" class="bi bi-hourglass-bottom "></i>
        <h2 style="margin-top: 1.5rem; margin-bottom: 0.5rem">Session Expired !</h2>
        <p style="margin-bottom: 0; font-weight: 500">"Due to privacy concerns, your session has expired after 1 hour of inactivity. Please sign in or refresh to proceed." ! </p>
      </div>
      `,
        width: 500,
        // showCancelButton: true,
        // cancelButtonText: "REFRESH",
        allowOutsideClick: false,
        confirmButtonText: "LOG OUT",
      })
      .then((result) => {
        if (result.isDismissed) {
          this.clearstorage()
        } else if (result.isConfirmed) {
          this.clearstorage()
        }
      });
  }



  NetWorkTester() {
    this.dismissloader();
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn-popup",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        html: `
      <div style="padding: 1rem 0 0 0">
        <i style="font-size: 3.4rem; border: 5px solid; border-radius: 50%; padding: 0.5rem 1rem; margin-bottom: 1rem; color: purple" class="bi bi-wifi-off "></i>
        <h2 style="margin-top: 1.5rem; margin-bottom: 0.5rem">No Internet Connection !</h2>
        <p style="margin-bottom: 0; font-weight: 500">Check the internet connection and reload the page</p>
      </div>
      `,
        width: 500,
        showCancelButton: false,
        allowOutsideClick: false,
        confirmButtonText: "Reload",
      })
      .then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
  }


  serverDownalert() {
    if (sessionStorage['status'] == 'Waiting')
      return null;
    this.dismissloader();
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn-popup btn-reload",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        html: `
      <div style="padding: 1rem 0 0 0">
      <i style="font-size: 3.2rem; border: 5px solid; border-radius: 50%; padding: 0.5rem 1rem; margin-bottom: 1rem; color: orange" class="bi bi-cloud-download"></i>
        <h2 style="margin-top: 1.5rem; margin-bottom: 0.5rem">In Progress : Server Down !</h2>
        <p style="margin-bottom: 0; font-weight: 500">Kindly Reload the page for Better Connection</p>
      </div>
      `,
        width: 500,
        showCancelButton: false,
        allowOutsideClick: false,
        confirmButtonText: "RELOAD",
      })
      .then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
  }



  presentloader() {
    this.document.getElementById("loader").classList.remove("loaders");
    this.document.getElementById("loader").classList.add("loadersEnable");
  }

  dismissloader() {
    this.document.getElementById("loader").classList.remove("loadersEnable");
    this.document.getElementById("loader").classList.add("loaders");
  }




  clearstorage() {
    this.route.navigateByUrl("login");
    sessionStorage.clear();
    localStorage.clear();
  }





  // mock data tree jqx
  dataTree: any[] = [
    {
      'id': '1', 'name': 'Corporate Headquarters', 'budget': '1230000', 'location': 'Las Vegas',
      'children':
        [
          {
            'id': '2', 'name': 'Finance Division', 'budget': '423000', 'location': 'San Antonio',
            'children':
              [
                { 'id': '3', 'name': 'Accounting Department', 'budget': '113000', 'location': 'San Antonio' },
                {
                  'id': '4', 'name': 'Investment Department', 'budget': '310000', 'location': 'San Antonio',
                  'children':
                    [
                      { 'id': '5', 'name': 'Banking Office', 'budget': '240000', 'location': 'San Antonio' },
                      { 'id': '6', 'name': 'Bonds Office', 'budget': '70000', 'location': 'San Antonio' },
                    ]
                }
              ]
          },
          {
            'id': '7', 'name': 'Operations Division', 'budget': '600000', 'location': 'Miami',
            'children':
              [
                { 'id': '8', 'name': 'Manufacturing Department', 'budget': '300000', 'location': 'Miami' },
                { 'id': '9', 'name': 'Public Relations Department', 'budget': '200000', 'location': 'Miami' },
                { 'id': '10', 'name': 'Sales Department', 'budget': '100000', 'location': 'Miami' }
              ]
          },
          { 'id': '11', 'name': 'Research Division', 'budget': '200000', 'location': 'Boston' }
        ]
    }
  ];














  //mock data grid
  griddata = {
    "id": 0,
    "firstRowFilter": false,
    "pagination": null,
    "linkscreenname": "Inspection",
    "entity": "rpc/inspectiongrid",
    "primarykey": "Inspection Serial Number",
    "columnnames": "{\"Status\":\"status\",\"closeinspection\":\"closeinspection\",\"updatedby\":\"updatedby\",\"IssuedUser\":\"issueduser\",\"Issuing department\":\"issuingdepart\",\"Reporter\":\"reporter\",\"Time\":\"times\",\"positions\":\"positions\",\"Document\":\"document\",\"Inspected by\":\"inspectedby\",\"Date\":\"dates\",\"createdtime\":\"createdtime\",\"updatedtime\":\"updatedtime\",\"companyCorrection\":\"companycorrection\",\"Company Name\":\"companyname\",\"eventdescription\":\"eventdescription\",\"Company Id\":\"ids\",\"createdby\":\"createdby\",\"isdraft\":\"isdraft\",\"Inspection Serial Number\":\"inspectionsrno\",\"isdelete\":\"isdelete\",\"Location\":\"location\"}",
    "alias": null,
    "jqdetails": "{\"gridheight\":\"95%\",\"columns\":[{\"level\":\"\",\"cellsalign\":\"center\",\"icon\":\"\",\"displayfield\":\"Inspection Serial Number\",\"align\":\"center\",\"columnname\":\"inspectionsrno\",\"decodoption\":\"\"},{\"level\":\"\",\"cellsalign\":\"center\",\"icon\":\"\",\"displayfield\":\"Company Name\",\"align\":\"center\",\"columnname\":\"companyname\",\"decodoption\":\"\"},{\"level\":\"\",\"cellsalign\":\"center\",\"icon\":\"\",\"displayfield\":\"Inspected by\",\"align\":\"center\",\"columnname\":\"inspectedby\",\"decodoption\":\"\"},{\"level\":\"\",\"cellsalign\":\"center\",\"icon\":\"\",\"displayfield\":\"Issuing department\",\"align\":\"center\",\"columnname\":\"issuingdepart\",\"decodoption\":\"\"},{\"level\":\"\",\"cellsalign\":\"center\",\"icon\":\"\",\"displayfield\":\"Location\",\"align\":\"center\",\"columnname\":\"location\",\"decodoption\":\"\"},{\"level\":\"\",\"cellsalign\":\"center\",\"icon\":\"\",\"displayfield\":\"Status\",\"align\":\"center\",\"columnname\":\"status\",\"decodoption\":\"\"},{\"level\":\"\",\"cellsalign\":\"center\",\"icon\":\"\",\"displayfield\":\"Date\",\"align\":\"center\",\"columnname\":\"dates\",\"decodoption\":\"\"},{\"level\":\"\",\"cellsalign\":\"center\",\"icon\":\"\",\"displayfield\":\"Time\",\"align\":\"center\",\"columnname\":\"times\",\"decodoption\":\"\"}],\"firstrowfilter\":false,\"Airport Admin\":[\"view\"],\"Developer\":[],\"Airport Security\":[],\"screenname\":\"Inspection\",\"showgridbyrole\":{\"default\":[\"inspectionsrno\",\"companyname\",\"inspectedby\",\"issuingdepart\",\"location\",\"dates\",\"times\",\"status\"],\"Airport Admin\":[\"inspectionsrno\",\"companyname\",\"inspectedby\",\"issuingdepart\",\"location\",\"dates\",\"times\",\"status\"],\"Airport Security\":[\"view\"],\"Airport Officer\":[\"inspectionsrno\",\"companyname\",\"inspectedby\",\"issuingdepart\",\"location\",\"dates\",\"times\",\"status\"],\"Company Admin\":[\"inspectionsrno\",\"inspectedby\",\"issuingdepart\",\"location\",\"dates\",\"times\",\"status\"]},\"Airport Officer\":[\"view\"],\"Company Admin\":[\"view\"],\"gridwidth\":\"100%\"}",
    "displayType": "grid",
    "datavalues": "[{\"Status\":\"Submited\",\"closeinspection\":false,\"updatedby\":null,\"IssuedUser\":\"[{\\\"companyserialid\\\":\\\"12345\\\",\\\"jobtitle\\\":\\\"IT\\\",\\\"companyname\\\":\\\"ASEIT\\\",\\\"rolename\\\":\\\"Company Admin\\\",\\\"isprimaryuser\\\":\\\"PrimaryUser\\\",\\\"name\\\":\\\"ARAVINTH S\\\",\\\"emailaddress\\\":\\\"aravinth@eitworks.com\\\",\\\"id\\\":296,\\\"contactno\\\":\\\"987654321\\\"},{\\\"companyserialid\\\":\\\"12345\\\",\\\"jobtitle\\\":\\\"IT\\\",\\\"companyname\\\":\\\"ASEIT\\\",\\\"rolename\\\":\\\"Company Admin\\\",\\\"isprimaryuser\\\":\\\"SecondaryUser\\\",\\\"name\\\":\\\"ADAM M\\\",\\\"emailaddress\\\":\\\"adam@eitworks.com\\\",\\\"id\\\":299,\\\"contactno\\\":\\\"123456789\\\"}]\",\"Issuing department\":\"Admin For Airport\",\"Reporter\":\"ertjh\",\"Time\":\"11:26:31\",\"positions\":\"Airport Admin\",\"Document\":\"{\\\"issue1\\\":{\\\"issue1$$1.jpg\\\":\\\"https://goldenelement.s3.ap-southeast-1.amazonaws.com/onboard/20240711003011-07-2024 05:57:59.jpg\\\",\\\"issue1$$2.pdf\\\":\\\"https://goldenelement.s3.ap-southeast-1.amazonaws.com/onboard/20240711003111-07-2024 05:58:00.pdf\\\"}}\",\"Inspected by\":\"Airport Admin\",\"Date\":\"2024-07-11\",\"createdtime\":\"2024-07-18T05:44:02\",\"updatedtime\":null,\"companyCorrection\":\"\",\"Company Name\":\"ASEIT\",\"eventdescription\":\"{\\\"issue1\\\":\\\"{\\\\\\\"title\\\\\\\":\\\\\\\"qwefg\\\\\\\",\\\\\\\"type\\\\\\\":\\\\\\\"Vehicle\\\\\\\",\\\\\\\"typeid\\\\\\\":\\\\\\\"werg\\\\\\\",\\\\\\\"description\\\\\\\":\\\\\\\"qwdefth\\\\\\\",\\\\\\\"issuefile\\\\\\\":\\\\\\\"Inspection 2|issue1.jpg,RedTag_QR|issue1.pdf\\\\\\\"}\\\"}\",\"Company Id\":193,\"createdby\":\"Airport Admin\",\"isdraft\":false,\"Inspection Serial Number\":\"20240718001\",\"isdelete\":false,\"Location\":\"24.961088194827184,46.70046880950927\"},{\"Status\":\"Submited\",\"closeinspection\":false,\"updatedby\":null,\"IssuedUser\":\"[{\\\"companyserialid\\\":\\\"12345\\\",\\\"jobtitle\\\":\\\"IT\\\",\\\"companyname\\\":\\\"ASEIT\\\",\\\"rolename\\\":\\\"Company Admin\\\",\\\"isprimaryuser\\\":\\\"SecondaryUser\\\",\\\"name\\\":\\\"ADAM M\\\",\\\"emailaddress\\\":\\\"adam@eitworks.com\\\",\\\"id\\\":299,\\\"contactno\\\":\\\"123456789\\\"},{\\\"companyserialid\\\":\\\"12345\\\",\\\"jobtitle\\\":\\\"IT\\\",\\\"companyname\\\":\\\"ASEIT\\\",\\\"rolename\\\":\\\"Company Admin\\\",\\\"isprimaryuser\\\":\\\"PrimaryUser\\\",\\\"name\\\":\\\"ARAVINTH S\\\",\\\"emailaddress\\\":\\\"aravinth@eitworks.com\\\",\\\"id\\\":296,\\\"contactno\\\":\\\"987654321\\\"},{\\\"companyserialid\\\":\\\"12345\\\",\\\"jobtitle\\\":\\\"IT\\\",\\\"companyname\\\":\\\"ASEIT\\\",\\\"rolename\\\":\\\"Company Admin\\\",\\\"isprimaryuser\\\":\\\"SecondaryUser\\\",\\\"name\\\":\\\"DINESH R\\\",\\\"emailaddress\\\":\\\"dinesh@eitworks.com\\\",\\\"id\\\":301,\\\"contactno\\\":\\\"123456789\\\"}]\",\"Issuing department\":\"Admin For Airport\",\"Reporter\":\"qwedfg\",\"Time\":\"10:48:25\",\"positions\":\"Airport Admin\",\"Document\":\"{\\\"issue1\\\":{\\\"issue1$$1.jpg\\\":\\\"https://goldenelement.s3.ap-southeast-1.amazonaws.com/onboard/20240715001015-07-2024 05:19:29.jpg\\\"}}\",\"Inspected by\":\"Airport Admin\",\"Date\":\"2024-07-15\",\"createdtime\":\"2024-07-15T05:19:21\",\"updatedtime\":null,\"companyCorrection\":\"\",\"Company Name\":\"ASEIT\",\"eventdescription\":\"{\\\"issue1\\\":\\\"{\\\\\\\"title\\\\\\\":\\\\\\\"awefs\\\\\\\",\\\\\\\"type\\\\\\\":\\\\\\\"Vehicle\\\\\\\",\\\\\\\"typeid\\\\\\\":\\\\\\\"ewfg\\\\\\\",\\\\\\\"description\\\\\\\":\\\\\\\"asdfg\\\\\\\",\\\\\\\"issuefile\\\\\\\":\\\\\\\"Inspection 1|issue1.jpg\\\\\\\"}\\\"}\",\"Company Id\":193,\"createdby\":\"Airport Admin\",\"isdraft\":false,\"Inspection Serial Number\":\"20240715001\",\"isdelete\":false,\"Location\":\"24.958267418122063,46.7044170211792\"},{\"Status\":\"Open\",\"closeinspection\":false,\"updatedby\":null,\"IssuedUser\":\"[{\\\"companyserialid\\\":\\\"12345\\\",\\\"jobtitle\\\":\\\"IT\\\",\\\"companyname\\\":\\\"ASEIT\\\",\\\"rolename\\\":\\\"Company Admin\\\",\\\"isprimaryuser\\\":\\\"PrimaryUser\\\",\\\"name\\\":\\\"ARAVINTH S\\\",\\\"emailaddress\\\":\\\"aravinth@eitworks.com\\\",\\\"id\\\":296,\\\"contactno\\\":\\\"987654321\\\"},{\\\"companyserialid\\\":\\\"12345\\\",\\\"jobtitle\\\":\\\"IT\\\",\\\"companyname\\\":\\\"ASEIT\\\",\\\"rolename\\\":\\\"Company Admin\\\",\\\"isprimaryuser\\\":\\\"SecondaryUser\\\",\\\"name\\\":\\\"DINESH R\\\",\\\"emailaddress\\\":\\\"dinesh@eitworks.com\\\",\\\"id\\\":301,\\\"contactno\\\":\\\"123456789\\\"}]\",\"Issuing department\":\"Admin For Airport\",\"Reporter\":\"asdf\",\"Time\":\"15:26:05\",\"positions\":\"Airport Admin\",\"Document\":\"{\\\"issue1\\\":{\\\"issue1$$1.jpg\\\":\\\"https://goldenelement.s3.ap-southeast-1.amazonaws.com/onboard/20240711009011-07-2024 09:56:58.jpg\\\"}}\",\"Inspected by\":\"Airport Admin\",\"Date\":\"2024-07-11\",\"createdtime\":\"2024-07-11T09:56:51\",\"updatedtime\":null,\"companyCorrection\":\"\",\"Company Name\":\"ASEIT\",\"eventdescription\":\"{\\\"issue1\\\":\\\"{\\\\\\\"title\\\\\\\":\\\\\\\"awfgh\\\\\\\",\\\\\\\"type\\\\\\\":\\\\\\\"Others\\\\\\\",\\\\\\\"typeid\\\\\\\":\\\\\\\"wet\\\\\\\",\\\\\\\"description\\\\\\\":\\\\\\\"32r5trt\\\\\\\",\\\\\\\"issuefile\\\\\\\":\\\\\\\"Inspection 1|issue1.jpg\\\\\\\"}\\\"}\",\"Company Id\":193,\"createdby\":\"Airport Admin\",\"isdraft\":true,\"Inspection Serial Number\":\"20240711009\",\"isdelete\":false,\"Location\":\"24.95970699499962,46.7036445449829\"},{\"Status\":\"Submited\",\"closeinspection\":false,\"updatedby\":null,\"IssuedUser\":\"[{\\\"companyserialid\\\":\\\"00012\\\",\\\"jobtitle\\\":\\\"TEST\\\",\\\"companyname\\\":\\\"MANI WORKS\\\",\\\"rolename\\\":\\\"Company Admin\\\",\\\"isprimaryuser\\\":\\\"SecondaryUser\\\",\\\"name\\\":\\\"AYOOB M\\\",\\\"emailaddress\\\":\\\"ayoob@eitworks.com\\\",\\\"id\\\":302,\\\"contactno\\\":\\\"123456789\\\"},{\\\"companyserialid\\\":\\\"00012\\\",\\\"jobtitle\\\":\\\"IT\\\",\\\"companyname\\\":\\\"MANI WORKS\\\",\\\"rolename\\\":\\\"Company Admin\\\",\\\"isprimaryuser\\\":\\\"PrimaryUser\\\",\\\"name\\\":\\\"MANI A\\\",\\\"emailaddress\\\":\\\"manikandan@eitworks.com\\\",\\\"id\\\":298,\\\"contactno\\\":\\\"987654321\\\"}]\",\"Issuing department\":\"Admin For Airport\",\"Reporter\":\"ertjh\",\"Time\":\"11:26:31\",\"positions\":\"Airport Admin\",\"Document\":\"{\\\"issue1\\\":{\\\"issue1$$1.jpg\\\":\\\"https://goldenelement.s3.ap-southeast-1.amazonaws.com/onboard/20240711003011-07-2024 05:57:59.jpg\\\",\\\"issue1$$2.pdf\\\":\\\"https://goldenelement.s3.ap-southeast-1.amazonaws.com/onboard/20240711003111-07-2024 05:58:00.pdf\\\"}}\",\"Inspected by\":\"Airport Admin\",\"Date\":\"2024-07-11\",\"createdtime\":\"2024-07-11T07:27:24\",\"updatedtime\":null,\"companyCorrection\":\"asdfgh\",\"Company Name\":\"MANI WORKS\",\"eventdescription\":\"{\\\"issue1\\\":\\\"{\\\\\\\"title\\\\\\\":\\\\\\\"qwefg\\\\\\\",\\\\\\\"type\\\\\\\":\\\\\\\"Vehicle\\\\\\\",\\\\\\\"typeid\\\\\\\":\\\\\\\"werg\\\\\\\",\\\\\\\"description\\\\\\\":\\\\\\\"qwdefth\\\\\\\",\\\\\\\"issuefile\\\\\\\":\\\\\\\"Inspection 2|issue1.jpg,RedTag_QR|issue1.pdf\\\\\\\"}\\\"}\",\"Company Id\":195,\"createdby\":\"Airport Admin\",\"isdraft\":false,\"Inspection Serial Number\":\"20240711008\",\"isdelete\":false,\"Location\":\"24.961088194827184,46.70046880950927\"},{\"Status\":\"Submited\",\"closeinspection\":false,\"updatedby\":null,\"IssuedUser\":\"[{\\\"companyserialid\\\":\\\"12345\\\",\\\"jobtitle\\\":\\\"IT\\\",\\\"companyname\\\":\\\"ASEIT\\\",\\\"rolename\\\":\\\"Company Admin\\\",\\\"isprimaryuser\\\":\\\"SecondaryUser\\\",\\\"name\\\":\\\"ADAM M\\\",\\\"emailaddress\\\":\\\"adam@eitworks.com\\\",\\\"id\\\":299,\\\"contactno\\\":\\\"123456789\\\"},{\\\"companyserialid\\\":\\\"12345\\\",\\\"jobtitle\\\":\\\"IT\\\",\\\"companyname\\\":\\\"ASEIT\\\",\\\"rolename\\\":\\\"Company Admin\\\",\\\"isprimaryuser\\\":\\\"PrimaryUser\\\",\\\"name\\\":\\\"ARAVINTH S\\\",\\\"emailaddress\\\":\\\"aravinth@eitworks.com\\\",\\\"id\\\":296,\\\"contactno\\\":\\\"987654321\\\"},{\\\"companyserialid\\\":\\\"12345\\\",\\\"jobtitle\\\":\\\"TEST\\\",\\\"companyname\\\":\\\"ASEIT\\\",\\\"rolename\\\":\\\"Company Admin\\\",\\\"isprimaryuser\\\":\\\"SecondaryUser\\\",\\\"name\\\":\\\"GANESH M\\\",\\\"emailaddress\\\":\\\"ganesh@eitworks.com\\\",\\\"id\\\":300,\\\"contactno\\\":\\\"123456789\\\"},{\\\"companyserialid\\\":\\\"12345\\\",\\\"jobtitle\\\":\\\"IT\\\",\\\"companyname\\\":\\\"ASEIT\\\",\\\"rolename\\\":\\\"Company Admin\\\",\\\"isprimaryuser\\\":\\\"SecondaryUser\\\",\\\"name\\\":\\\"DINESH R\\\",\\\"emailaddress\\\":\\\"dinesh@eitworks.com\\\",\\\"id\\\":301,\\\"contactno\\\":\\\"123456789\\\"}]\",\"Issuing department\":\"Admin For Airport\",\"Reporter\":\"qwertyu\",\"Time\":\"11:04:41\",\"positions\":\"Airport Admin\",\"Document\":\"{\\\"issue1\\\":{\\\"issue1$$1.jpg\\\":\\\"https://goldenelement.s3.ap-southeast-1.amazonaws.com/onboard/20240711002011-07-2024 05:35:32.jpg\\\"}}\",\"Inspected by\":\"Airport Admin\",\"Date\":\"2024-07-11\",\"createdtime\":\"2024-07-11T07:17:59\",\"updatedtime\":null,\"companyCorrection\":\"\",\"Company Name\":\"ASEIT\",\"eventdescription\":\"{\\\"issue1\\\":\\\"{\\\\\\\"title\\\\\\\":\\\\\\\"asdfghj\\\\\\\",\\\\\\\"type\\\\\\\":\\\\\\\"Others\\\\\\\",\\\\\\\"typeid\\\\\\\":\\\\\\\"qwertgyu\\\\\\\",\\\\\\\"description\\\\\\\":\\\\\\\"3rt4hyjuky\\\\\\\",\\\\\\\"issuefile\\\\\\\":\\\\\\\"Inspection 1|issue1.jpg\\\\\\\"}\\\"}\",\"Company Id\":193,\"createdby\":\"Airport Admin\",\"isdraft\":false,\"Inspection Serial Number\":\"20240711007\",\"isdelete\":false,\"Location\":\"24.962197034177336,46.70188501586914\"},{\"Status\":\"Submited\",\"closeinspection\":false,\"updatedby\":null,\"IssuedUser\":\"[]\",\"Issuing department\":\"Admin For Airport\",\"Reporter\":\"asdfghjk\",\"Time\":\"12:12:57\",\"positions\":\"Airport Admin\",\"Document\":\"{\\\"issue1\\\":{\\\"issue1$$1.jpg\\\":\\\"https://goldenelement.s3.ap-southeast-1.amazonaws.com/onboard/20240711006011-07-2024 06:43:44.jpg\\\"}}\",\"Inspected by\":\"Airport Admin\",\"Date\":\"2024-07-11\",\"createdtime\":\"2024-07-11T06:43:35\",\"updatedtime\":null,\"companyCorrection\":\"\",\"Company Name\":\"TESTING\",\"eventdescription\":\"{\\\"issue1\\\":\\\"{\\\\\\\"title\\\\\\\":\\\\\\\"dfghj\\\\\\\",\\\\\\\"type\\\\\\\":\\\\\\\"Others\\\\\\\",\\\\\\\"typeid\\\\\\\":\\\\\\\"asdfghj\\\\\\\",\\\\\\\"description\\\\\\\":\\\\\\\"asdfghj\\\\\\\",\\\\\\\"issuefile\\\\\\\":\\\\\\\"Inspection 1|issue1.jpg\\\\\\\"}\\\"}\",\"Company Id\":196,\"createdby\":\"Airport Admin\",\"isdraft\":false,\"Inspection Serial Number\":\"20240711006\",\"isdelete\":false,\"Location\":\"24.958111787180982,46.704803259277334\"},{\"Status\":\"Submited\",\"closeinspection\":false,\"updatedby\":null,\"IssuedUser\":\"[{\\\"companyserialid\\\":\\\"12345\\\",\\\"jobtitle\\\":\\\"IT\\\",\\\"companyname\\\":\\\"ASEIT\\\",\\\"rolename\\\":\\\"Company Admin\\\",\\\"isprimaryuser\\\":\\\"SecondaryUser\\\",\\\"name\\\":\\\"DINESH R\\\",\\\"emailaddress\\\":\\\"dinesh@eitworks.com\\\",\\\"id\\\":301,\\\"contactno\\\":\\\"123456789\\\"},{\\\"companyserialid\\\":\\\"12345\\\",\\\"jobtitle\\\":\\\"TEST\\\",\\\"companyname\\\":\\\"ASEIT\\\",\\\"rolename\\\":\\\"Company Admin\\\",\\\"isprimaryuser\\\":\\\"SecondaryUser\\\",\\\"name\\\":\\\"GANESH M\\\",\\\"emailaddress\\\":\\\"ganesh@eitworks.com\\\",\\\"id\\\":300,\\\"contactno\\\":\\\"123456789\\\"}]\",\"Issuing department\":\"Admin For Airport\",\"Reporter\":\"QWREUIO\",\"Time\":\"11:38:31\",\"positions\":\"Airport Admin\",\"Document\":\"{\\\"issue1\\\":{\\\"issue1$$1.jpg\\\":\\\"https://goldenelement.s3.ap-southeast-1.amazonaws.com/onboard/20240711005011-07-2024 06:08:49.jpg\\\"}}\",\"Inspected by\":\"Airport Admin\",\"Date\":\"2024-07-11\",\"createdtime\":\"2024-07-11T06:08:40\",\"updatedtime\":null,\"companyCorrection\":\"\",\"Company Name\":\"ASEIT\",\"eventdescription\":\"{\\\"issue1\\\":\\\"{\\\\\\\"title\\\\\\\":\\\\\\\"asdfgh\\\\\\\",\\\\\\\"type\\\\\\\":\\\\\\\"Equipment\\\\\\\",\\\\\\\"typeid\\\\\\\":\\\\\\\"ASERDTYU\\\\\\\",\\\\\\\"description\\\\\\\":\\\\\\\"qawdefrgthy\\\\\\\",\\\\\\\"issuefile\\\\\\\":\\\\\\\"Inspection 3|issue1.jpg\\\\\\\"}\\\"}\",\"Company Id\":193,\"createdby\":\"Airport Admin\",\"isdraft\":false,\"Inspection Serial Number\":\"20240711005\",\"isdelete\":false,\"Location\":\"24.96099092774098,46.70184210052489\"},{\"Status\":\"Submited\",\"closeinspection\":false,\"updatedby\":null,\"IssuedUser\":\"[{\\\"companyserialid\\\":\\\"00012\\\",\\\"jobtitle\\\":\\\"TEST\\\",\\\"companyname\\\":\\\"MANI WORKS\\\",\\\"rolename\\\":\\\"Company Admin\\\",\\\"isprimaryuser\\\":\\\"SecondaryUser\\\",\\\"name\\\":\\\"AYOOB M\\\",\\\"emailaddress\\\":\\\"ayoob@eitworks.com\\\",\\\"id\\\":302,\\\"contactno\\\":\\\"123456789\\\"}]\",\"Issuing department\":\"Admin For Airport\",\"Reporter\":\"ertjh\",\"Time\":\"11:26:31\",\"positions\":\"Airport Admin\",\"Document\":\"{\\\"issue1\\\":{\\\"issue1$$1.jpg\\\":\\\"https://goldenelement.s3.ap-southeast-1.amazonaws.com/onboard/20240711003011-07-2024 05:57:59.jpg\\\",\\\"issue1$$2.pdf\\\":\\\"https://goldenelement.s3.ap-southeast-1.amazonaws.com/onboard/20240711003111-07-2024 05:58:00.pdf\\\"}}\",\"Inspected by\":\"Airport Admin\",\"Date\":\"2024-07-11\",\"createdtime\":\"2024-07-11T05:59:38\",\"updatedtime\":null,\"companyCorrection\":\"asdf\",\"Company Name\":\"ASEIT\",\"eventdescription\":\"{\\\"issue1\\\":\\\"{\\\\\\\"title\\\\\\\":\\\\\\\"qwefg\\\\\\\",\\\\\\\"type\\\\\\\":\\\\\\\"Vehicle\\\\\\\",\\\\\\\"typeid\\\\\\\":\\\\\\\"werg\\\\\\\",\\\\\\\"description\\\\\\\":\\\\\\\"qwdefth\\\\\\\",\\\\\\\"issuefile\\\\\\\":\\\\\\\"Inspection 2|issue1.jpg,RedTag_QR|issue1.pdf\\\\\\\"}\\\"}\",\"Company Id\":193,\"createdby\":\"Airport Admin\",\"isdraft\":false,\"Inspection Serial Number\":\"20240711004\",\"isdelete\":false,\"Location\":\"24.961418902345386,46.70087650527954\"},{\"Status\":\"Submited\",\"closeinspection\":false,\"updatedby\":null,\"IssuedUser\":\"[{\\\"companyserialid\\\":\\\"00012\\\",\\\"jobtitle\\\":\\\"TEST\\\",\\\"companyname\\\":\\\"MANI WORKS\\\",\\\"rolename\\\":\\\"Company Admin\\\",\\\"isprimaryuser\\\":\\\"SecondaryUser\\\",\\\"name\\\":\\\"AYOOB M\\\",\\\"emailaddress\\\":\\\"ayoob@eitworks.com\\\",\\\"id\\\":302,\\\"contactno\\\":\\\"123456789\\\"}]\",\"Issuing department\":\"Admin For Airport\",\"Reporter\":\"ertjh\",\"Time\":\"11:26:31\",\"positions\":\"Airport Admin\",\"Document\":\"{\\\"issue1\\\":{\\\"issue1$$1.jpg\\\":\\\"https://goldenelement.s3.ap-southeast-1.amazonaws.com/onboard/20240711003011-07-2024 05:57:59.jpg\\\",\\\"issue1$$2.pdf\\\":\\\"https://goldenelement.s3.ap-southeast-1.amazonaws.com/onboard/20240711003111-07-2024 05:58:00.pdf\\\"}}\",\"Inspected by\":\"Airport Admin\",\"Date\":\"2024-07-11\",\"createdtime\":\"2024-07-11T05:57:46\",\"updatedtime\":null,\"companyCorrection\":\"\",\"Company Name\":\"MANI WORKS\",\"eventdescription\":\"{\\\"issue1\\\":\\\"{\\\\\\\"title\\\\\\\":\\\\\\\"qwefg\\\\\\\",\\\\\\\"type\\\\\\\":\\\\\\\"Vehicle\\\\\\\",\\\\\\\"typeid\\\\\\\":\\\\\\\"werg\\\\\\\",\\\\\\\"description\\\\\\\":\\\\\\\"qwdefth\\\\\\\",\\\\\\\"issuefile\\\\\\\":\\\\\\\"Inspection 2|issue1.jpg,RedTag_QR|issue1.pdf\\\\\\\"}\\\"}\",\"Company Id\":195,\"createdby\":\"Airport Admin\",\"isdraft\":false,\"Inspection Serial Number\":\"20240711003\",\"isdelete\":false,\"Location\":\"24.961088194827184,46.70046880950927\"},{\"Status\":\"Submited\",\"closeinspection\":false,\"updatedby\":null,\"IssuedUser\":\"[{\\\"companyserialid\\\":\\\"12345\\\",\\\"jobtitle\\\":\\\"IT\\\",\\\"companyname\\\":\\\"ASEIT\\\",\\\"rolename\\\":\\\"Company Admin\\\",\\\"isprimaryuser\\\":\\\"SecondaryUser\\\",\\\"name\\\":\\\"ADAM M\\\",\\\"emailaddress\\\":\\\"adam@eitworks.com\\\",\\\"id\\\":299,\\\"contactno\\\":\\\"123456789\\\"},{\\\"companyserialid\\\":\\\"12345\\\",\\\"jobtitle\\\":\\\"IT\\\",\\\"companyname\\\":\\\"ASEIT\\\",\\\"rolename\\\":\\\"Company Admin\\\",\\\"isprimaryuser\\\":\\\"PrimaryUser\\\",\\\"name\\\":\\\"ARAVINTH S\\\",\\\"emailaddress\\\":\\\"aravinth@eitworks.com\\\",\\\"id\\\":296,\\\"contactno\\\":\\\"987654321\\\"}]\",\"Issuing department\":\"Admin For Airport\",\"Reporter\":\"qwertyu\",\"Time\":\"11:04:41\",\"positions\":\"Airport Admin\",\"Document\":\"{\\\"issue1\\\":{\\\"issue1$$1.jpg\\\":\\\"https://goldenelement.s3.ap-southeast-1.amazonaws.com/onboard/20240711002011-07-2024 05:35:32.jpg\\\"}}\",\"Inspected by\":\"Airport Admin\",\"Date\":\"2024-07-11\",\"createdtime\":\"2024-07-11T05:35:23\",\"updatedtime\":null,\"companyCorrection\":\"Ok Sir\\n\",\"Company Name\":\"ASEIT\",\"eventdescription\":\"{\\\"issue1\\\":\\\"{\\\\\\\"title\\\\\\\":\\\\\\\"asdfghj\\\\\\\",\\\\\\\"type\\\\\\\":\\\\\\\"Others\\\\\\\",\\\\\\\"typeid\\\\\\\":\\\\\\\"qwertgyu\\\\\\\",\\\\\\\"description\\\\\\\":\\\\\\\"3rt4hyjuky\\\\\\\",\\\\\\\"issuefile\\\\\\\":\\\\\\\"Inspection 1|issue1.jpg\\\\\\\"}\\\"}\",\"Company Id\":193,\"createdby\":\"Airport Admin\",\"isdraft\":false,\"Inspection Serial Number\":\"20240711002\",\"isdelete\":false,\"Location\":\"24.962197034177336,46.70188501586914\"},{\"Status\":\"Submited\",\"closeinspection\":false,\"updatedby\":null,\"IssuedUser\":\"[]\",\"Issuing department\":\"Admin For Airport\",\"Reporter\":\"testing\",\"Time\":\"10:59:36\",\"positions\":\"Airport Admin\",\"Document\":\"{\\\"issue1\\\":{\\\"issue1$$1.jpg\\\":\\\"https://goldenelement.s3.ap-southeast-1.amazonaws.com/onboard/20240711001011-07-2024 05:30:59.jpg\\\"}}\",\"Inspected by\":\"Airport Admin\",\"Date\":\"2024-07-11\",\"createdtime\":\"2024-07-11T05:30:50\",\"updatedtime\":null,\"companyCorrection\":\"\",\"Company Name\":\"ASEIT\",\"eventdescription\":\"{\\\"issue1\\\":\\\"{\\\\\\\"title\\\\\\\":\\\\\\\"User testing\\\\\\\",\\\\\\\"type\\\\\\\":\\\\\\\"Vehicle\\\\\\\",\\\\\\\"typeid\\\\\\\":\\\\\\\"001\\\\\\\",\\\\\\\"description\\\\\\\":\\\\\\\"dsjnd\\\\\\\",\\\\\\\"issuefile\\\\\\\":\\\\\\\"Inspection 1|issue1.jpg\\\\\\\"}\\\"}\",\"Company Id\":193,\"createdby\":\"Airport Admin\",\"isdraft\":false,\"Inspection Serial Number\":\"20240711001\",\"isdelete\":false,\"Location\":\"24.959434643908565,46.69993236770629\"},{\"Status\":\"Closed\",\"closeinspection\":true,\"updatedby\":null,\"IssuedUser\":\"[{\\\"companyserialid\\\":\\\"12345\\\",\\\"jobtitle\\\":\\\"IT\\\",\\\"companyname\\\":\\\"ASEIT\\\",\\\"rolename\\\":\\\"Company Admin\\\",\\\"isprimaryuser\\\":\\\"SecondaryUser\\\",\\\"name\\\":\\\"ADAM M\\\",\\\"emailaddress\\\":\\\"adam@eitworks.com\\\",\\\"id\\\":299,\\\"contactno\\\":\\\"123456789\\\"},{\\\"companyserialid\\\":\\\"12345\\\",\\\"jobtitle\\\":\\\"IT\\\",\\\"companyname\\\":\\\"ASEIT\\\",\\\"rolename\\\":\\\"Company Admin\\\",\\\"isprimaryuser\\\":\\\"PrimaryUser\\\",\\\"name\\\":\\\"mani\\\",\\\"emailaddress\\\":\\\"mani@eitworks.com\\\",\\\"id\\\":296,\\\"contactno\\\":\\\"987654321\\\"},{\\\"companyserialid\\\":\\\"12345\\\",\\\"jobtitle\\\":\\\"TEST\\\",\\\"companyname\\\":\\\"ASEIT\\\",\\\"rolename\\\":\\\"Company Admin\\\",\\\"isprimaryuser\\\":\\\"SecondaryUser\\\",\\\"name\\\":\\\"GANESH M\\\",\\\"emailaddress\\\":\\\"ganesh@eitworks.com\\\",\\\"id\\\":300,\\\"contactno\\\":\\\"123456789\\\"}]\",\"Issuing department\":\"GROUNDSIDE DEPARTMENT\",\"Reporter\":\"yhnbgfcv\",\"Time\":\"19:50:02\",\"positions\":\"OFFICER\",\"Document\":\"{\\\"issue1\\\":{\\\"issue1$$1.pdf\\\":\\\"https://goldenelement.s3.ap-southeast-1.amazonaws.com/onboard/20240709001009-07-2024 07:50:26.pdf\\\"}}\",\"Inspected by\":\"MANI  A\",\"Date\":\"2024-07-09\",\"createdtime\":\"2024-07-10T13:26:45\",\"updatedtime\":null,\"companyCorrection\":\"\",\"Company Name\":\"ASEIT\",\"eventdescription\":\"{\\\"issue1\\\":\\\"{\\\\\\\"title\\\\\\\":\\\\\\\"tegfd\\\\\\\",\\\\\\\"type\\\\\\\":\\\\\\\"Vehicle\\\\\\\",\\\\\\\"typeid\\\\\\\":\\\\\\\"thg\\\\\\\",\\\\\\\"description\\\\\\\":\\\\\\\"hgfbvc\\\\\\\",\\\\\\\"issuefile\\\\\\\":\\\\\\\"Inspection-20240705001|issue1.pdf\\\\\\\"}\\\"}\",\"Company Id\":193,\"createdby\":\"Airport Admin\",\"isdraft\":false,\"Inspection Serial Number\":\"20240710003\",\"isdelete\":false,\"Location\":\"24.957343356228662,46.7068059762149\"},{\"Status\":\"Submited\",\"closeinspection\":false,\"updatedby\":null,\"IssuedUser\":\"[{\\\"companyserialid\\\":\\\"12345\\\",\\\"jobtitle\\\":\\\"IT\\\",\\\"companyname\\\":\\\"ASEIT\\\",\\\"rolename\\\":\\\"Company Admin\\\",\\\"isprimaryuser\\\":\\\"SecondaryUser\\\",\\\"name\\\":\\\"ADAM M\\\",\\\"emailaddress\\\":\\\"adam@eitworks.com\\\",\\\"id\\\":299,\\\"contactno\\\":\\\"123456789\\\"},{\\\"companyserialid\\\":\\\"12345\\\",\\\"jobtitle\\\":\\\"IT\\\",\\\"companyname\\\":\\\"ASEIT\\\",\\\"rolename\\\":\\\"Company Admin\\\",\\\"isprimaryuser\\\":\\\"PrimaryUser\\\",\\\"name\\\":\\\"ARAVINTH S\\\",\\\"emailaddress\\\":\\\"aravinth@eitworks.com\\\",\\\"id\\\":296,\\\"contactno\\\":\\\"987654321\\\"},{\\\"companyserialid\\\":\\\"12345\\\",\\\"jobtitle\\\":\\\"TEST\\\",\\\"companyname\\\":\\\"ASEIT\\\",\\\"rolename\\\":\\\"Company Admin\\\",\\\"isprimaryuser\\\":\\\"SecondaryUser\\\",\\\"name\\\":\\\"GANESH M\\\",\\\"emailaddress\\\":\\\"ganesh@eitworks.com\\\",\\\"id\\\":300,\\\"contactno\\\":\\\"123456789\\\"}]\",\"Issuing department\":\"GROUNDSIDE DEPARTMENT\",\"Reporter\":\"yhnbgfcv\",\"Time\":\"19:50:02\",\"positions\":\"OFFICER\",\"Document\":\"{\\\"issue1\\\":{\\\"issue1$$1.pdf\\\":\\\"https://goldenelement.s3.ap-southeast-1.amazonaws.com/onboard/20240709001009-07-2024 07:50:26.pdf\\\"}}\",\"Inspected by\":\"MANI  A\",\"Date\":\"2024-07-09\",\"createdtime\":\"2024-07-10T12:57:32\",\"updatedtime\":null,\"companyCorrection\":\"\",\"Company Name\":\"ASEIT\",\"eventdescription\":\"{\\\"issue1\\\":\\\"{\\\\\\\"title\\\\\\\":\\\\\\\"tegfd\\\\\\\",\\\\\\\"type\\\\\\\":\\\\\\\"Vehicle\\\\\\\",\\\\\\\"typeid\\\\\\\":\\\\\\\"thg\\\\\\\",\\\\\\\"description\\\\\\\":\\\\\\\"hgfbvc\\\\\\\",\\\\\\\"issuefile\\\\\\\":\\\\\\\"Inspection-20240705001|issue1.pdf\\\\\\\"}\\\"}\",\"Company Id\":193,\"createdby\":\"Airport Admin\",\"isdraft\":false,\"Inspection Serial Number\":\"20240710001\",\"isdelete\":false,\"Location\":\"24.957343356228662,46.7068059762149\"},{\"Status\":\"Submited\",\"closeinspection\":false,\"updatedby\":null,\"IssuedUser\":\"[{\\\"companyserialid\\\":\\\"12345\\\",\\\"jobtitle\\\":\\\"IT\\\",\\\"companyname\\\":\\\"ASEIT\\\",\\\"rolename\\\":\\\"Company Admin\\\",\\\"isprimaryuser\\\":\\\"SecondaryUser\\\",\\\"name\\\":\\\"ADAM M\\\",\\\"emailaddress\\\":\\\"adam@eitworks.com\\\",\\\"id\\\":299,\\\"contactno\\\":\\\"123456789\\\"},{\\\"companyserialid\\\":\\\"12345\\\",\\\"jobtitle\\\":\\\"IT\\\",\\\"companyname\\\":\\\"ASEIT\\\",\\\"rolename\\\":\\\"Company Admin\\\",\\\"isprimaryuser\\\":\\\"PrimaryUser\\\",\\\"name\\\":\\\"ARAVINTH S\\\",\\\"emailaddress\\\":\\\"aravinth@eitworks.com\\\",\\\"id\\\":296,\\\"contactno\\\":\\\"987654321\\\"},{\\\"companyserialid\\\":\\\"12345\\\",\\\"jobtitle\\\":\\\"TEST\\\",\\\"companyname\\\":\\\"ASEIT\\\",\\\"rolename\\\":\\\"Company Admin\\\",\\\"isprimaryuser\\\":\\\"SecondaryUser\\\",\\\"name\\\":\\\"GANESH M\\\",\\\"emailaddress\\\":\\\"ganesh@eitworks.com\\\",\\\"id\\\":300,\\\"contactno\\\":\\\"123456789\\\"},{\\\"companyserialid\\\":\\\"12345\\\",\\\"jobtitle\\\":\\\"IT\\\",\\\"companyname\\\":\\\"ASEIT\\\",\\\"rolename\\\":\\\"Company Admin\\\",\\\"isprimaryuser\\\":\\\"SecondaryUser\\\",\\\"name\\\":\\\"DINESH R\\\",\\\"emailaddress\\\":\\\"dinesh@eitworks.com\\\",\\\"id\\\":301,\\\"contactno\\\":\\\"123456789\\\"}]\",\"Issuing department\":\"GROUNDSIDE DEPARTMENT\",\"Reporter\":\"yhnbgfcv\",\"Time\":\"19:50:02\",\"positions\":\"OFFICER\",\"Document\":\"{\\\"issue1\\\":{\\\"issue1$$1.pdf\\\":\\\"https://goldenelement.s3.ap-southeast-1.amazonaws.com/onboard/20240709001009-07-2024 07:50:26.pdf\\\"}}\",\"Inspected by\":\"MANI  A\",\"Date\":\"2024-07-09\",\"createdtime\":\"2024-07-09T14:20:25\",\"updatedtime\":null,\"companyCorrection\":\"\",\"Company Name\":\"ASEIT\",\"eventdescription\":\"{\\\"issue1\\\":\\\"{\\\\\\\"title\\\\\\\":\\\\\\\"tegfd\\\\\\\",\\\\\\\"type\\\\\\\":\\\\\\\"Vehicle\\\\\\\",\\\\\\\"typeid\\\\\\\":\\\\\\\"thg\\\\\\\",\\\\\\\"description\\\\\\\":\\\\\\\"hgfbvc\\\\\\\",\\\\\\\"issuefile\\\\\\\":\\\\\\\"Inspection-20240705001|issue1.pdf\\\\\\\"}\\\"}\",\"Company Id\":193,\"createdby\":\"Airport Admin\",\"isdraft\":false,\"Inspection Serial Number\":\"20240709001\",\"isdelete\":false,\"Location\":\"24.957343356228662,46.7068059762149\"},{\"Status\":\"Submited\",\"closeinspection\":false,\"updatedby\":null,\"IssuedUser\":\" \",\"Issuing department\":\"Admin For Airport\",\"Reporter\":\"asdfg\",\"Time\":\"16:44:25\",\"positions\":\"Airport Admin\",\"Document\":\"{\\\"issue1\\\":{\\\"issue1$$1.jpg\\\":\\\"https://goldenelement.s3.ap-southeast-1.amazonaws.com/onboard/20240705001005-07-2024 11:15:05.jpg\\\"}}\",\"Inspected by\":\"Airport Admin\",\"Date\":\"2024-07-05\",\"createdtime\":\"2024-07-05T11:14:58\",\"updatedtime\":null,\"companyCorrection\":\"\",\"Company Name\":\"ASEIT\",\"eventdescription\":\"{\\\"issue1\\\":\\\"{\\\\\\\"title\\\\\\\":\\\\\\\"asdfghj\\\\\\\",\\\\\\\"type\\\\\\\":\\\\\\\"Others\\\\\\\",\\\\\\\"typeid\\\\\\\":\\\\\\\"fghjl\\\\\\\",\\\\\\\"description\\\\\\\":\\\\\\\"asdfgh\\\\\\\",\\\\\\\"issuefile\\\\\\\":\\\\\\\"Inspection 1|issue1.jpg\\\\\\\"}\\\"}\",\"Company Id\":193,\"createdby\":\"Airport Admin\",\"isdraft\":false,\"Inspection Serial Number\":\"20240705001\",\"isdelete\":false,\"Location\":\"24.959434643908565,46.70388057937622\"}]",
    "gridwidth": "100%",
    "gridheight": "95%"
  }

}
