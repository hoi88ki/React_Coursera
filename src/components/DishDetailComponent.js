import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetailComponent extends Component{

    render(){
        const dish = this.props.dish;
        if(dish != null){

            const comments = dish.comments.map((comment)=>{
                return(
                    <>
                        <p>{comment.comment}</p>
                        <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                    </>

                )
            })

            return(
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <Card>
                                <CardImg top src={dish.image} alt={dish.name} />
                                <CardBody>
                                    <CardTitle className="font-weight-bold text-left">{dish.name}</CardTitle>
                                    <CardText className="text-left">{dish.description}</CardText>
                                </CardBody>
                            </Card>
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <Card className="text-left border-0">
                                <CardTitle className="h5">Comments</CardTitle>
                                <>
                                    {comments}
                                </>
                            </Card>
                        </div>
                        
                    </div>
                </div>
            );
        }else{
            return(
                <></>
            );
        }
    }
}

export default DishDetailComponent;
