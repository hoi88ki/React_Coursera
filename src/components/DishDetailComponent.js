import React, {useState} from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem,
    Button, Modal, ModalHeader, ModalBody,
    FormGroup, Row, Col, Label } from 'reactstrap';
import { Link } from 'react-router-dom';

import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

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

const CommentModal = (props) =>{

    const handleSubmit = (values) => {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
        // event.preventDefault();
    }

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    return (<>
            <Button outline color="secondary" onClick={toggle} className="float-left"><i className="fa fa-pencil"></i> Submit Comment</Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => handleSubmit(values)} initialState={{rating: "1"}}> {/* Initial State can set default value of the form */}
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
                            <Label htmlFor="yourname" md={12}>Your Name</Label>
                            <Col md={12}>
                                <Control.text model=".yourname" id="yourname" name="yourname"
                                    placeholder="Last Name"
                                    className="form-control"
                                    validators={{
                                        minLength: minLength(3), maxLength: maxLength(15)
                                    }}
                                        />
                                <Errors
                                    className="text-danger"
                                    model=".yourname"
                                    show="touched"
                                    messages={{
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                    />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="message" md={12}>Your Feedback</Label>
                            <Col md={12}>
                                <Control.textarea model=".message" id="message" name="message"
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
                        <CommentModal />
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
