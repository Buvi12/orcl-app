import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { ModalConfig, ModalComponent } from '../../_metronic/partials';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  modalConfig: ModalConfig = {
    modalTitle: 'Modal title',
    dismissButtonLabel: 'Submit',
    closeButtonLabel: 'Cancel'
  };
  ClickedRow:any;
  HighlightRow:Number;
  @ViewChild('modal') private modalComponent: ModalComponent;
  constructor(private httpClient:HttpClient) {
    this.ngOnInit();
    this.ClickedRow = function(index:Number){  
      this.HighlightRow = index;  
  }  
  }

  users_data:any =[]
  users:any =[];
  roles_data:any=[]
  roles:any =[];
  rowclicked:any;

  ngOnInit(){
    this.httpClient.get('assets/data/userResponse.json').subscribe(data =>{
      console.log(data);
      if(data){
        this.users_data =data;
      }
      this.users= this.users_data.Resources;
      console.log(this.users);
    })
    this.httpClient.get('assets/data/rolesResponse.json').subscribe(data =>{
      if(data){
        this.roles_data =data;
      }
    })
  }

  loadData(data:any):any{
    console.log(data); 
    this.roles = this.roles?this.roles=[]:this.roles;
    if(this.rowclicked == data.id){
      this.rowclicked=-1;
    }
    else{
      this.rowclicked=data.id;
    }
    console.log(this.rowclicked  +"----"+ data.id)
    for (let index = 0; index < this.roles_data.Resources.length; index++) {
      // console.log(data.roles[index].id);
      for (let j = 0; j < data.roles.length; j++) {
        // console.log(this.roles_data.Resources[index].id);
        if(data.roles[j].id == this.roles_data.Resources[index].id){
          this.roles_data.Resources[index].available="checked";
          console.log(this.roles_data.Resources[index]);
          break;
        }
      }
    }
    this.roles= this.roles_data.Resources;

    // console.log(this.roles_data.Resources);
  }
  
  async openModal() {
    return await this.modalComponent.open();
  }
}
