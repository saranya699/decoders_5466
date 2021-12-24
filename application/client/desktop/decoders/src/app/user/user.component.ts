import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin/admin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ButtonRendererComponent } from './button-renderer/button-renderer.component';
// import { ImageFormatterComponent } from "./Imageformatter/ImageFormatterComponent";
 import { UserService } from './user.service';
import { LoginService } from '../login/login.service';
import { SharedService } from 'src/shared/shared.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {


  constructor(private route: Router, private router: ActivatedRoute, private adminservice: AdminService,private loginservice: LoginService,private sharedService: SharedService,private userService: UserService) {
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
    };

  }
  public url:any
  public selectedFiles:any ; 
  public choosed_status:boolean=false;
  public upload_status:boolean=false;
  public currentFileUpload:any;
  public titleSelected:any;
  public dynamic_Ipdata:any;
  public img :any;
  public agImg:any;
  public rowData:any;
  public columnDefs:any;
  public gridApi:any;
  public gridColumnApi:any;
  public Userdetails:any;
  public submit:any;
  public dataToSave:any;
  public Userobject = {
    'firstname': '',
    'lastname': '',
    'email': '',
    'password': '',
    'role': {},
    'id': '',
    'username': '',
    'avatar': ''
  };
  defaultColDef!: { editable: boolean; sortable: boolean; filter: boolean; };
  frameworkComponents: { buttonRenderer: any; };

  ngOnInit() {

    this.agGridInitialization();
  }

  Users() {
    this.adminservice.Getallusers().subscribe(data => {
      console.log("data",data);
      this.rowData = data;
      this.Userdetails = data;
      // this.agImg = data.;
      // console.log("agImg--->",this.agImg)
       console.log("eee--->",this.Userdetails);
    }, error => {
      console.error('error:', error);
    });
  }
 

  agGridInitialization() {

    this.columnDefs = [
      {
        headerName: 'Firstname',
        field: 'firstname',
        width: 250,
      },
      {
        headerName: 'Lastname',
        field: 'lastname',
        width: 250,
      },
      {
        headerName: 'Username',
        field: 'username',
        width: 250,
      },
      {
        headerName: 'Email',
        field: 'email',
        width: 250
      },
      {
        headerName: 'Role',
        field: 'role.role',
        width: 250
      },
      {
        headerName: 'id',
        field: '_id',
        width: 250
      },
      {
        headerName: 'Action',
        width: 100,
        cellRenderer: 'buttonRenderer',
        editable: false,
        sortable: false,
        filter: false,
        cellRendererParams: {
          onClick: this.Editaction.bind(this),
          label: 'Edit'
        }
      },
      {
        headerName: 'Delete',
        width: 100,
        cellRenderer: 'buttonRenderer',
        editable: false,
        sortable: false,
        filter: false,
        cellRendererParams: {
          onClick: this.onDeleteButtonClick.bind(this),
          label: 'Delete',
        },
      },
      { 
      headerName: 'Picture',
      field: 'avatar',  
      width: 100,
      sortable: true,
      filter: false, 
      autoHeight: true,
      // cellRenderer: ({  }) => `<img style="height: 14px; width: 14px" src="" />`
    }
    ];
    this.Users();
  }

  // imageCellRenderer() {
  //   return `<img alt="" [src]="">`;
  // }

  adduser(){
    console.log("this-->",this.Userobject);
    const dataToSave = {
      'firstname': this.Userobject.firstname,
      'lastname': this.Userobject.lastname,
      'email': this.Userobject.email,
      'password': this.Userobject.password,
      'role': this.Userobject.role,
      'id': this.Userobject.id,
      'username': this.Userobject.username,
      'avatar': this.img
    }
    console.log("USER-->",dataToSave);
    this.loginservice.signup(dataToSave).subscribe(response => {
      console.log("data",response);
        window.location.reload();
    }, error => {
      console.error('error:', error);
    });
     this.ngOnInit()
  
}
  
  onGridReady(params:any) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
    this.gridColumnApi = params.columnApi;
  }

  Editaction(e:any) {
    const rows = e.rowData;
    console.log("rows===================",rows);
    console.log('selectedrow------->>>',{ queryParams: { id: rows._id ,data:rows.firstname,datas:rows.lastname,value:rows.email,values:rows.role.role,image:rows.image} });
   // this.route.navigate(['profile'], { queryParams: { id: rows._id } });
    this.route.navigate(['profile'], { queryParams: { id: rows._id ,data:rows.firstname,datas:rows.lastname,value:rows.email,values:rows.role.role,image:rows.image} });
  }
  onDeleteButtonClick(e:any){
    if (confirm('Are you sure you want to delete this?')) {
      const rows = e.rowData;
      console.log("datas",rows);
      console.log("da",rows._id);
    this.userService.deleteUser(rows._id).subscribe(response => {
      console.log("data",response);
    }, error => {
      console.error('error:', error);
    });
    location.reload();
    }
    }
    onFileSelected(event:any) {
      this.selectedFiles = event.target.files;
      this.currentFileUpload = this.selectedFiles.item(0);
      console.log("currentFileUpload",this.currentFileUpload);
      this.gepfileToUpload(this.currentFileUpload);
    }
    
  //gepfilemanager
    public resultId: any;
    gepfileToUpload(fileToUpload: File){
    const endpoint = this.loginservice.uploadImgFile();
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    console.log('fileToUpload +++', formData);
    fetch(endpoint, {
        method: 'POST',
        body: formData
    }).then( res => res.json()
    
    ).then((resultData) => {
      console.log("resultData--->",resultData);
       console.log("resp",`${this.sharedService.GEPFILE_API}/${resultData}`);
        let dynamic_Ipdata = `${this.sharedService.GEPFILE_API}/${resultData}`;
        this.img = dynamic_Ipdata;
    })
}
  }
  
  
    
  

