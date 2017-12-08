import _ from 'lodash';
import React ,{Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
const API_KEY = 'AIzaSyBoPEUyaCL-p-sUHXzedhifZTFoxJjdWq8';

 class App extends Component{
   constructor(props){
     super(props);
     this.state = {
       videos:[],
       selectVideo:null
     };
     this.videoSearch('surfboards');
   }

  videoSearch(term){
    YTSearch({key:API_KEY, term : term}, (videos) => {
      this.setState({
        videos:videos,
        selectedVideo: videos[0]
      });
      //this.setState({videos:videos}); only both key and value have same name in es6
    });
  }


  render(){
const videoSearch =_.debounce((term) => { this.videoSearch(term)},300)

    return (
      <div>
      <SearchBar onSearchTermChange= {videoSearch}/>
      <VideoDetail video={this.state.selectedVideo} />
      <VideoList
      onVideoSelect = {selectedVideo => this.setState({selectedVideo}) }
      videos={this.state.videos} />
      </div>
    );
  }
}


ReactDOM.render(
  <App />
  , document.querySelector('.container'));
