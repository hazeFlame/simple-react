import { observable, autorun, action } from "mobx";
import { AxiosUserLoginname } from '../api/index'
const StoreUser = observable({
    // observable 属性:
    content:{
        data:[],
        success:null
    },
    count:1,

    // 动作:
    login: action(async function (name) {
      this.content = await AxiosUserLoginname(name)
      console.log(this.content.data)
    }),

    aaa:action(function(){
        this.count = 0
    }),
    
    bbb:action(function(){
        let that = this
        setInterval(function(){
            ++that.count
        },1000)
    })
    
});
export default StoreUser