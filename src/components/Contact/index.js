import React, { Component } from 'react';

let Ifnoitem = (props)=>{
  const islength = props.islength;
  return islength ? null : ( <p>这里什么都没有</p> )
}

class Contact extends Component {
  constructor(props){
    super();
    this.state = {
      items:["1","2"]
    };
    this.addItems = this.addItems.bind(this)
  }

  addItems(){
    const Arrayitems = this.state.items;
    if (this._inputElement.value) {
      Arrayitems.unshift(
        this._inputElement.value
      );
      this.setState({
        items: Arrayitems
      })
    }
    this._inputElement.value = ''
  }

  removeItems(index){
    const Arrayitems = this.state.items;
    Arrayitems.splice(index,1)
    console.log(index)
    this.setState({
      items: Arrayitems
    })
  }

  render() {
    const items = this.state.items

    return (
      <div className="Contact">
        <form>
          <input
            ref={aaa => this._inputElement = aaa}
            placeholder="enter task" />
          <button type="button" onClick={ this.addItems }>add</button>
        </form>

        <Ifnoitem islength = {items.length} />

        <ul>
          {
            items && items.map((v,index) =>
              <li key={index}>
              {v}
              <button onClick={() => this.removeItems(index) }>删除</button>
            </li>)
          }
        </ul>
      </div>
    )
  }
}

export default Contact;
