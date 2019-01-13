import React, { Component } from 'react';

class LoadQuestion extends Component {
    state = { 
        question:{},
        isQuesLoaded:false,
        isAnsLoaded:false,
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

    componentDidMount()
    {
        this.fetchQues();
        this.fetchAns(); 
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
                                    <button className="btn btn-default sm-2 m-2">
                                    Edit
                                    </button>
                                    <button className="btn btn-danger sm-2 m-2">
                                    Delete
                                    </button>
                                    <br/>
                                    </span>
                                );  
                            })  
                        }  
                    </div>
                    <button className="btn btn-large btn-warning">Add New Answer</button>
                </div>
            );
        }
    }
}
export default LoadQuestion;