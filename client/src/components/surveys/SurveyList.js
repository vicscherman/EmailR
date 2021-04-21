import React from 'react'
import {connect} from 'react-redux'
import {fetchSurveys} from '../../actions'

class SurveyList extends React.Component{
    componentDidMount(){
        this.props.fetchSurveys()
    }
    renderSurveys(){
        return this.props.surveys.reverse().map(survey => {
            return(
                <div key={survey._id} className="card light-blue lighten-3">
                    <div className="card-content">
                        <span className="card-title">{survey.title}</span>
                        <p>
                            {survey.body}
                        </p>
                        <p className="right">Sent On: {new Date(survey.dateSent).toLocaleDateString()}</p>
                    </div>
                    <div className="card-action">
                        <a class="black-text">Yes: {survey.yes}</a>
                        <a class="black-text">No: {survey.no}</a>
                    </div>

                </div>
            )
        })
    }


    render(){
        return(
            <div>
                {this.renderSurveys()}
            </div>
        )
    }
}
//remember to check the index.js file in reducers to see why this field is called "surveys"
function mapStateToProps(state){
    return{surveys: state.surveys}
}

export default connect(mapStateToProps, {fetchSurveys})(SurveyList)