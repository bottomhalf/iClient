import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { CommonService } from "./common-service/common.service";

const NAVPARAMNAME = "navigation_parameter";
@Injectable()
export class iNavigation {
  constructor(private route: Router, private common: CommonService) {}

  public navigate(Path: string, Parameter: any) {
    if (Path !== null && Path !== "") {
      if (Parameter !== null && Parameter !== "") {
        localStorage.setItem(NAVPARAMNAME, JSON.stringify(Parameter));
      }
      this.route.navigate([Path]);
    } else {
      this.common.ShowToast("Invalid component path passed.");
    }
  }

  public getValue(): any {
    let ParsedData = null;
    let Data = localStorage.getItem(NAVPARAMNAME);
    if (this.common.IsValid(Data)) {
      try {
        ParsedData = JSON.parse(Data);
      } catch (e) {
        console.log(JSON.stringify(e));
        this.common.ShowToast(
          "Unable to get route data. Please contact admin."
        );
      }
    }
    return ParsedData;
  }

  public resetValue() {
    localStorage.removeItem(NAVPARAMNAME);
  }
}
