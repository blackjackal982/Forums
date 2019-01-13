import React, { Component } from 'react';

class Questions extends Component {
constructor(props){
    super(props);
    this.state={
        questions:[],
        errors:null,
        isLoaded:false,
        identifier: null
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
    if(!this.state.isLoaded)
    {
        return <div style={{fontSize:"30px"}}>Loading....</div>;
    }
    else{
        const {content} =this.state.questions;
        return(
        <section>    
            <div>    
                <div>  
                        {  
                            content.map((p, index) => {  
                                return (
                                     <span key={index}>
                                    <button onClick={()=>this.handleQues(p)} className="btn btn-default text-left m-2" 
                                    style={{fontSize:"15px",fontWeight:"normal",width:"100%",align:"left"}} >{p.title}
                                    </button>
                                    <br/>
                                    </span>
                                );  
                            })  
                        }  
                </div>  
            </div>  
        </section>);  
    }
}
}

export default Questions;