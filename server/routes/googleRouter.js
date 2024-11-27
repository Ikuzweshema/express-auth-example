const express=require("express")
const router=express.Router()
const {signIn,handleCallback}=require("../controllers/googleController")

router.get("/sigin",signIn)
router.get("/callback",handleCallback)

module.exports=router