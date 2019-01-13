import React, { Component } from 'react';
import LoadQues from './load_ques';
import Questions from './questions';
import PostQues from './post_ques';
import Unanswered from './unanswered';

class Comps extends Component {
constructor(props){
      super(props);
      this.state = {
            isClicked_un_answer:false,
            isClicked_ques:false,
            isClicked_post:false,
            childData:false,
          }
}

getData=(data)=>{
      this.setState({
            childData : data,
            isClicked_post:false,
            isClicked_un_answer : false,
            isClicked_ques:false,
      })
      this.forceUpdate(); 
}

handle_click_post_ques=()=>
{
      this.setState({   
                        childData:false,      
                        isClicked_post:true,
                        isClicked_ques:false,
                        isClicked_un_answer:false,
                        });
}
handle_click_ques=()=>
{
      this.setState({   childData:false,
                        isClicked_ques:true,
                        isClicked_un_answer:false,
                        isClicked_post:false,
      });
}
handle_click_un_ques=()=>
{
      this.setState({   childData:false,
                        isClicked_un_answer:true,
                        isClicked_ques:false,
                        isClicked_post:false,
      });
}


      render() { 
        return ( 
        <div>
         <button onClick={this.handle_click_ques} className = "btn btn-secondary m-2">
              QUESTIONS
        </button>

        <button onClick={this.handle_click_un_ques}  className = "btn btn-secondary m-2">
              UN-ANSWERED QUESTIONS
        </button>
        
       
        <button onClick={this.handle_click_post_ques} className="btn btn-primary m-2">
              ASK NEW QUESTION
        </button> 

        <div>
        {this.state.isClicked_un_answer&&<Unanswered onLoadQuestions={this.handleQues}  
        sendData = {this.getData}/>}
        {this.state.isClicked_ques&&<Questions 
        sendData = {this.getData}/>}
        {this.state.isClicked_post&&<PostQues />}
        {this.state.childData&&<LoadQues
        id ={this.state.childData}/>}
        </div>
        </div>
        );
    }
}
 
export default Comps;