import { Component } from "@angular/core";
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  constructor(
    private barcodeScanner: BarcodeScanner,
    private http: HttpClient
  ) {
    // this.getData();
    this.startScan();
  }

  data: any = {
    aliCancel: "",
    ename: "",
    fname: "",
    lname: "",
    masterCode: "",
    masterName: "",
    pid: "",
    provinceNameReport: "",
    return: "",
    tlAuto: "",
    tlDateInform: "", // 2019-04-30T00:00:00.000+07:00
    tlDateWork: "",
    tlTid: "",
    tltype: ""
  };

  status = {
    EN: "นายจ้างแจ้งเข้าสำเร็จ",
    AN: "คนต่างด้าวแจ้งเข้าสำเร็จ",
    EO: "นายจ้างแจ้งออกสำเร็จ"
  };

  laborStatus = {
    "": "ปกติ",
    C: "ถูกเพิกถอนใบอนุญาต"
  };

  onLoading = false;
  isScanned = false;

  startScan() {
    this.isScanned = false;
    this.barcodeScanner
      .scan()
      .then(barcodeData => {
        // console.log(barcodeData);
        this.getData(barcodeData.text);
        console.log(this.data);
        this.isScanned = true;
        // this.startScan();
      })
      .catch(err => {
        this.isScanned = true;
        console.log("Error", err);
      });
  }

  getData(id) {
    this.onLoading = true;
    this.http
      .post("http://122.155.84.131/doe/doefilealien/selectcheckinformmobile", {
        apikey: "ebefb44c35628c26848b6d71993994470fa24cff",
        informid: id
      })
      .subscribe(
        data => {
          this.data = data;
          this.onLoading = false;
        },
        error => {
          this.onLoading = false;
          console.log(error);
        }
      );
  }
}
