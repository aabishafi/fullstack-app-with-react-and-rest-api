import React, {Component} from 'react';
import { Link } from 'react-router-dom';
const ReactMarkdown = require('react-markdown')

//this component shows the course detail.
class CourseDetail extends Component {

  //set state. 
  state = {
    courseInfo: [],
    userInfo: []
  }

  //Get course.  If course exists, then set the course info and user info with data.  If not, then direct them to not found. 
  componentDidMount() {
    this.props.context.data.getCourse(this.props.match.params.id)
      .then(data => {
        if (data) {
          this.setState({
            courseInfo: data,
            userInfo: data.user
          })
        } else {
          this.props.history.push('/notfound');
        }
      })
      .catch(err => {
        console.log(err);
        this.props.history.push('/error');
      });
    }


  handleDelete = async (e) => {
    e.preventDefault();
    const { context } = this.props;
    const { courseInfo } = this.state;
    const { emailAddress } = context.authenticatedUser;
    // const password = prompt('Please enter your password.');

    //After deleting the course, go to homepage.
    context.data.deleteCourse(courseInfo.id, emailAddress, context.userPassword)
      .then(() => {
        this.props.history.push('/')
      })
      .catch((err) => {
        console.log(err);
        this.props.history.push('/error');
      });
  }


  render() {

    const {
      courseInfo,
      userInfo
    } = this.state;

    const userAuthorization = this.props.context.authenticatedUser;


    return (
      <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">
              {userAuthorization && userAuthorization.userId === userInfo.id ?
                <React.Fragment>
                  <span>
                    <Link className="button" to={`/courses/${courseInfo.id}/update`}>Update Course</Link>
                    <Link className="button" onClick={this.handleDelete} to='/'>Delete Course</Link>
                  </span>
                  <Link className="button button-secondary" to="/">Return to List</Link>
                </React.Fragment>
              :
                <React.Fragment>
                  <Link className="button button-secondary" to="/">Return to List</Link>
                </React.Fragment>
              }
            </div>
          </div>
        </div>
        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{courseInfo.title}</h3>
              <p>By {`${userInfo.firstName} ${userInfo.lastName}`}</p>
            </div>
            <div className="course--description">
              <ReactMarkdown source={courseInfo.description} />
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>{courseInfo.estimatedTime}</h3>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                    <ReactMarkdown source={courseInfo.materialsNeeded} />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CourseDetail;