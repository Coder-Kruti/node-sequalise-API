 module.exports = (sequelize, DataTypes) =>{
    const HouseTable = sequelize.define("houseTable", {
        // id:{
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     primaryKey: true

        // },
        address:{
            type: DataTypes.TEXT,
            allowNull: false
        },
        currentValue:{
            type: DataTypes.FLOAT,
            allowNull: false
        },
        loanAmount:{
            type: DataTypes.FLOAT,
            allowNull: false
        },
        risk:{
             type: DataTypes.FLOAT 
        }
    })
    return HouseTable
    
 }