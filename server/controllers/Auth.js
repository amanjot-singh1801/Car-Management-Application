const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async(req,res)=>{
    try{
        const {name,email,password} = req.body;
        if(!name || !password || !email){
            return res.status(403).send({
                success:false,
                message:"All fields required",
            })
        }

        // check if user already present 
        const existingUser = await User.findOne({email});
         
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:'User already Exist, Please Sign to Continue',
            })
        } 

        const hashedPassword = await bcrypt.hash(password, 10);
        // console.log(hashedPassword);

        const newUser = await User.create( {
            name,
            email,
            password:hashedPassword
        });

        return res.status(200).json({
            success:true,
            message:"User register Successfully",
            user:newUser
        })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message: "User cannot be registered. Please try again.",
        })
    }
}

exports.login = async(req,res) =>{
    try{
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"All Fields required"
            })
        }

        // check user is already register or not 
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success: false,
                message: `User is not Registered with Us Please Login to Continue`,
            });
        }

        if(await bcrypt.compare(password,user.password)){
            const token = jwt.sign(
                { email: user.email, id: user._id},
                process.env.JWT_SECRET,
                {
                    expiresIn: "24h",
                }
            );

            user.token = token;
            user.password = undefined;
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: `User Login Success`,
            });
        }
        else{
            return res.status(401).json({
                success: false,
                message: `Password is incorrect`,
            });
        }
    }catch(error){
        console.error(error);
		// Return 500 Internal Server Error status code with error message
		return res.status(500).json({
			success: false,
			message: `Login Failure Please Try Again`,
		});
    }
    
}