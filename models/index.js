var Sequelize = require('sequelize');

//add second arg {logging: false} if logging is annoying
var db = new Sequelize('postgres://localhost:5432/wikistack', {logging: false});

 var Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    urlTitle: {
        type: Sequelize.STRING,
        allowNull: false,
        get: function(){
            return '\\wiki\\' + this.getDataValue('urlTitle');
        }
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed')
    },
    date: {
        type: Sequelize.DATE,
        isDate: true,
        defaultValue: Sequelize.NOW
    }
});

var User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        isEmail: true,
        allowNull: false
    }
});

module.exports = {
  Page: Page,
  User: User
};
