import { observable, autorun, action } from "mobx";
import { AxiosUserLoginname } from '../api/index'
const StoreUser = observable({
    // observable 属性:
    content:[],

    // 动作:
    setUserDate: action(async function (name) {
        this.content = await AxiosUserLoginname(name)
        console.log(1)
    })
});
export default StoreUser