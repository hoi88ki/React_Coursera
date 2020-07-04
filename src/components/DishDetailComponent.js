import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem,
    Button, Modal, ModalHeader, ModalBody,
    FormGroup, Row, Col, Label } from 'reactstrap';
import { Link } from 'react-router-dom';

import { Control, LocalForm, Errors } from 'react-redux-form';

import { Loading } from './LoadingComponent';

import { baseUrl } from '../shared/baseUrl';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

function RenderDish({dish}) {
    return (
        <Card>
            <CardImg top src={baseUrl + dish.image} alt={dish.name} />
            <CardBody>
                <CardTitle className="font-weight-bold text-left">{dish.name}</CardTitle>
                <CardText className="text-left">{dish.description}</CardText>
            </CardBody>
        </Card>
    )
}

function RenderComments({comments, addComment, dishId}) {
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
            <CommentForm dishId={dishId} addComment={addComment} />
        </Card>
    )
}

class CommentForm extends Component {
    constructor(props){
        super(props);

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            isNavOpen:false,
            isModalOpen:false
        }
    }

    handleSubmit(values){
        this.toggleModal();
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
        // event.preventDefault();
    }

    // const [modal, setModal] = useState(false);

    toggleModal(){
        this.setState({isModalOpen: !this.state.isModalOpen})
    }

    render(){
        return (<>
                <Button outline color="secondary" onClick={this.toggleModal} className="float-left"><i className="fa fa-pencil"></i> Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Modal title</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)} initialState={{rating: "1"}}> {/* Initial State can set default value of the form */}
                            <Row className="form-group">
                                <Label htmlFor="rating" md={12}>Rating</Label>
                                <Col md={12}>
                                    <Control.text model=".rating" id="rating" name="rating"
                                        type="number"
                                        className="form-control"
                                        min={1}
                                        max={5}
                                        validators={{required}}
                                        />
                                    <Errors
                                        className="text-danger"
                                        model=".rating"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                        }}
                                        />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" md={12}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                            />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                        />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>Your Feedback</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="12"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10}}>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </>
        );
    }
}

const DishDetail = (props) => {
    const dish = props.dish;

    // console.log(props.dish)
    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">            
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }else if (dish != null){
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
                        <RenderComments dishId={props.dish.id} comments={props.comments} addComment={props.addComment} />
                        {/* <CommentModal /> */}
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
