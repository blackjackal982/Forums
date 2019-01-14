import React, { Component } from 'react';
import AnswerForm from './ans_form';
import EditAnsForm from './edit_ans';
import EditQues from './edit_ques';

class LoadQuestion extends Component {
    state = { 
        question:{},
        isQuesLoaded:false,
        isAnsLoaded:false,
        isAnswerClicked:false,
        isQuesEditClicked:false,
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
                isAnswerClicked:!this.state.isAnswerClicked,
            }
        )
    }

    componentDidMount()
    {
        this.fetchQues();
        this.fetchAns(); 
    }
    
    post_successful=(event)=>
    {
        event?this.fetchQues():this.fetchAns();
        this.setState({
            isAnswerClicked:false,
            isQuesEditClicked:false,
            EditId:0,
        })
    }

    onCancel(item){
        var url = item?"http://localhost:8080/questions/"+this.props.id+"/answers/"+item.id:"http://localhost:8080/questions/"+this.props.id;
        fetch(url,{
                method:'DELETE',
            })
            .then((response)=>{
                if(response.ok)
                {
                    item?alert("     Answer Deleted Successfully!"):alert(" Question Deleted Successfully!");
                    item?this.fetchAns():window.location.reload();
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

    onQuesEdit()
    {
        this.setState({
            isQuesEditClicked:!this.state.isQuestionEditClicked,
        });
    }

    render() { 
        if(!this.state.isQuesLoaded&&!this.state.isAnsLoaded)
        {
            return <div style={{fontSize:"30px"}}>Loading....</div>;
        }
        else{
            const {title,description,id} = this.state.question;
            return(
                <div>
                    {title}<br/>{description}<br/>
                    <button className="badge badge-pill badge-dark m-2" 
                                    onClick={() =>{this.onQuesEdit()}}>
                                    Edit
                    </button>
                    <button className="badge badge-pill badge-danger m-2" onClick={() => { if (window.confirm('Are you sure you wish to delete this question?')) this.onCancel() } }>
                                    Delete
                    </button>
                    {this.state.isQuesEditClicked?<EditQues id = {id} title ={title} description={description} updateSuccess={this.post_successful}/>:null}
                    <br/><br/>
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