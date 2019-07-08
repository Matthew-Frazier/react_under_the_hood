class App extends React.Component {
  constructor(props) {
    super(props);

    this.state={
      list: [
        { id: 1, title: "Buy milk", complete: false, },
        { id: 2, title: "Buy eggs", complete: true, },
        { id: 3, title: "Buy cheese", complete: false, },
      ],
    };
    this.addItem = this.addItem.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
  };

  getUniqueId() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  addItem(item) {
    this.setState( prevState => {
      return {
        list: prevState.list.concat({ id: this.getUniqueId(), title: item, }),
      };
    });

    // // setting state can be done this way as well
    // this.setState({ list: [ ...this.state.list, { id: this.getUniqueId(), title: item, } ] })
  };

  handleComplete(id) {
    const list = this.state.list.map( item => {
      if (item.id === id)
        return { ...item, complete: !item.complete, };
      return item;
    });
    this.setState({ list, });
  };

  render() {
    //____________________________________________________________________
    return React.createElement("div", null, [
      React.createElement(ItemForm, { key: "item-form", addItem: this.addItem, }),
      React.createElement(
        TodoList,
        {
          key: "item-list",
          list: this.state.list,
          handleComplete: this.handleComplete,
        }
      )
    ]);

    // // this is what is happening behind the scenes
    // return (
    //   <div>
    //     <ItemForm />
    //     <TodoList list={this.state.list} />
    //   </div>
    // )
    //_______________________________________________________________________


    //_______________________________________________________________________
    // return React.createElement(
    //   "h1",
    //   { className: "foo", },
    //   "Render this element!"
    // );

    // // this is what is happening behind the scenes
    //  return <h1 className="foo">Render this element!</h1>
    //_______________________________________________________________________
  };
};

class ItemForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { title: "", };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  };

  handleSubmit(e) {
    e.preventDefault();
    this.props.addItem(this.state.title);
    this.setState({ title: "", });
  };

  handleChange(e) {
    this.setState({ title: e.target.value, });
  };

  render() {
    return React.createElement(
      "form",
      { onSubmit: this.handleSubmit, },
      React.createElement(
        "input",
        { 
          onChange: this.handleChange,
          value: this.state.title,
          name: "title",
          placeholder: "Add an item",
        },
      )
    );

    // this is what is happening behind the scenes
    // return (
    //   <form onSubmit={this.handleSubmit}>
    //     <input 
    //       onChange={this.handleChange}
    //       value={this.state.title}
    //       name="title"
    //       placeholder="Add an item"
    //     />
    //   </form>
    // )
  };
};

const Item = ({ id, title, complete, handleComplete, }) => {
  return React.createElement(
    "li",
    { 
      style: {
      textDecoration: complete && "line-through",
      color: complete && "grey",
      },
      onClick: () => handleComplete(id),
    },
    title
  );
  
  // // this is what is happening behind the scenes
  // return (
  //   <li style={this.liStyle} onClick={ handleComplete(id) }>
  //     { this.item.title }
  //   </li>
  // );

  // const liStyle = () =>  {
  //   const textDecoration = complete && "line-through";
  //   const color = complete && "grey";
  // };
};

const TodoList = ({ list, handleComplete, }) => {
  return React.createElement(
    "ul",
    { key: "list", },
    list.map( item => {
      return React.createElement(
        Item,
        {
          key: item.id,
          id: item.id,
          title: item.title,
          complete: item.complete,
          handleComplete: handleComplete,
        }
      );
    })
  );

  // // this is what is happening behind this scenes
  // return (
  //   <ul>
  //     list.map( item => {
  //       <Item 
  //         key={ this.item.id }
  //         id={ this.item.id }
  //         title={ this.item.title }
  //         complete={ this.item.complete }
  //         handleComplete={ handleComplete }
  //       />
  //     })
  //   </ul>
  // );
};

ReactDOM.render(
  React.createElement(App),
  document.getElementById("root")
);