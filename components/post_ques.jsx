import React, { Component } from 'react';

class PostQues extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title:"Enter Title",
          desc: 'Please enter your description here.....'
        };
    
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
    handleTitleChange(event){
        this.setState({title:event.target.value});
    }
    
    handleChange(event) {
        this.setState({desc: event.target.value});
      }
    
    handleSubmit(event) {
        if(this.state.desc!=='Please enter your description here.....' && this.state.title!=="Enter Title")
        {
            alert('     Question was submitted : \n     Title  :  '+this.state.title+"\n    Description  :  "+this.state.desc);
            event.preventDefault();
            //rest api call to post data.
        }
        else
        {
            alert("Please enter all the fields");
        }
    }

    render() { 
        return ( 
            <div>
            <form>
            <span className="conatiner">
                <input className="form-control mr-sm-2 m-2" type="text"  placeholder={this.state.title}  onChange={this.handleTitleChange}/>
                <textarea className="form-control mr-sm-2 m-2" placeholder={this.state.desc} onChange={this.handleChange} style={{height:200}} /><br/>
                <button className="btn btn-info sm-2 m-2" onClick={this.handleSubmit}>Submit</button>
                </span>
            </form>
            </div>
        );
    }
}
 
export default PostQues;