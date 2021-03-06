import React, { Component } from 'react';

class AnswerForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
          text: 'Please enter your answer here.....'
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

    handleChange(event) {
        this.setState({text: event.target.value});
      }
    
    handleSubmit(event) {
        if(this.state.text!=='Please enter your answer here.....'&&this.state.text!=='')
        {
            event.preventDefault();
            let data ={
                text:this.state.text,
            }
            fetch("http://localhost:8080/questions/"+this.props.id+"/answers",{
                method:'POST',
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
                    alert("     Answer Submitted Successfully!");
                    this.props.updateSuccess(true);
                }
                else
                {
                    alert("     An error occurred !\n    Please try again later");
                }
            })
            .catch(error => console.log(error));
            
        }
        else
        {
            alert("     Please enter an answer before submitting!");
            event.preventDefault();
        }
    }

    render() { 
        console.log(this.props.id);
        return (<div>
            <form>
            <span className="container">
                <textarea className="form-control mr-sm-2 m-2" placeholder={this.state.text} onChange={this.handleChange} style={{height:200}} /><br/>
                <button className="btn btn-info sm-2 m-2" onClick={this.handleSubmit}>Submit</button>
                </span>
            </form>
        </div>  );
    }
}
 
export default AnswerForm;