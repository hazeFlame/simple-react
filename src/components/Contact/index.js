import React, { Component } from 'react';
let Noitem = (props) =>{
  return <p>这里什么都没有</p>
}

let Item = (props) =>{
  return <p></p>
}

let Ifnoitem = (props)=>{
  const islength = props.islength;
  if (islength) {
    return <Item />;
  }
  return <Noitem />
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
        <h1>Contact Page</h1>
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
              <button onClick={index => this.removeItems(index) }>删除</button>
            </li>)
          }
        </ul>
      </div>
    )
  }
}

export default Contact;
