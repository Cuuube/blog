const db = require('./db.js');
const Cat = db.createModel('Cat', {
    name: 'string'
});
db.add(new Cat({
    name: "Hua hua"
}));
// db.find(Cat).then((data)=>{
//     console.log(data);
// })
Cat.findOne({name: 'Hua hua'}, (err, data)=>{
    console.log(data);
})
// find findOne Model.findById、Model.where、Model.$where
// Cat.statics.findAllWithCreditCookies = fn(callback){dosth}


// 更新 Cat.update(查询条件,更新对象,callback);
/*
var conditions = {name : 'zfpx'};  var update = {$set : { age : 100 }};
  PersonModel.update(conditions, update, function(error){   
     if(error) {     
          console.log(error);
      } else {     
           console.log('Update success!');
        }
    });
*/

// 删除 Model.remove(查询条件,callback);
/*
代码

var conditions = { name: 'zfpx' };
PersonModel.remove(conditions, function(error){  
  if(error) {    
        console.log(error);
    } else {    
        console.log('Delete success!');
    }
});
*/