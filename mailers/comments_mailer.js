const nodeMailer=require('../config/nodemailer');

//this is another way of exporting amethod
exports.newComment=(comment)=>{
    console.log('inside new comment mailer');
    
    nodeMailer.transporter.sendMail({
        from:'ggaappuu1234@gmail.com',
        to:'comment.user.email',
        subject:'new Comment get published ',
        html:'<h1> your comment is  get published ye mail h!!!</h1>'
    },(err,info)=>{
        if(err){
            console.log('error in sending the mail',err);
            return;
        }
        console.log('Message Sent',info);
        return; 
    })
}