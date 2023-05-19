const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const bodyparser = require("body-parser");
const database = require("mysql");
const schedule = require("node-schedule");
const mail_schedule = require("nodemailer");
const util=require("util");
const {application, request, response}= require('express');

const add = express();
add.use(cors());
add.use(fileUpload());
add.use(bodyparser.json());
add.use(express.json());
add.use(express.static('public'));

let a = database.createConnection({
    host: "localhost",
    user: "root",
    password: "6380804401",
    database: "football_club"
});

a.connect(function(error) {
    if(error) {
        console.log(error);
    } else {
        console.log("db connected");
    }
})

add.listen(130, () => {
    console.log("server is running on 130 port")
})

// add.get ('/userList',(request,response)=>{
//     a.query('select id, name, age from demo_table',
//     (error,result)=>{
//         if(error){
//             console.log(error)
//         }
//         else{
//             response.send(result)
//         }
//     })
// })

// add.post('/insertadd',(request,response)=>{
//     try{
//     console.log(JSON.stringify(request.body));
//     let {id, name, age}=request.body;
//     if(id!=null&&name!=null&&age!=null){
//     let sql='insert into demo_table(id,name,age) values(?,?,?)';
//     a.query(sql,[id, name, age],(error,result)=>{
//         if(error){
//             let s={"status":"error"};
//             response.send(s);
//             console.log(error);
//         }
//         else{
//             let s={"status":"success"};
//             response.send(s);
//         }
//     }) }else{
//         let s={"status":"InvalidData"};
//         response.send(s);
//     }
// }catch(e){
//     response.send(e);
// }
// })

// add.get("/userlist/:id",(request,response)=>
// {
//     try{
//         console.log(request.params);
//     }catch(e){
//         response.send(e);
//     }
// })

// add.get ('/scheduleJob',(request,response)=>{
//   try{
//     try{
//         console.log("Success");
//        const job=schedule.scheduleJob('5 * * * * *', ()=> {
//             console.log(new Date());
//         })
//         response.send("Working SuccessFully");
//     }catch(app_error){

//     }

//   }catch(system_error){
//     response.send(system_error);

//   }

// })

    //  SignUp Api Details

    
 add.post('/add', (request, response) => {
    try {
        console.log(JSON.stringify(request.body));
        let { first_name, last_name, gender, dob, email, phone_number, password,status,effective_from,effective_to,created_by,created_on,modified_by,modified_on} = request.body;
        const id = Math.floor(Math.random() * 1000) + 1;
        if (id != null && first_name != null && last_name != null && email != null && phone_number != null && password != null) {
            let sql = 'insert into user_login (id,first_name,last_name,gender,dob,email,phone_number,password,status,effective_from,effective_to,created_by,created_on,modified_by,modified_on) values(?,?,?,?,?,?,?,?,?,current_timestamp(),current_timestamp()+interval 3 year,current_user(),current_timestamp(),?,?)';
            a.query(sql, [id, first_name, last_name, gender, dob, email, phone_number, password,"A",effective_from,effective_to,created_by,created_on,modified_by,modified_on ], (error, result) => {
                if (error) {
                    let s = { "status": "error" };
                    response.send(s);
                    console.log(error);
                } else {
                    let s = { "status": "success" };
                    response.send(s);
                }
            })
        } else {
            let s = { "status": "InvalidData" };
            response.send(s);
        }
    } catch (e) {
        response.send(e);
    }
})


    //Login Api

    add.post("/login", (request, response) => {

    const { email, password } = request.body;
    const sql = "SELECT * FROM user_login WHERE email = ? and status='A'";
    a.query(sql, [email], (error, results) => {
        if (error) {
            console.log(error);
            const a = { status: "error" };
            response.send(a);
        } else {
            if (results.length > 0) {
                const user = results[0];
                if (user.password === password) {
                    // Login successful
                    const a = { status: "success", userId: user.id };
                    response.send(a);
                    console.log(a);
                    console.log("Login successful!");
                } else {
                    // Incorrect password
                    const a = { status: "error", message: "Incorrect password" };
                    response.send(a);
                }
            } else {
                // User not found
                const a = { status: "error", message: "User not found" };
                response.send(a);
            }
        }
    });
});

        //Football_Format Post Api

             add.post('/formatInsert', (request, response) => {
            try {
                console.log(JSON.stringify(request.body));
                let {format_name, format_desc, format_url, status, effective_from, effective_to, created_by, created_on, modified_by, modified_on } = request.body;
            
                if (format_name != null) {
                    let sql = 'insert into football_format(format_name,format_desc,format_url,status,effective_from,effective_to,created_by,created_on,modified_by,modified_on) values(?,?,?,?,current_timestamp(),current_timestamp()+interval 3 year,current_user(),current_timestamp(),?,?)';
                    a.query(sql, [ format_name, format_desc, format_url,"A", effective_from, effective_to, created_by, created_on, modified_by, modified_on ], (error, result) => {
                        if (error) {
                            let s = { "status": "error" };
                            response.send(s);
                            console.log(error);
                        } else {
                            let s = { "status": "success" };
                            response.send(s);
                        }
                    })
                     } else {
                    let s = { "status": "InvalidData" };
                    response.send(s);
                }
            } catch (e) {
                response.send(e);
            }
        })

    //Football_format get API

        add.get('/formatGet', (request, response) => {
            try{
            // console.log(request);
            try{
            
                a.query('select format_name,format_desc,format_url from football_format where status="A"', (error, result) => {
                    if (error) {
                        console.log(error);
                    } else {
                        // console.log(result);
                    response.send(result);
                    }
                })       
            }catch (apperror) {
                response.send(apperror);
                response.send("Status: success");
            }
            }catch (systemerror) {
                response.send(systemerror);
            }
            });

            //Football teamINsert Api

            add.post('/teamInsert', (request, response) => {
                try {
                    console.log(JSON.stringify(request.body));
                    let {country_code,country_name,country_url,country_desc,country_format, status, effective_from, effective_to, created_by, created_on, modified_by, modified_on } = request.body;
                   
                    if (country_name != null) {
                        let sql = 'insert into football_team(country_code,country_name,country_url,country_desc,country_format,status,effective_from,effective_to,created_by,created_on,modified_by,modified_on) values(?,?,?,?,?,?,current_timestamp(),current_timestamp()+interval 3 year,current_user(),current_timestamp(),?,?)';
                        a.query(sql, [country_code, country_name,country_url,country_desc,country_format,"A", effective_from, effective_to, created_by, created_on, modified_by, modified_on ], (error, result) => {
                            if (error) {
                                let s = { "status": "error" };
                                response.send(s);
                                console.log(error);
                            } else {
                                let s = { "status": "success" };
                                response.send(s);
                            }
                        })
                    } else {
                        let s = { "status": "InvalidData" };
                        response.send(s);
                    }
                } catch (e) {
                    response.send(e);
                }
            })
            
            
            //Football teamGet API

            add.get('/teamGet/:country_format', (request, response) => {
                try{
                // console.log(request);
                try{
                  let{country_format}=request.params
                  let sql= 'select country_code,country_name,country_url ,country_desc,country_format from football_team where status="A" and country_format=?';
                    a.query(sql,[country_format], (error, result) => {
                    if (error) {
                            console.log(error);
                        } else {
                            // console.log(result);
                           response.send(result);
                        }
                    });       
                }catch (apperror) {
                    response.send(apperror);
                    response.send("Status: success");
                }
                }catch (systemerror) {
                    response.send(systemerror);
                }
                });

        //Football players insert API

        add.post('/playerInsert',(request,response)=>{
            try{
                console.log(request);
                try{
                    console.log(JSON.stringify(request.body));
                    let{player_id,country_code,country_flag,player_format,player_name,player_rank,player_image,age,status, effective_from, effective_to, created_by, created_on, modified_by, modified_on}=request.body;
                    if(player_name!=null){
                        let sql = 'insert into football_players(player_id,country_code,country_flag,player_format,player_name,player_rank,player_image,age,status,effective_from,effective_to,created_by,created_on,modified_by,modified_on) values(?,?,?,?,?,?,?,?,?,current_timestamp(),current_timestamp()+interval 3 year,current_user(),current_timestamp(),?,?)';
                    a.query(sql, [player_id,country_code, country_flag,player_format,player_name,player_rank,player_image,age,"A", effective_from, effective_to, created_by, created_on, modified_by, modified_on], (error, result) => {
                        if (error) {
                            let s = { "status": "error" };
                            response.send(s);
                            console.log(error);
                        } else {
                            let s = { "status": "success" };
                            response.send(s);
                            console.log(result);
                        }
                    })
                    }else {
                    let s = { "status": "InvalidData" };
                    response.send(s);
                }

                }catch (apperror) {
                response.send(apperror);
                // response.send("Status: success");
            }
            }catch (systemerror) {
                response.send(systemerror);
            }
        });

    //Football players get API

        add.get('/playerGet/:player_format/:country_code',(request,response)=>{
        try{
            console.log(request.params);
            try{
                let{player_format,country_code}=request.params
            let sql= 'select player_id,country_code,country_flag,player_format,player_name,player_rank,player_image,age from football_players where status="A" and player_format=? and  country_code=?';
                    a.query(sql,[player_format,country_code],(error,result)=>{ 
                    if(error){
                    let e= {'status':'error'}
                    response.send(e);
                    console.log(e);
                    }else{
                        // let s={'status':'success'}      
                        // response.send(s);
                        response.send(result)
                    }
                });
                
            }catch (apperror) {
                response.send(apperror);
                response.send("Status: success");
            }
            
        }catch (systemerror) {
            response.send(systemerror);
        }
        });
            // add.get("/getSports/:userName/:gender",(req, res) => {
            //     try {
            //         try {
            //             let {userName, gender} = req.params
            //             console.log(req.params);
            //             let Sql_Query = 'select first_name, last_name, gender, dob,phone_number from user_login  where first_name = ? and gender = ? and status = "A"'
            //             a.query(Sql_Query, [userName, gender], (err, result) => {
            //                 console.log(result);
            //                 res.send({msg: 'success', data: result});
            //             })
                        
            //         } catch(app_error) {
            //             res.send(app_error)
            //         }
            //     } catch(system_error) {
            //         res.send(system_error)
            //     }
            // })


// function send_mail() {
//     try {
//     var transports;
//     var transports = mail_schedule.createTransport({
//         host:"localhost:120",
//         port:587,
//         secure: false,
//         auth: {
//             user: 'sanjayofficial2001@gmail.com',
//             pass:'sanjayravikumar'
//         },
//         tls: {
//             rejectUnauthorized: true,
//             minVersion: "TLSv1.2"
//         },
//     })
//     if(transports){
//         var templateMessage = "welcome";
//         var msg = util.format(templateMessage,"Helloooo");
//         var mailOptions = {
//             from: 'sanjayofficial2001@gmail.com',
//             to: 'samuvelananthtiraviam@gmail.com',
//             subject: "subject",
//             text: msg
//         };

//         transports.sendMail(mailOptions,(error,info)=>{
//             if (error) {
//                 console.log("Unable to send Email: ", "subject", ":",error);
//             }else {
//                 console.log(info);
//             }
//         });
//     }else{
//         console.log("Email is switched Off. Email Not sent with Subject [", "subject" , "]");
//     }
// } catch (error) {
//         console.log(error);
// }
// }
// send_mail();
