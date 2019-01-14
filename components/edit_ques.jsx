import React, { Component } from 'react';

class EditQues extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title:this.props.title,
          desc: this.props.description,
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
        if(this.state.desc!=='' && this.state.title!=="")
        {
            event.preventDefault();
            let data ={
                title:this.state.title,
                description:this.state.desc,
            }
            fetch("http://localhost:8080/questions/"+this.props.id,{
                method:'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                mode: "cors",
                body: JSON.stringify(data)
            })
            .then((response)=>{
                if(response.ok)
                {
                    alert("Question Submitted Successfully!");
                    this.props.updateSuccess(true);
                }
                else
                {
                    alert("Error Occured !\nPlease Try Again Later");
                }
            })
            .catch(error => console.log(error));
            
        }
        else
        {
            alert("Please enter all the fields");
            event.preventDefault();
        }
    }
    render() { 
        return ( 
            <div>
            <form>
            <span className="container">
                <input className="form-control mr-sm-2 m-2" type="text"  value={this.state.title}  onChange={this.handleTitleChange}/>
                <textarea className="form-control mr-sm-2 m-2" value={this.state.desc} onChange={this.handleChange} style={{height:200}} /><br/>
                <button className="btn btn-info sm-2 m-2" onClick={this.handleSubmit}>Submit</button>
                </span>
            </form>
            </div>
         );
    }
}
 
export default EditQues;