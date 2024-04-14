const bcrypt = require('bcryptjs');
const User = require('../models/user');

const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        user : 'hitenmistry354@gmail.com',
        pass : 'hmhk rifp ajqa vnia'
    }});


exports.getlogin = ( (req,res,next) => {

    //  const isloggedin = req.get('cookie')
    //  .split(';')[1]
    //  .trim()
    //  .split('=')[1] === 'true';

    //  console.log(isloggedin);
   
     let message = req.flash('error');

     if (message.length > 0)
     {
          message = message[0];
     }
     else
     {
        message = null ;
     }


    res.render('auth/login' , { path : '/login' ,
     pageTitle : 'Login' ,
      isloggedin : req.session.isloggedin
   , errormessage : message  } );
});

exports.postlogin = (req,res,next) => {

     

    User.findOne({ email : req.body.email })
    .then( user => {

        if (!user)
        {
            req.flash('error','Invalid email !!!!')
            return res.redirect('/login');
        }

        bcrypt.compare( req.body.password , user.password)
        .then( match => {

            if (match)
            {
                req.session.user = user;
                req.session.isloggedin = true;
                return req.session.save( err => {
                    console.log(err);
                    res.redirect('/');
                   });
            }
             
         
            req.flash('error',' Invalid password !!!!')
            return res.redirect('/login');

        })
        .catch(err => {
            console.log(err);
           return res.redirect('/login');
        })
    })
    .catch( err => {
        console.log(err);
    })

};

exports.postlogout = (req,res,next) => {

   
    req.session.destroy( (err) => {
        console.log(err);
        res.redirect('/');
    });

};

exports.getsignup = (req,res,next) => {

    let message = req.flash('error');

    console.log(message);

     if (message.length > 0)
     {
          message = message[0];
     }
     else
     {
        message = null ;
     }

    res.render('auth/signup' , { path : '/signup' ,
     pageTitle : 'Signup page' ,
      isloggedin : false ,
     errormessage : message });

};
 
exports.postsignup = (req,res,next) => {

    const email1 = req.body.email;
    const pass1 = req.body.password;
    // const pass2 = req.body.confirmpassword;

    console.log(email1);

    User.findOne({ email : email1 })
    .then( result => {
       if (result)
       { 
        console.log(result);
        req.flash('error', 'email already exists !!!');
        return res.redirect('/signup');
       }

       return bcrypt.hash(pass1,12);
    })
    .then( result => {

        const user = new User({
            email : email1,
            password : result,
            cart : []
           });
    
           return user.save();
    })
    .then( result => {
        var mailoptions = 
            {
                from : 'shop-hiten@gmail.com',
                to : email1,
                subject : 'signup completed nodejs',
                html : '<h1> you sucessfully signed up! </h1>'
             } 

            return transporter.sendMail(mailoptions, function(err,info) {
              if (err)
              {
                console.log(err);
              }
              else
              {
                console.log('email send : ' + info.response);
              }
        })
    })
    .then( result => {
        res.redirect('/login');
    })
    .catch( err => {
        console.log(err);
    })

}