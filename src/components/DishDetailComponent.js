import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderDish({dish}) {
    return (
        <Card>
            <CardImg top src={dish.image} alt={dish.name} />
            <CardBody>
                <CardTitle className="font-weight-bold text-left">{dish.name}</CardTitle>
                <CardText className="text-left">{dish.description}</CardText>
            </CardBody>
        </Card>
    )
}

function RenderComments({comments}) {
    const comment = comments.map((comment)=>{
        return (
            <span key={comment.id}>
                <p>{comment.comment}</p>
                <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
            </span>
        )
    });
    
    return (
        <Card className="text-left border-0">
            <CardTitle className="h5">Comments</CardTitle>
            {comment}
        </Card>
    )
}

const DishDetail = (props) => {
    const dish = props.dish;
    // console.log(props.dish)
    if(dish == null){
        return(
            <></>
        );
    }else{
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments} />
                    </div>
                </div>
            </div>
        );
        
    }

}

export default DishDetail;

// class DishDetailComponent extends Component{
//     componentDidUpdate(){
//         console.log(this.props)
//         console.log("DishDetailComponent Component Did Update")
//     }
//     render(){
//         const dish = this.props.dish;
//         if(dish != null){
//             const comments = dish.comments.map((comment)=>{
//                 return(
//                     <span key={comment.id}>
//                         <p>{comment.comment}</p>
//                         <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
//                     </span>
//                 )
//             })
//             return(
//                 <div className="container">
//                     <div className="row">
//                         <div className="col-12 col-md-5 m-1">
//                             <Card>
//                                 <CardImg top src={dish.image} alt={dish.name} />
//                                 <CardBody>
//                                     <CardTitle className="font-weight-bold text-left">{dish.name}</CardTitle>
//                                     <CardText className="text-left">{dish.description}</CardText>
//                                 </CardBody>
//                             </Card>
//                         </div>
//                         <div className="col-12 col-md-5 m-1">
//                             <Card className="text-left border-0">
//                                 <CardTitle className="h5">Comments</CardTitle>
//                                 <>
//                                     {comments}
//                                 </>
//                             </Card>
//                         </div>
//                     </div>
//                 </div>
//             );
//         }else{
//             return(
//                 <></>
//             );
//         }
//     }
// }
// export default DishDetailComponent;
