import React, { Component } from 'react';

class Unanswered extends Component {
    constructor(props){
    super(props);
    console.log("question constructor");
    this.state={
        questions:[],
        errors:null,
        isLoaded:false,
    }
}

handleQues(button){
    const {id} = button;
    console.log(button);
    this.state.identifier=id;
    this.props.sendData(this.state.identifier);   
}

componentDidMount()
{   
    console.log("question mounted");
    fetch("http://localhost:8080/questions",
    {
        method:'GET'
    })
    .then((response)=>response.json())
    .then((data) =>{
        this.setState({
            questions:data,
            isLoaded:true,
    })
})
    .catch(errors=>this.setState({errors,isLoading:false}));
}


render() { 
    console.log(this.state.errors);
    if(!this.state.isLoaded)
    {
        return <div style={{fontSize:"30px"}}>Loading....</div>;
    }
    else{
        const {content} =this.state.questions;
        return(
        <section>    
            <div>    
                <p>  
                        {  
                            content.map((p, index) => {  
                                return (
                                     <span key={index}>
                                       <button onClick={()=>this.handleQues(p)} className="btn btn-default text-left m-2" style={{fontSize:"15px",fontWeight:"normal",width:"100%",align:"left"}}>{p.title}</button>
                                    <br/>
                                    </span>
                                );  
                            })  
                        }  
                </p>  
            </div>  
        </section>);  
    }
}
    
}
 
export default Unanswered;