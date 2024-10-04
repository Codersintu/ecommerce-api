const jwt = require("jsonwebtoken");

const verifytoken=(req,res,next)=>{
    const authHeader=req.headers.token
    if (authHeader) {
        const token=authHeader.split(" ")[1];
        jwt.verify(token,process.env.JWT_SEC,(err,user)=>{
            if(err) res.status(403).json("token is invalid")
                req.user=user
            next();
        })
    }else(
        res.status(403).json("you are not authnicated")
    )
    
}

const verifyTokenAndAuthorization = (req, res, next) => {
    verifytoken(req, res, () => {
      if (req.user.id === req.params.id || req.user.isAdmin) {
        next();
      } else {
        res.status(403).json("You are not alowed to do that!");
      }
    });
  };

  const verifyTokenAndAdmin = (req, res, next) => {
    verifytoken(req, res, () => {
      if (req.user.isAdmin) {
        next();
      } else {
        res.status(403).json("You are not alowed to do that!");
      }
    });
  };



module.exports={
    verifytoken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin

}


