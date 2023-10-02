import React, { Component } from 'react';
import TutorialDataService from '../services/tutorial.service';
import {Link} from 'react-router-dom';

export default class TutorialsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveTutorials = this.retrieveTutorials.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTutorials = this.setActiveTutorials.bind(this);
    this.removeAllTutorials = this.removeAllTutorials.bind(this);
    this.searchTitle = this.searchTitle.bind(this);
    
    this.state = {
      tutorials: [],
      currentTutorial: null,
      currenIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveTutorials();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;
    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveTutorials() { /////////////ดึงออกมาทั้งหมดเพื่อแสดงรายการออกมา  
    TutorialDataService.getAll()
      .then(response => {
        this.setState({
          tutorials: response.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  refreshList() { // รีข้อมูล
    this.retrieveTutorials();
    this.setState({
      currentTutorial: null,
      currenIndex: -1
    });
  }

  setActiveTutorials(tutorials, Index) {
    this.setState({
      currentTutorial: tutorials,
      currenIndex: Index
    });
  }

  removeAllTutorials() {
    TutorialDataService.deleteAll()
    .then(response => {
      this.refreshList();
    })
    .catch(err => {
      console.log(err);
    })
  }

  searchTitle() {
    TutorialDataService.findByTitle(this.state.searchTitle)
    .then(response => {
      this.setState({
        tutorials: response.data
      });
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    const {searchTitle, tutorials, currentTutorial, currenIndex} = this.state;

    return (
      <div className='list row'>
        <div className='col-md-8'>
          <div className='input-group mb-3'>
              <input
                type="text"
                className="form-control"
                placeholder="Search by title"
                value={searchTitle}
                onChange={this.onChangeSearchTitle}
              />
            <div className='input-group-append'>
              <button 
                className='btn btn-outline-secondary'
                type='button'
                onClick={this.searchTitle}
              >Search</button>
            </div>
          </div>
        </div>
        <div className='col-md-6'>
          <h4>Tutorials List</h4>

          <ul className='list-group'>
            <li>1</li>
            <li>2</li>
          </ul>
          <button className='btn btn-sm btn-danger m-3'
            onClick={this.removeAllTutorials}
          >

            Remove All
            </button>
        </div>
      </div>
    )
  }
}
