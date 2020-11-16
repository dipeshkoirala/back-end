const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {restrict}= require("../middleware/restricted")
const router=express.Router()
//const secret=process.env.JWT_SECRET || "Secret"

// const Users = require("../users/users-model")
const Users = require("../model/user-model")

router.get("/users",/* restrict(), */ async (req, res, next) => {
	try {
		res.json(await Users.find())
	} catch(err) {
		next(err)
	}
})

// console.log(Users)
// const { jwtSecret } = require("../config/secrets")
const { jwtSecret } = require("../config/secret")
// const usersModel=require("../model/user-model")
//const router=express.Router()
// New User
router.post("/register", async (req, res,next) => {
// router.post("/register", async (req, res,next) => {
/* 
try{
    const {name, username,password}=req.body
    const role=req.body.role.toLowerCase();

    if(!username || ! password ||!first_name ||!last_name||!email){
        return res
        .status(409)
        .json({message:"Incomplete information for registration"})
    }
}
// - Request mandatorily requires username, 
password, first_name, last_name, email and type


if(type==="instructor"){
 const user = await usersModel.findByInstructors({ username }).first();
      if (user) {
        return res.status(409).json({ message: "Username must be unique" });
      }

      const newUser = await usersModel.addInstructor({
        
        username: username.toLowerCase(),
        password: await bcryptjs.hash(password, 2),
        first_name: first_name.toLowerCase(),
        last_name:last_name.toLowerCase(),
        email:email.toLowerCase()
      });
      return res.status(201).json(newUser);
    } else if (role === "client") {
      const user = await usersModel.findByClients({ username }).first();

      if (user) {
        return res.status(409).json({ message: "Username must be unique" });
      }

      const newUser = await usersModel.addClient({
        
        username: username.toLowerCase(),
        password: await bcryptjs.hash(password, 2),
        first_name: first_name.toLowerCase(),
        last_name:last_name.toLowerCase(),
        email:email.toLowerCase()
      });

      return res.status(201).json(newUser);
    } else {
      return res
        .status(400)
        .json({ message: "Please pick instructor or client" });
    }
  } catch (err) {
    next(err);
  }
});


*/  


try{
    const { username, password } = req.body
		const user = await Users.findBy({ username }).first()

		if (user) {
			return res.status(409).json({
				message: "Username is already taken",
			})
        }
        
let newUser = req.body
  const hash = bcrypt.hashSync(newUser.password, 8)
  newUser.password = hash
  console.log("The user is:", newUser)
  Users.insert(newUser)
    .then(user => {
      res.status(200).json(user)
    })
    // .catch(err => {
    //   console.log(err)
    //   res.status(500).json({
    //     message: "Failed to add new user", userSent: req.body
    //   })
 } catch(err){
        next(err)
    }
    })


// Login
router.post("/login", async(req,res,next) => {

    try{
  let { username, password } = req.body
  const user = await Users.findBy({ username }).first()
		
				if (!user) {
			return res.status(401).json({
				message: "Invalid Credentials",
			})
		}

//create a var
const passwordValid=await bcrypt.compare(password, user.password)
if(!passwordValid){
	return res.status(401).json({
		msg:"Invalid credentials"
	})
}
Users.findBy({ username })
    .first()
    .then(user => {
      if(user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user)
          res.status(200).json({
            message: `Welcome ${user.username}!`,
            token,
            id: user.id,
            username: user.username
          })
      }
    
    })
}
    catch(err){
    next(err)
}

})

// //creates a new session and send it back to the client
// req.session.user=user
// 		res.json({
// 			message: `Welcome ${user.username}!`,
// 		})
// 	} catch(err) {
// 		next(err)
// 	}
// })

module.exports = router



//   Users.findBy({ username })
//     .first()
//     .then(user => {
//       if(user && bcrypt.compareSync(password, user.password)) {
//         const token = generateToken(user)
//           res.status(200).json({
//             message: `Welcome ${user.username}!`,
//             token,
//             id: user.id,
//             username: user.username
//           })
    //   } else {
    //     res.status(401).json({
    //       message: "Invalid Credentials",
    //     })
    //   }
    // })
    // .catch(err => {
    //   res.status(500).json({
    //     error: "Internal error, cannot log in",
    //   })
    // })

/* 
//Login router
router.post("/login", async (req, res, next) => {
  try {
    const username = req.body.username.toLowerCase();
    const role = req.body.role.toLowerCase();
    const password = req.body.password;

    if (role === "instructor") {
      const user = await usersModel.findByInstructors({ username }).first();

      if (user && (await bcryptjs.compare(password, user.password))) {
        const token = generateToken(user);

        res.status(200).json({ message: `Welcome ${username}`, token });
      } else {
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }
    } else if (role === "client") {
      const user = await usersModel.findByClients({ username }).first();

      if (user && (await bcryptjs.compare(password, user.password))) {
        const token = generateToken(user);

        res.status(200).json({ message: `Welcome ${username}`, token });
      } else {
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }
    }
    next();
  } catch (err) {
    next(err);
  }
});

*/
//logout
/* 

//Logout router Still broken
router.get("/logout", async (req, res, next) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        next(err);
      } else {
        res.status(204).end();
      }
      next();
    });
  } catch (err) {
    next(err);
  }
});
*/

// Generates a token
function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    role: user.role || "user",
  }

  const options = {
    expiresIn: "1h",
  }

  return jwt.sign(payload, jwtSecret, options)
}

module.exports = router

//generate a token

/* 
function generateToken(user) {
  const payload = {
    id: user.id,
    username: user.username,
    role: user.role,
  };

  const options = {
    expiresIn: "1d",
  };

  return jwt.sign(payload, secret, options);
}

module.exports = router;


*/