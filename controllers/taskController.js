const mysql = require('../database/db')

class MainController {

    async getTasks(req, res) {
        var sql = `CALL SPLoadTasks()`
        mysql.query(sql,(error,data,fields) => {
            if(error) {
                res.status(500)
                res.send(error.message)
            } else {
                console.log(data)
                res.json({
                    data
                })
            }
        })
    }
    async getTask(req , res){
        var sql = `CALL SPLoadTask('${req.params.task_id}')`
        mysql.query(sql, (error,data,fields) => {
            if(error) {
                res.status(500)
                res.send(error.message)
            } else {
                console.log(data)
                res.json({
                    data
                })
            }
        })
    }
    async addTask(req , res){
        console.log(req.body.id)
        if(req.body.id != null && req.body.task != null && req.body.category_id != null && req.body.priority_id != null && req.body.is_completed != null  && req.body.date_created != null  && req.body.due_date != null) {
            let task = req.body;
            var sql = `CALL SPAddTask('${task.id}','${task.task}','${task.category_id}','${task.priority_id}',${task.is_completed},'${task.date_created}','${task.due_date}')`
            mysql.query(sql, (error,data,fields) => {
                if(error) {
                    res.status(500)
                    res.send(error.message)
                } else {
                    console.log(data)
                    res.json({
                        status: 200,
                        message: "Task inserted successfully",
                        affectedRows: data.affectedRows
                    })
                }
            })
        } else {
          res.send('Por favor llena todos los datos!')
        }
    }
    async updateTask(req, res){
        console.log(req.params.id)
        if(req.params.id != null && req.body.task != null && req.body.category_id != null && req.body.priority_id != null && req.body.is_completed != null  && req.body.date_created != null  && req.body.due_date != null) {
            let task = req.body;
            var sql = `CALL SPUpdateTask('${req.params.id}','${task.task}','${task.category_id}','${task.priority_id}',${task.is_completed},'${task.date_created}','${task.due_date}')`
            mysql.query(sql, (error,data,fields) => {
                if(error) {
                    res.status(500)
                    res.send(error.message)
                } else {
                    console.log(data)
                    res.json({
                        status: 200,
                        message: "Task updates successfully",
                        affectedRows: data.affectedRows
                    })
                }
            })
        } else {
          res.send('Por favor llena todos los datos!')
        }
    }
    async deleteTask(req ,res){
        console.log(req.params.id)
        var sql = `CALL SPDeleteTask('${req.params.id}')`
      mysql.query(sql,(error,data,fields) => {    
            if(error) {
                res.status(500)
                res.send(error.message)
            } else {
                console.log(data)
                res.json({
                    status: 200,
                    message: "Task deleted successfully",
                    affectedRows: data.affectedRows
                })
            }
        })
    }
}

const taskController = new MainController()
module.exports = taskController;