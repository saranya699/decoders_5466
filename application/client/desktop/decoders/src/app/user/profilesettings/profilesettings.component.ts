import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profilesettings',
  templateUrl: './profilesettings.component.html',
  styleUrls: ['./profilesettings.component.scss']
})
export class ProfilesettingsComponent implements OnInit {
  

  constructor(private router: ActivatedRoute, private profileservice: UserService, private route: Router) { }
  public datas:any
  public value:any
  public values:any
  public data:any;
  public id: any;
  public x:any;
  public Userobject = {
    'firstname': '',
    'lastname': '',
    'email': '',
    'password': '',
    'role': {},
    'id': '',
    'username': '',
    'image': '',
  };
  public userDefault = {
    'firstname': '',
    'lastname': '',
    'email': '',
    'password': '',
    'role': {},
    'id': '',
    'username': '',
    'image': '',
  };
  public roles: any[] = [];
  public rolechange: any;
  public defaultUserRole: any;
  public defaultRole!: {};
  public save:any;
  public  updaterole:any;

  ngOnInit() {
    this.Queryparams();
  }

  Queryparams() {
    this.router.queryParams.subscribe(params => {
      this.id = params['id'];
      this.data = params['data'];
      this.datas = params['datas'];
      this.value = params['value'];
      this.values = params['values']
    });
    this.Userdetails();
  }

  Userdetails() {
    console.log("eeee--->",this.id);
    this.profileservice.Getuser(this.id).subscribe(data => {
      console.log("ss--->",data);
      this.defaultRole = data.role.role;
      console.log("userdefaulttt------>>>",this.defaultRole)
      const user = data;
      console.log("user--->",user);
      this.Userobject.firstname = user.firstname;
      this.Userobject.lastname = user.lastname;
      this.Userobject.email = user.email;
      this.Userobject.username = user.username;
      this.Userobject.role = user.role.role;
      console.log(user.role.role);
      this.Userobject.password = user.password;
      this.Userobject.image = user.image;

      this.profileservice.Getroles().subscribe(roledata => {
        console.log("this.roles-->",roledata)
        this.roles = roledata;
        console.log('this.roles',this.roles);
        this.defaultUserRole = this.Userobject.role;
         console.log('-------roles---11111-->>>>', this.Userobject.role);
        const index = this.roles.findIndex(x => x.role === this.Userobject.role);
      }, error => {
        console.error('error:', error);
      });
    }, error => {
      console.error('error:', error);
     }
     );
  }

  onChange(event:any) {
    this.rolechange = '';
     console.log('selected  event---->>>', event.target.value,this.roles);
     const updaterole = this.roles.find(x => x.role ===  event.target.value);
     console.log('------roledetails---->>>>', updaterole);
    //  const data = updaterole.role;
     console.log("data--->",updaterole);
    this.rolechange = updaterole;
  }
  cancle() {
    this.route.navigate(['usermanagement'])
  }

  Updateuser() {
    this.Userobject.role = this.rolechange.role;
    console.log("this-->", this.Userobject.role);
    this.Userobject.id = this.id;
    console.log("userobject--->",this.Userobject.id);
    this.Userobject.firstname = this.data;
    this.Userobject.lastname = this.datas;
    this.Userobject.email = this.value;
    this.Userobject.username = this.Userobject.email;
    console.log("user--->",this.Userobject.username);
    const userRole = sessionStorage.getItem('Access');
    console.log("userRole---->",sessionStorage.getItem('Access'))

    if (this.Userobject.role === null || this.Userobject.role === undefined) {
      // console.log('ifcondtion---->>>>>', this.defaultRole);
      this.userDefault.firstname = this.Userobject.firstname;
      console.log("userdefault--->",this.userDefault.firstname);
      this.userDefault.lastname = this.Userobject.lastname;
      this.userDefault.email = this.Userobject.email;
      this.userDefault.role = this.defaultRole;
      console.log("this.defaultRole-->",this.userDefault.role);
      this.userDefault.id = this.Userobject.id;
      console.log("userdetails--->",this.userDefault.id);
      this.userDefault.image = this.Userobject.image;
      console.log("userdetails--->",this.userDefault.id);
      this.userDefault.username = this.Userobject.username;
      this.profileservice.Updateuser(this.userDefault).subscribe(data => {
        console.log("this.userdefault--->",this.userDefault);
        console.log("data--->",data);
         this.route.navigate(['usermanagement']);
      }, error => {
        console.error('error:', error);
      });
    } else{
      console.log(this.Userobject);
      this.profileservice.Updateuser(this.Userobject).subscribe(data => {
        console.log("userObject-->",this.Userobject)
        console.log("updateuser---->",data);
         this.route.navigate(['usermanagement']);
      }, error => {
        console.error('error:', error);
      });
    }
  }
  }

