
module.exports=(req,res,next)=>{
    
    if(req.user)
    {   
        res.locals.isAuthenticalted=true;
        res.locals.authUser=req.user;
        console.log(res);
    }
    next();
}