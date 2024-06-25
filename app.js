const express = require ("express")
const database = require("./database")
const bcrypt = require("bcrypt")

const app = express()
app.use(express.json())
app.use(express.static("static"))

const User = require("./models/User")
const UserRole = require("./models/UserRole")
const Course = require("./models/Course")
const Grade = require("./models/Grade")
const Comment = require("./models/Comment")

UserRole.hasMany(User, { foreignKey:"roleId" })
User.belongsTo(UserRole, { foreignKey:"roleId" })

User.hasMany(Grade, { foreignKey:"userId" })
Grade.belongsTo(User, { foreignKey:"userId" })

User.belongsToMany(Course, { through: "UserCourses" })
Course.belongsToMany(User, { through: "UserCourses" })

Course.hasMany(Grade,{ foreignKey:"courseId" })
Grade.belongsTo(Course,{ foreignKey:"courseId" })

User.hasMany(Comment, { foreignKey:"userId" })
Comment.belongsTo(User, { foreignKey:"userId" })

const authRoute = require("./routes/authRoute")
app.use("/api/auth",  authRoute)

const userRoute = require("./routes/usersRoute")
app.use("/api/users", userRoute)

const coursesRoute = require("./routes/coursesRoute")
app.use("/api/courses", coursesRoute)

const gradesRoute = require("./routes/gradesRoute")
app.use("/api/grades", gradesRoute)

const commentsRoute = require("./routes/commentsRoute")
app.use("/api/comments", commentsRoute)

app.get("/userpanel", (req,res) => {
    res.sendFile("./static/userPanel.html", { root: __dirname })
})

database
    // .sync({ force: true })
    .sync()
    .then(() => {
        console.log("db connected!")

        app.listen(3000, async () => {
            console.log("Serwer port 3000")

            // Utworzyć startowe role
            // - Rola Admin
            // - Rola Student

            let userRoleAdmin = null
            let userRoleStudent = null

            const userRoles = await UserRole.findAll()
            if(userRoles.length == 0)
            {
                userRoleAdmin = await UserRole.create({
                    name: "Admin"
                })
    
                userRoleStudent = await UserRole.create({
                    name: "Student"
                })
            }

            // Użytkownicy startowi 
            // - Administrator
            // - Student - Jan Kowalski

            const users = await User.findAll()
            if(users.length == 0)
            {
                const password = "1234"
                const passwordHash = await bcrypt.hash(password, 10)
    
                await User.create({
                    login: "Administrator",
                    name: "Joanna",
                    surname: "Lak",
                    password: passwordHash,
                    roleId: userRoleAdmin != null ? userRoleAdmin.id : null
                })
    
                await User.create({
                    login: "Student",
                    name: "Jan",
                    surname: "Kowalski",
                    password: passwordHash,
                    roleId: userRoleStudent != null ? userRoleStudent.id : null
                })
            }

           
            // Kursy startowe
            // - Matematyka
            // - Angielski

            const courses = await Course.findAll()
            if(courses.length == 0)
            {
                await Course.create({
                    name: "Matematyka",
                }) 
    
                await Course.create({
                    name: "Angielski"
                })
            }
        })
    })

