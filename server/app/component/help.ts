import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../service/login';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
declare var $: any

@Component({
    templateUrl: "help.html",
    styles:[
        `
       div.row{
           display:flex;
           margin-top:4px;
       }
        `,
        `
       div.col-md-2{
           padding:0;
       }
        `,
        `
        div.form-group label
        {
            display:block;
        }
        `,
        `
        form > button{
            margin-right:10px;
        }
        `,
        `
        div.alert.alert-success
        {
            display:none;
        }
        `
    ]
    // providers:[UserService]
    // styleUrls:[
    //     "http://yui.yahooapis.com/pure/0.6.0/pure-min.css",
    //     "https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css",
    //     "https://cdn.rawgit.com/dwyl/html-form-send-email-via-google-script-without-server/master/style.css"
    // ]
})
export class HelpComponent implements OnInit{
    private user:any;
    private emailForm: FormGroup;
	private name = new FormControl("", Validators.required);
	private message = new FormControl("", Validators.required);
	private address = new FormControl("", Validators.required);

    constructor(private loginService:LoginService
               ,private formBuilder: FormBuilder
               ,private http:Http)
    {
        this.user = loginService.getUser();
    }

    ngOnInit()
    {
        this.emailForm = this.formBuilder.group({
			name: this.name,
			message: this.message,
			address: this.address
		});
    }

    send()
    {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.post("/api/mail",JSON.stringify(this.emailForm.value),{headers:headers})
            .subscribe();
        //
        let x = document.getElementById("alert");
        x.style.display = "block";
        let form1 = this.emailForm;
        // 
        setTimeout(function(){
            x.style.display = "none";
            form1.reset();
        },3000);
    }
}