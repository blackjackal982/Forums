import React, { Component } from 'react';
import AnswerForm from './ans_form';
import EditAnsForm from './edit_ans'

class LoadQuestion extends Component {
    state = { 
        question:{},
        isQuesLoaded:false,
        isAnsLoaded:false,
        isAnswerClicked:false,
        EditId:0,
        ans:[],
     }

    fetchQues()
    {
        fetch("http://localhost:8080/questions/"+this.props.id,
        {
            method:'GET'
        })
        .then((response)=>response.json())
        .then((data) =>{
            this.setState({
                question:data,
                isQuesLoaded:true,
        })
    })
    .catch(errors=>this.setState({errors,isQuesLoaded:false}));   
    }

    fetchAns()
    {
        fetch("http://localhost:8080/questions/"+this.props.id+"/answers",
        {
            method:'GET'
        })
        .then((response)=>response.json())
        .then((data) =>{
            this.setState({
                ans:data,
                isAnsLoaded:true,
        })
    })
    .catch(errors=>this.setState({errors,isAnsLoaded:false})); 
        
    }

    handleAnswer=()=>{
        this.setState(
            {
                isAnswerClicked:true,
            }
        )
    }

    componentDidMount()
    {
        this.fetchQues();
        this.fetchAns(); 
    }
    
    post_successful=()=>
    {
        this.fetchAns();
        this.setState({
            isAnswerClicked:false,
            EditId:0,
        })
       
    }

    onCancel(item){
        console.log("status ok",item.id);
        fetch("http://localhost:8080/questions/"+this.props.id+"/answers/"+item.id,{
                method:'DELETE',
            })
            .then((response)=>{
                if(response.ok)
                {
                    alert("     Answer Deleted Successfully!");
                    this.fetchAns();
                }
                else
                {
                    alert("     An error occurred !\n    Please try again later");
                }
            })
            .catch(error => console.log(error));
    }

    onEdit(item)
    {
        console.log(item);
        this.setState({
            EditId:item,
        })
    }

    render() { 
        if(!this.state.isQuesLoaded&&!this.state.isAnsLoaded)
        {
            return <div style={{fontSize:"30px"}}>Loading....</div>;
        }
        else{
            const {title,description} = this.state.question;
            return(
                <div>
                    {title}<br/>{description}<br/>
                    <br/>Answers<br/>
                    <div>
                    {  
                        this.state.ans.map((p, index) => {  
                                return (
                                    <span key={index} className="container" style={{width:"100%"}}>
                                    {p.text}
                                    <button className="badge badge-pill badge-dark m-2" 
                                    onClick={() =>{this.onEdit(p.id)}}>
                                    Edit
                                    </button>
                                    <button className="badge badge-pill badge-danger m-2" onClick={() => { if (window.confirm('Are you sure you wish to delete this answer?')) this.onCancel(p) } }>
                                    Delete
                                    </button>
                                    {(p.id===this.state.EditId)?
                                    <EditAnsForm 
                                        answer_id ={p.id} 
                                        text={p.text} 
                                        question_id={this.props.id} 
                                        updateSuccess={this.post_successful}/>:null
                                    }
                                    <br/>
                                    </span>
                                );  
                            })  
                        }  
                    </div>
                    <br/><br/>
                    <button onClick={this.handleAnswer} className="btn btn-large btn-warning">Add New Answer</button>
                    {this.state.isAnswerClicked?<AnswerForm  id = {this.props.id} updateSuccess={this.post_successful}/>:null }
    
                </div>
            );
        }
    }
}
export default LoadQuestion;